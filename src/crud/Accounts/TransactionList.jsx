import React, { useEffect, useState } from "react";
import axios from "axios";
import Api from "../others/Api";

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch transactions data
    const fetchTransactions = async () => {
        try {
            const response = await Api.get("/student");
            // axios.get("http://localhost:8080/api/vignan/student");
            setTransactions(response.data);
            setFilteredTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    // Search by receipt number
    const searchByReceiptNo = () => {
        const filtered = transactions.filter((transaction) => {
            if (transaction.transactions && Array.isArray(transaction.transactions)) {
                return transaction.transactions.some((t) =>
                    t.receiptno?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            return false;
        });
        setFilteredTransactions(filtered);
    };

    return (
        <div className="p-6 bg-gray-100 transactions">
            <h1 className="text-2xl text-black font-bold mb-4 transactions text-center">Transaction List</h1>

            <div className="flex items-center mb-4 space-x-4">
                <input
                    type="text"
                    className="border px-4 py-2 rounded"
                    placeholder="Enter Receipt No"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    onClick={searchByReceiptNo}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Search
                </button>
            </div>

            <table className="w-full border-collapse text-sm bg-white rounded-lg shadow">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="p-3 border">Roll No</th>
                        <th className="p-3 border">Transactions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.length === 0 ? (
                        <tr>
                            <td colSpan="1" className="text-center p-4">
                                No transactions found.
                            </td>
                        </tr>
                    ) : (
                        filteredTransactions.map((transaction, index) => (
                            <tr key={index} className="border-b transactions">
                                <td className="p-3 ">
                                    <ul className="mt-2 text-sm text-gray-600 transactions">
                                    {transaction.rollno}
                                    </ul>
                                </td>
                                <td className="p-3">
                                    <ul className="mt-2 text-sm text-gray-600 transactions">
                                        {transaction.transactions.map((t, tIndex) => (
                                            <li key={tIndex}>
                                                <strong>{t.type}</strong> - ₹{t.amount} -- {t.description} -- Receipt-No = {t.receiptno}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;
