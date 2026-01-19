import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

/**
 * Mock initial transactions data
 */
const initialTransactions = [
  {
    id: 1,
    title: 'Salary',
    category: 'Salary',
    amount: 5000,
    type: 'income',
    date: new Date('2024-01-15'),
  },
  {
    id: 2,
    title: 'Grocery Shopping',
    category: 'Food',
    amount: 150,
    type: 'expense',
    date: new Date('2024-01-16'),
  },
  {
    id: 3,
    title: 'Uber Ride',
    category: 'Transport',
    amount: 25,
    type: 'expense',
    date: new Date('2024-01-17'),
  },
  {
    id: 4,
    title: 'Freelance Project',
    category: 'Salary',
    amount: 800,
    type: 'income',
    date: new Date('2024-01-18'),
  },
  {
    id: 5,
    title: 'Restaurant',
    category: 'Food',
    amount: 75,
    type: 'expense',
    date: new Date('2024-01-19'),
  },
  {
    id: 6,
    title: 'Movie Tickets',
    category: 'Entertainment',
    amount: 40,
    type: 'expense',
    date: new Date('2024-01-20'),
  },
];

export const WalletProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    // Load from localStorage if available, otherwise use initial data
    const saved = localStorage.getItem('wallet-transactions');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert date strings back to Date objects
      return parsed.map(t => ({ ...t, date: new Date(t.date) }));
    }
    return initialTransactions;
  });

  const [userName] = useState('John Doe');

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('wallet-transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Calculate totals
  const totalBalance = transactions.reduce((sum, transaction) => {
    return transaction.type === 'income' 
      ? sum + transaction.amount 
      : sum - transaction.amount;
  }, 0);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // Add new transaction
  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now(),
      ...transaction,
      date: new Date(transaction.date || Date.now()),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const value = {
    transactions,
    userName,
    totalBalance,
    totalIncome,
    totalExpenses,
    addTransaction,
    deleteTransaction,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
