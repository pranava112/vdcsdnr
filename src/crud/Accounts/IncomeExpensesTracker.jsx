import React, {  useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <label>Amount:</label>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <label>Description:</label>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Set Fees</button>
    </form>
  );
}

// PaymentForm Component
function PaymentForm({ payFee }) {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    payFee({ amount: parseFloat(amount), description });
    setAmount(0);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Amount:</label>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <label>Date</label>
      <input type="date" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Make Payment</button>
    </form>
  );
}

// TransactionList Component
function TransactionList({ transactions }) {
  return (
    <ul>
      {transactions.map((transaction, index) => (
        <li key={index}>
          {transaction.type === 'income' ? '+' : '-'} {transaction.amount} - {transaction.description}
        </li>
      ))}
    </ul>
  );
}

// BalanceDisplay Component
function BalanceDisplay({ balance }) {
  return (
    <p>Total Balance Fees: {balance}</p>
  );
}

// Main Component: IncomeExpensesTracker
function IncomeExpensesTracker() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const addFee = (incomeData) => {
    setIncome(income + incomeData.amount);
    setTransactions([...transactions, { type: 'income', amount: incomeData.amount, description: incomeData.description }]);
    setBalance(balance + incomeData.amount);
  };

  const payFee = (expenseData) => {
    setExpenses([...expenses, expenseData]);
    setTransactions([...transactions, { type: 'expense', amount: expenseData.amount, description: expenseData.description }]);
    setBalance(balance - expenseData.amount);
  };

  return (
    <div>
      <section id='table-back'>
      <h1>Income and Expenses Tracker</h1>
      {/* Set Fee Form to add income */}
      <SetFeeForm addFee={addFee} />
      {/* Payment Form to track expenses */}
      <PaymentForm payFee={payFee} />
      {/* Transaction List */}
      <TransactionList transactions={transactions} />
      {/* Balance Display */}
      <BalanceDisplay balance={balance} />
      </section>
    </div>
  );
}

export default IncomeExpensesTracker;

