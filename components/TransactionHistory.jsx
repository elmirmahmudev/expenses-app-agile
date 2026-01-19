import React from 'react';
import { Trash2, Calendar } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

/**
 * Transaction History Component
 * Displays a scrollable list of recent transactions
 */
const TransactionHistory = () => {
  const { transactions, deleteTransaction } = useWallet();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      Food: 'bg-orange-100 text-orange-700',
      Transport: 'bg-blue-100 text-blue-700',
      Salary: 'bg-green-100 text-green-700',
      Entertainment: 'bg-purple-100 text-purple-700',
      Shopping: 'bg-pink-100 text-pink-700',
      Utilities: 'bg-yellow-100 text-yellow-700',
      Other: 'bg-gray-100 text-gray-700',
    };
    return colors[category] || colors.Other;
  };

  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Transaction History</h2>
      
      {sortedTransactions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No transactions yet. Add your first transaction!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {sortedTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* Transaction Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(transaction.category)}`}>
                    {transaction.category}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {transaction.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(transaction.date)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amount and Delete Button */}
              <div className="flex items-center gap-4">
                <span
                  className={`text-lg font-bold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </span>
                <button
                  onClick={() => deleteTransaction(transaction.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  aria-label="Delete transaction"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
