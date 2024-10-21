import React, { useState, useRef } from 'react';
import './Ledger.css';


interface Transaction {
  type: string;
  amount: number;
}

interface LedgerProps {
  transactions: Transaction[];
  addTransaction: (type: string, amount: number) => void;
}

const Ledger: React.FC<LedgerProps> = ({ transactions, addTransaction }) => {
  const [debitAmount, setDebitAmount] = useState<string>('');
  const [creditAmount, setCreditAmount] = useState<string>('');
  const totalDebitedRef = useRef<number>(0);
  const totalCreditedRef = useRef<number>(0);

  const handleDebit = () => {
    if (debitAmount) {
      addTransaction('debit', Number(debitAmount));
      totalDebitedRef.current += Number(debitAmount);
      setDebitAmount(''); // Clear controlled input
    }
  };

  const handleCredit = () => {
    if (creditAmount) {
      addTransaction('credit', Number(creditAmount));
      totalCreditedRef.current += Number(creditAmount);
      setCreditAmount(''); // Clear controlled input
    }
  };

  const balance = totalCreditedRef.current - totalDebitedRef.current;

  return (
    <div>
      <h2>Transactions</h2>
      <div>
        <input
          type="number"
          value={debitAmount}
          onChange={e => setDebitAmount(e.target.value)}
          placeholder="Debit Amount"
        />
        <button onClick={handleDebit}>Debit</button>
      </div>
      <div>
        <input
          type="number"
          value={creditAmount}
          onChange={e => setCreditAmount(e.target.value)}
          placeholder="Credit Amount"
        />
        <button onClick={handleCredit}>Credit</button>
      </div>
      <h3>Total Debited: {totalDebitedRef.current}</h3>
      <h3>Total Credited: {totalCreditedRef.current}</h3>
      <h3>Balance: {balance}</h3>

      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}: ${transaction.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ledger;
