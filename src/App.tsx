import React, { useState } from 'react';
import Ledger from './component/Ledger';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<{ type: string; amount: number }[]>([]);

  const addTransaction = (type: string, amount: number) => {
    const newTransaction = { type, amount };
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div>
      <h1>Balance Sheet Ledger</h1>
      <Ledger transactions={transactions} addTransaction={addTransaction} />
    </div>
  );
};

export default App;

