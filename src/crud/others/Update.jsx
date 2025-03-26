import axios from 'axios';
import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AsideBar from './AsideBar';
import Api from './Api';

const Update = () => {
  const [user, setUser] = useState({
    rollno: "",
    surname: "",
    name: "",
    dob: "",
    jyear: "",
    group: "",
    year: "",
    school: "",
    tenthgpa: "",
    inter: "",
    intergpa: "",
    mobile: "",
    address: "",
    sem1: "",
    sem2: "",
    sem3: "",
    sem4: "",
    sem5: "",
    sem6: "",
    transactions: [],
    balance: 0,
  });

  const [fee, setFee] = useState(0);
  const [payment, setPayment] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    document.title = `Edit of ${user.name}`;
  }, [user.name]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await Api.get(`/student/${id}`);
        const data = response.data;
        setUser(data);
        setTransactions(data.transactions || []);
        setBalance(data.balance || 0);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  
  

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const addFee = (feeData) => {
    const newTransaction = { type: 'fee', amount: feeData.amount, description: feeData.description };
    setFee(fee + feeData.amount);
    setTransactions([...transactions, newTransaction]);
    setBalance(balance + feeData.amount);
  };

  const payFee = (paymentData) => {
    const newTransaction = {
      type: 'payment',
      amount: paymentData.amount,
      description: paymentData.description,
      receiptno: paymentData.receiptno,
      mode: paymentData.mode,
    };
    setPayment([...payment, paymentData]);
    setTransactions([...transactions, newTransaction]);
    setBalance(balance - paymentData.amount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.patch(`/student/${id}`, user);
      const updatedUser = response.data;
      console.log("Updated Data", updatedUser);
      setUser(updatedUser);
      setTransactions(updatedUser.transactions || []);
      setBalance(updatedUser.balance || 0);
      navigate("/viewAllPersuing");
    } catch (error) {
      console.error("Error updating user:", error);
    }
      
    finally {
      setUser({
        rollno: "",
        surname: "",
        name: "",
        dob: "",
        jyear: "",
        group: "",
        year: "",
        school: "",
        tenthgpa: "",
        inter: "",
        intergpa: "",
        mobile: "",
        address: "",
        sem1: "",
        sem2: "",
        sem3: "",
        sem4: "",
        sem5: "",
        sem6: "",
        transactions: [],
        balance: 0,
      });
      setTransactions([]);
      setBalance(0);
    }
  };



   return (
        <>
         <AsideBar/>
        <div className="p-6 max-w-4xl mx-auto space-y-8">
          <h1 className="text-2xl font-semibold text-gray-800">Update {user.rollno} Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Roll Number</label>
                <input
                  type="text"
                  name="rollno"
                  value={user.rollno}
                  onChange={handleInput}
                  
                  readOnly
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Surname</label>
                <input
                  type="text"
                  name="surname"
                  value={user.surname}
                  onChange={handleInput}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleInput}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={user.dob}
                  onChange={handleInput}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
    
            {/* /////////////////////////////////////////////////////// */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Joining-Year</label>
                <input
                  type="number"
                  name="jyear"
                  value={user.jyear}
                  onChange={handleInput}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {/* //////////////////////////////// */}
              
              <div  className="flex flex-col space-y-2">
            <label htmlFor="group" className="text-sm font-medium text-gray-700">Group </label>
            <select name="group" id="group"  onChange={handleInput} value={user.group} required
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
              <label className="text-sm font-medium text-gray-700">Persuing Year </label>
            <select name="year" id="year" onChange={handleInput} value={user.year} required
            className="px-3 py-0 my-1 w-72 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">--select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="pass">promoted</option>
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
            value={user.school}
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
            value={user.tenthgpa}
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
             value={user.inter}
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
             value={user.intergpa}
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
            value={user.mobile}
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
          
            < input type="text" 
            id='SEM1'
            placeholder='Enter sem1 gpa '
            onChange={handleInput}
            value={user.sem1}
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
            value={user.sem2}
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
            value={user.sem3}
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
            value={user.sem4}
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
            value={user.sem5}
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
            value={user.sem6}
            name='sem6'
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            
            />
          </div>
    
    
    
    
    
          </div>
    
    
    
    {/* ////////////////////////////////////////////////////////////////// */}
    
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                value={user.address}
                onChange={handleInput}
                required
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
    
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Student
              </button>
            </div>
          </form>
    
          <div className="space-y-6">
            {/* <SetFeeForm addFee={addFee} /> */}
            {/* <PaymentForm payFee={payFee} /> */}
            {/* <BalanceDisplay balance={balance} /> */}
            {/* <TransactionList transactions={transactions} /> */}
          </div>
          
        </div>
       
        </>
      );


};

const SetFeeForm = ({ addFee }) => {
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
      <h1 className='text-center text-black font-semibold underline '>Set Fee Form</h1>
      <input
        type="number"
        placeholder="Enter Fee Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="Fee Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Fee
      </button>
    </form>
  );
};

const PaymentForm = ({ payFee }) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [receiptno, setReceiptno] = useState('');
  const [mode, setMode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    payFee({
      amount: parseFloat(amount),
      description,
      receiptno,
      mode,
    });
    setAmount(0);
    setDescription('');
    setReceiptno('');
    setMode('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
       <h1 className='text-center text-black font-semibold underline '>Payment Form</h1>
      <input
        type="number"
        placeholder="Payment Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      {/* <input
        type="text"
        placeholder="Payment Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      /> */}
       
     <input
        type="date"
        id="date"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        name="date"
        className="w-full p-2 border rounded"
      />
      
      <input
        type="text"
        placeholder="Receipt Number"
        value={receiptno}
        onChange={(e) => setReceiptno(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="Payment Mode"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Make Payment
      </button>
    </form>
  );
};

const TransactionList = ({ transactions }) => (
  <ul className="space-y-2">
    {transactions.map((transaction, index) => (
      <li key={index} className="p-2 bg-gray-100 rounded shadow">
        {transaction.type === 'fee' ? '+' : '-'} {transaction.amount} ({transaction.description})
      </li>
    ))}
  </ul>
);

const BalanceDisplay = ({ balance }) => (
  <div className="p-4 bg-gray-50 rounded shadow">
    <h3 className="text-lg font-bold">Current Balance: {balance}</h3>
  </div>
);

export default memo(Update);
