import React, { useState, useRef } from 'react';
import './Ledger.css';

interface Transaction {
  type: string;
  amount: number;
  date: string; // Add date to the transaction
}

interface LedgerProps {
  transactions: Transaction[];
  addTransaction: (type: string, amount: number) => void;
}

const Ledger: React.FC<LedgerProps> = ({ transactions, addTransaction }) => {
  const [amount, setAmount] = useState<string>('');
  const [transactionType, setTransactionType] = useState<string>('debit');
  const totalDebitedRef = useRef<number>(0);
  const totalCreditedRef = useRef<number>(0);

  const handleTransaction = () => {
    if (amount) {
      const amountNumber = Number(amount);
      const type = transactionType;
      const currentDate = new Date().toLocaleString(); // Get current date and time
      addTransaction(type, amountNumber);

      if (type === 'debit') {
        totalDebitedRef.current += amountNumber;
      } else {
        totalCreditedRef.current += amountNumber;
      }

      setAmount(''); // Clear controlled input
    }
  };

  const balance = totalCreditedRef.current - totalDebitedRef.current;

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
        <button onClick={handleTransaction}>Add Transaction</button>
      </div>

      <h3>Total Debited: {totalDebitedRef.current}</h3>
      <h3>Total Credited: {totalCreditedRef.current}</h3>
      <h3>Balance: {balance}</h3>

      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Debit</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
              <td>{transaction.type === 'debit' ? `RS.${transaction.amount.toFixed(2)}` : '-'}</td>
              <td>{transaction.type === 'credit' ? `RS.${transaction.amount.toFixed(2)}` : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ledger;
