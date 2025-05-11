import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Api from '../others/Api';
import AsideBar from '../others/AsideBar';
import axios from 'axios';

const Payment = () => {
    const [user, setUser] = useState({
        rollno: "",
        surname: "",
        name: "",
        dob: "",
        jyear: "",
        group: "",
        year: "",
        fee: 0,
        school: "",
        tenthgpa: "",
        tenthmemo: "",
        inter: "",
        intergpa: "",
        intermemo: "",
        mobile: "",
        address: "",
        photo: "",
    });

    const [fee, setFee] = useState(0);
    const [payment, setPayment] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Payment of ${user.name}`;
    }, [user.name]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
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
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-4">
                <div className="mb-4">
                    <label htmlFor="fee" className="block text-sm font-medium mb-1">Set Fee</label>
                    <input
                        type="number"
                        id="fee"
                        placeholder="Enter the amount"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        name="fee"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="desc1" className="block text-sm font-medium mb-1">Description</label>
                    <input
                        type="text"
                        id="desc1"
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        name="description"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Set Fees</button>
                </div>
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
            payFee({ amount: parseFloat(amount), description, receiptno, mode });
            setAmount(0);
            setDescription('');
            setReceiptno('');
            setMode('');
        };

        return (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-4">
                <div className="mb-4">
                    <label htmlFor="pay" className="block text-sm font-medium mb-1">Pay Fee</label>
                    <input
                        type="number"
                        id="pay"
                        placeholder="Pay fee"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        name="fee"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
                    <input
                        type="date"
                        id="date"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        name="date"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="receipt" className="block text-sm font-medium mb-1">Receipt No</label>
                    <input
                        type="text"
                        id="receipt"
                        placeholder="Receipt no"
                        onChange={(e) => setReceiptno(e.target.value)}
                        value={receiptno}
                        name="receipt"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="mode" className="block text-sm font-medium mb-1">Payment Mode</label>
                    <input
                        type="text"
                        id="mode"
                        placeholder="Payment mode"
                        onChange={(e) => setMode(e.target.value)}
                        value={mode}
                        name="mode"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Make Payment</button>
                </div>
            </form>
        );
    };

    const TransactionList = ({ transactions }) => {
        return (
            <ul className="bg-white p-4 rounded shadow-md mb-4">
                {transactions.map((transaction, index) => (
                    <li key={index} className="mb-2">
                        <span className="font-semibold">{transaction.type === 'fee' ? '+' : '-'}</span>
                        Amount: {transaction.amount}, Description: {transaction.description}, Receipt No: {transaction.receiptno || 'N/A'}, Payment Mode: {transaction.mode || 'N/A'}
                    </li>
                ))}
            </ul>
        );
    };




    const BalanceDisplay = ({ balance }) => {
        return <p className="text-lg font-semibold mb-4">Total Balance Fees: {balance}</p>;
    };

    const getApi = async () => {
        try {
            const { data } = await Api.get(`/student/${id}`);
            setUser(data);
            setTransactions(data.transactions || []);
            setBalance(data.balance || 0);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getApi();
    }, [id]);

    // console.log(user.name);

    const [message, setMessage] = useState("");

    // console.log({transactions});


    useEffect(() => {
        // Dynamically update the message when user data, transactions, or balance changes
        if (user.mobile && transactions.length > 0) {
            const lastTransaction = transactions[transactions.length - 1]; // Fetch the last transaction
    
            if (lastTransaction.type === 'payment') {
                // If the last transaction is a payment
                setMessage(
                    `Hello from Vignan Degree College,
    Dear ${user.surname} ${user.name}, you have paid a fee of Rs. ${
                        lastTransaction.amount
                    } for the receipt number ${
                        lastTransaction.receiptno
                    }, and the balance amount is Rs. ${balance}, as on ${lastTransaction.description}
    Thank you from Vignan Management.`
                );
            } else if (lastTransaction.type === 'fee') {
                // If the last transaction is a fee
                setMessage(
                    `Hello from Vignan Degree College,
    Dear ${user.surname} ${user.name}, a new fee of Rs. ${
                        lastTransaction.amount
                    } has been added with the description "${
                        lastTransaction.description
                    }". Your updated balance is Rs. ${balance}.
    Thank you from Vignan Management.`
                );
            }
        }
    }, [user, balance, transactions]);
    

    // console.log("Last transaction is",lastTransaction.transaction.amount);
    

    const sendToWhatsapp = () => {
        const number = "+91" + user.mobile; // Concatenate country code with the mobile number
        const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
        window.open(url, "_self").focus();
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `https://vignan-degree-college.azurewebsites.net/api/vignan/student/${id}`,
                
                
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user),
                }
            );
            if (!response.ok) throw new Error("Failed to update user.");
            const data = await response.json();
            console.log("Updated Data", data);

            setUser(data);
            setTransactions(data.transactions || []);
            setBalance(data.balance || 0);

            navigate("/viewall");
        } catch (e) {
            console.error("Error:", e);
        }
    };


   
    return (
        <>
            <AsideBar />
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl text-black font-bold mb-4">Fee Payment Form for {user.surname} {user.name}</h1>
                
                <SetFeeForm addFee={addFee} />
                <PaymentForm payFee={payFee} />
                <TransactionList transactions={transactions} />

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
                    <section className="mb-4">
                        <label htmlFor="rollno" className="block text-sm font-medium mb-1">Roll No:</label>
                        <input
                            type="text"
                            id="rollno"
                            placeholder="Enter roll no"
                            value={user.rollno}
                            name="rollno"
                            onChange={handleChange}
                            readOnly
                            className="w-full p-2 border rounded"
                        />
                    </section>
                    <button type="submit" title='save' 
                    onClick={sendToWhatsapp}
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition">Submit</button>
                </form>

                <BalanceDisplay balance={balance} />
            </div>
        </>
    );
};

export default Payment;