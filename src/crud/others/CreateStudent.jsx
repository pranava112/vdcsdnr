import { NavLink, useNavigate } from 'react-router-dom';
import React, { memo, useEffect, useState } from 'react';

import Api from './Api';
import AsideBar from './AsideBar';
import FacultyUpload from '../Faculty/FacultyUpload';
import axios from 'axios';

// SetFeeForm Component
function SetFeeForm({ addFee }) {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addFee({ amount: parseFloat(amount), description });
    setAmount(0);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <section>
        <div className="flex flex-col space-y-2">
          <label htmlFor="fee" className="text-sm font-medium text-gray-700">SET-FEE</label>
          <input
            type="text"
            id="fee"
            placeholder="Enter the amount"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            name="fee"
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="desc1" className="text-sm font-medium text-gray-700">DESCRIPTION</label>
          <input
            type="text"
            id="desc1"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            name="description"
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Set Fees
          </button>
        </div>
      </section>
    </form>
  );
}

// PaymentForm Component
function PaymentForm({ payFee }) {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [receiptno, setReceiptno] = useState('');
  const [mode, setMode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    payFee({ amount: parseFloat(amount), description, receiptno, mode });
    setAmount(0);
    setDescription('');
    setReceiptno('');
    setMode('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <section>
        <div className="flex flex-col space-y-2">
          <label htmlFor="pay" className="text-sm font-medium text-gray-700">PAY-FEE</label>
          <input
            type="text"
            id="pay"
            placeholder="Enter amount"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            name="fee"
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            name="date"
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="receipt" className="text-sm font-medium text-gray-700">RECEIPT NO</label>
          <input
            type="text"
            id="receipt"
            placeholder="Enter receipt no"
            onChange={(e) => setReceiptno(e.target.value)}
            value={receiptno}
            name="receipt"
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="mode" className="text-sm font-medium text-gray-700">PAYMENT MODE</label>
          <input
            type="text"
            id="mode"
            placeholder="Enter payment mode"
            onChange={(e) => setMode(e.target.value)}
            value={mode}
            name="mode"
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Make Payment
          </button>
        </div>
      </section>
    </form>
  );
}

// TransactionList Component
function TransactionList({ transactions }) {
  return (
    <ul className="space-y-2">
      {transactions.map((transaction, index) => (
        <li key={index} className="p-2 bg-gray-100 rounded-md shadow-sm">
          {transaction.type === 'income' ? '+' : '-'} amount ={transaction.amount} , description= {transaction.description}, receipt no= {transaction.receiptno}, payment mode= {transaction.mode}
        </li>
      ))}
    </ul>
  );
}

// BalanceDisplay Component
function BalanceDisplay({ balance }) {
  return (
    <section  className="p-4 bg-gray-50 shadow-md rounded-md">
      <p className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ">Total Balance Fees: {balance}</p>
      
    </section>
  );
}

// CreateStudent Component
const CreateStudent = () => {
  const [user, setUser] = useState({
    rollno: "",
    surname: "",
    name: "",
    dob: "",
    jyear: "",
    studentGroup: "",
    year: "",
    school: "",
    tenthgpa: "",
    inter: "",
    intergpa: "",
    mobile: "",
    address: "",

    transactions: [],
    balance: 0,
    sem1: "",
    sem2: "",
    sem3: "",
    sem4: "",
    sem5: "",
    sem6: "",
  });



  const [fee, setFee] = useState(0);
  const [payment, setPayment] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);


  const [attendance, setAttendance] = useState({
    date: '',
    status: '', // e.g., "Present" or "Absent"
  });

  const handleAttendanceInput = (e) => {
    const { name, value } = e.target;
    setAttendance({ ...attendance, [name]: value });
  };

  const addAttendance = () => {
    setUser({
      ...user,
      attendance: [...user.attendance, attendance],
    });
    setAttendance({ date: '', status: '' });
  };

  const { rollno, surname, name, dob, jyear, studentGroup, year, school, tenthgpa, inter,
     intergpa, mobile, address, sem1, sem2, sem3, sem4, sem5, sem6, } = user;

  useEffect(() => {
    document.title = "Create student info";
  }, []);

  let navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(user);

  //   console.log();
    

  //   try {
  //     // Ensure you are using the correct method for the request
  //     const response = await Api.post("/student", user, {
  //       headers: { "Content-Type": "application/json" },
  //     });
    
  //     // Check if the response was successful
  //     if (!response.ok) {
  //       throw new Error("Failed to create student");
  //     }
    
  //     const data = await response.json(); // Parse the JSON response
  //     console.log("Student created", data);
    
  //     // Navigate to the desired page
  //     navigate("/viewAllPersuing");
  //   } catch (e) {
  //     console.error("Error occurred:", e);
  //   }
  
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
  
    try {
      // Correctly using Axios instance (Api)
      const response = await Api.post("/student", user, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Student created", response.data);
  
      // Navigate to the desired page after successful creation
      navigate("/viewAllPersuing");
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
    }
  };
  

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  



  const addFee = (feeData) => {
  const newTransaction = { type: 'fee', amount: feeData.amount, description: feeData.description };
  setFee(fee + feeData.amount);
  setTransactions([...transactions, newTransaction]);
  setBalance(balance + feeData.amount);
  setUser({ ...user, transactions: [...user.transactions, newTransaction], balance: balance + feeData.amount });
};

const payFee = (paymentData) => {
  const newTransaction = { type: 'payment', amount: paymentData.amount, description: paymentData.description, receiptno: paymentData.receiptno, mode: paymentData.mode };
  setPayment([...payment, paymentData]);
  setTransactions([...transactions, newTransaction]);
  setBalance(balance - paymentData.amount);
  setUser({ ...user, transactions: [...user.transactions, newTransaction], balance: balance - paymentData.amount });
};


  return (
    <>
             <AsideBar/> 
     <div className="p-6 max-w-4xl mx-auto space-y-8">


      <h1 id='hhh' className="text-2xl font-semibold text-gray-800">Create Student Profile</h1>
      <form 
      // onSubmit={handleSubmit} 
      className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="rollno" className="text-sm font-medium text-gray-700">Roll Number</label>
            <input
              type="text"
              id='rollno'
              name="rollno"
              value={rollno}
              onChange={handleInput}
              required
              minLength={14}
              maxLength={15}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor='sname' className="text-sm font-medium text-gray-700">Surname</label>
            <input
              type="text"
              name="surname"
              id='sname'
              value={surname}
              onChange={handleInput}
              required
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor='name' className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id='name'
              value={name}
              onChange={handleInput}
              required
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor='dob' className="text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              id='dob'
              name="dob"
              value={dob}
              onChange={handleInput}
              required
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* /////////////////////////////////////////////////////// */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor='jyear' className="text-sm font-medium text-gray-700">Joining-Year</label>
            <input
              type="number"
              id='jyear'
              name="jyear"
              value={jyear}
              onChange={handleInput}
              required
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* //////////////////////////////// */}
          
          <div  className="flex flex-col space-y-2">
        <label htmlFor="studentGroup" className="text-sm font-medium text-gray-700">Group </label>
        <select name="studentGroup" id="studentGroup"  onChange={handleInput} value={studentGroup} 
        required
         className="px-3 py-0 border h-10 w-72 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">--select--</option>
          <option value="ba">BA</option>
          <option value="bcom">BCOM</option>
          <option value="bsc(mpcs)">MPCS</option>
          <option value="bsc(bzc)">BZC</option>
          <option value="bsc(mzc)">MZC</option>

        </select>
        </div>
        </div>
       

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
          <label htmlFor='year' className="text-sm font-medium text-gray-700">Persuing Year </label>
        <select name="year" id="year" onChange={handleInput} value={year} 
        required
        className="px-3 py-0 my-1 w-72 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">--select--</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="pass">promote</option>
        </select>

          </div>
          </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col space-y-2">
        <label htmlFor="school" className="text-sm font-medium text-gray-700">School Name </label>
       
        <input type="text" 
        id='school'
        placeholder='Enter school name '
        onChange={handleInput}
        value={school}
        name='school'
        required
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="10gpa" className="text-sm font-medium text-gray-700">10th Gpa  </label>
      
        <input type="number" 
        id='10gpa'
        placeholder='Enter 10th gpa '
        onChange={handleInput}
        value={tenthgpa}
        name='tenthgpa'
        required
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>


      </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col space-y-2">
        <label htmlFor="inter" className="text-sm font-medium text-gray-700">Inter College </label>
       
        <input type="text" 
        id='inter'
        placeholder='Enter inter college name '
        onChange={handleInput}
         value={inter}
        name='inter'
        required
       className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="12gpa" className="text-sm font-medium text-gray-700">Inter Gpa </label>
       
        <input type="number" 
        id='12gpa'
        placeholder='Enter 12th gpa '
        onChange={handleInput}
         value={intergpa}
        name='intergpa'
        required
       className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

  
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col space-y-2">
        <label htmlFor="mobile" 
        className="text-sm font-medium text-gray-700">Mobile </label>
       
        <input type="tel" 
        id='mobile'
        placeholder='Enter mobile no'
        onChange={handleInput}
        value={mobile}
        name='mobile'
        minLength="10"
        maxLength="10"
        required
       className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        
        />
      </div>
</div>


<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col space-y-2">
        <label htmlFor="SEM1"  className="text-sm font-medium text-gray-700">Sem-1 Gpa  </label>
      
        <input type="text" 
        id='SEM1'
        placeholder='Enter sem1 gpa '
        onChange={handleInput}
        value={sem1}
        name='sem1'
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        
        />
      </div>
      
      <div className="flex flex-col space-y-2">
        <label htmlFor="SEM2"  className="text-sm font-medium text-gray-700">Sem-2 Gpa  </label>
      
        <input type="text" 
        id='SEM2'
        placeholder='Enter sem2 gpa '
        onChange={handleInput}
        value={sem2}
        name='sem2'
        
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="SEM3"  className="text-sm font-medium text-gray-700">Sem-3 Gpa  </label>
      
        <input type="text" 
        id='SEM3'
        placeholder='Enter sem3 gpa '
        onChange={handleInput}
        value={sem3}
        name='sem3'
        
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="SEM4"  className="text-sm font-medium text-gray-700">Sem-4 Gpa  </label>
      
        <input type="text" 
        id='SEM4'
        placeholder='Enter sem4 gpa '
        onChange={handleInput}
        value={sem4}
        name='sem4'
        
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="SEM5"  className="text-sm font-medium text-gray-700">Sem-5 Gpa  </label>
      
        <input type="text" 
        id='SEM5'
        placeholder='Enter sem5 gpa '
        onChange={handleInput}
        value={sem5}
        name='sem5'
        
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="SEM6"  className="text-sm font-medium text-gray-700">Sem-6 Gpa  </label>
      
        <input type="text" 
        id='SEM6'
        placeholder='Enter sem6 gpa '
        onChange={handleInput}
        value={sem6}
        name='sem6'
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        
        />
      </div>





      </div>



{/* ////////////////////////////////////////////////////////////////// */}

        <div className="flex flex-col space-y-2">
          <label htmlFor='address' className="text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            id='address'
            value={address}
            placeholder='Enter address'
            onChange={handleInput}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Student
          </button>
        </div> */}
      </form>

      <div className="space-y-6">
        <SetFeeForm addFee={addFee} />
        <PaymentForm payFee={payFee} />
        <BalanceDisplay balance={user.balance} />
        <TransactionList transactions={user.transactions} />
      </div>

      <form  onSubmit={handleSubmit}>
       
      <div className="mt-6">
          <button
            type="submit"
            title='Submit'
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Student
          </button>
        </div>



        {/* //////////////////////////////////////////////////////////// */}

         {/* Attendance Records */}
         {/* <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-800">Attendance Records</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label htmlFor="date" className="text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={attendance.date}
                  onChange={handleAttendanceInput}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="status" className="text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={attendance.status}
                  onChange={handleAttendanceInput}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">--Select--</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={addAttendance}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Attendance
            </button>
          </div> */}

      </form>
      
    </div>
    <div>
       <NavLink to="/facultyupload" 
               // title="home"
               id="Navbar"
                className="bg-blue-500 flex items-center space-x-1 w-auto text-white py-2 px-4 rounded-md mt-6 mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 relative">
                
                 {/* <IoHome className="text-2xl"/> */}
                 Faculty
         <span className="tooltip hidden absolute bg-black text-white text-xs rounded px-2 py-1 -top-8 left-1/2 transform -translate-x-1/2">
         Faculty
       </span>
               </NavLink>
    </div>
    </>
  );
};

export default memo(CreateStudent);



//completed creation program on 25/12/2024