import React, { useState, useEffect } from 'react';
import Ledger from './component/Ledger'; // Adjust the import according to your file structure

interface Transaction {
  type: string;
  amount: number;
  date: string; // Include date in the Transaction interface
}

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (type: string, amount: number) => {
    const newTransaction: Transaction = {
      type,
      amount,
      date: new Date().toLocaleString(), // Capture the current date
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  

  return (
    <div>
      <h1>Balance Sheet Ledger</h1>
      <Ledger transactions={transactions} addTransaction={addTransaction} />
    </div>
  );
};

export default App;




