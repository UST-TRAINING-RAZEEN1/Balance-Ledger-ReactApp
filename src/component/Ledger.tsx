import React, { useState } from 'react';
import './Ledger.css';

interface Transaction {
  type: string;
  amount: number;
  date: string;
  purpose: string; // Added purpose to the transaction
}

interface LedgerProps {
  transactions: Transaction[];
  addTransaction: (type: string, amount: number, purpose: string) => void;
}

const Ledger: React.FC<LedgerProps> = ({ transactions, addTransaction }) => {
  const [amount, setAmount] = useState<string>('');
  const [transactionType, setTransactionType] = useState<string>('debit');
  const [purpose, setPurpose] = useState<string>(''); // State for purpose

  const handleTransaction = () => {
    const amountNumber = Number(amount);
    if (amount && amountNumber > 0 && purpose) {
      // const currentDate = new Date().toLocaleString();
      addTransaction(transactionType, amountNumber, purpose);
      setAmount(''); // Clear input
      setPurpose(''); // Clear purpose input
    } else {
      alert("Please enter a valid amount and purpose");
    }
  };

  const totalDebited = transactions
    
    .filter(tx => tx.type === 'debit')
    .reduce((acc, tx) => acc + tx.amount, 0);
  const totalCredited = transactions
    .filter(tx => tx.type === 'credit')
    .reduce((acc, tx) => acc + tx.amount, 0);
  const balance = totalCredited - totalDebited;

  // Calculate running balance for each transaction
  let runningBalance = 0;

  return (
    <div>
      <h2>Transactions</h2>
      <div>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <select value={transactionType} onChange={e => setTransactionType(e.target.value)}>
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>
        <input
          type="string"
          value={purpose}
          onChange={e => setPurpose(e.target.value)}
          placeholder="Purpose"
        />
        <button onClick={handleTransaction}>Add Transaction</button>
      </div>

      <h3>Total Debited: RS.{totalDebited.toFixed(2)}</h3>
      <h3>Total Credited: RS.{totalCredited.toFixed(2)}</h3>
      <h3>Balance: RS.{balance.toFixed(2)}</h3>

      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Purpose</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            runningBalance += transaction.type === 'credit' ? transaction.amount : -transaction.amount;
            return (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.purpose}</td>
                <td>{transaction.type === 'debit' ? `RS.${transaction.amount.toFixed(2)}` : '-'}</td>
                <td>{transaction.type === 'credit' ? `RS.${transaction.amount.toFixed(2)}` : '-'}</td>
                <td>RS.{runningBalance.toFixed(2)}</td> {/* Display running balance */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Ledger;
