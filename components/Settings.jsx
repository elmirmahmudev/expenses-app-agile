import React from 'react';
import { User, Wallet, Trash2, AlertCircle } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

/**
 * Settings Component
 * User settings and wallet management options
 */
const Settings = () => {
  const { userName, transactions, totalBalance } = useWallet();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Clear all transactions
  const handleClearAllTransactions = () => {
    if (window.confirm('Are you sure you want to clear all transactions? This action cannot be undone.')) {
      localStorage.removeItem('wallet-transactions');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Settings</h2>

        {/* User Profile Section */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <User className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
              <p className="text-sm text-gray-500">User information</p>
            </div>
          </div>
          <div className="ml-16 space-y-2">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <p className="text-gray-900 font-semibold">{userName}</p>
            </div>
          </div>
        </div>

        {/* Wallet Information Section */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Wallet Information</h3>
              <p className="text-sm text-gray-500">Current wallet statistics</p>
            </div>
          </div>
          <div className="ml-16 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Balance</span>
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(totalBalance)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Transactions</span>
              <span className="text-lg font-semibold text-gray-900">
                {transactions.length}
              </span>
            </div>
          </div>
        </div>

        {/* Data Management Section */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
              <p className="text-sm text-gray-500">Manage your wallet data</p>
            </div>
          </div>
          <div className="ml-16">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-yellow-800 font-medium mb-1">Warning</p>
                  <p className="text-sm text-yellow-700">
                    Clearing all transactions will remove all your transaction history. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleClearAllTransactions}
              className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear All Transactions
            </button>
          </div>
        </div>
      </div>

      {/* App Information */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About e-Wallet</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>Version: 1.0.0</p>
          <p>A modern digital wallet application for managing your finances.</p>
          <p className="pt-2 text-xs text-gray-500">
            Built with React, Vite, Tailwind CSS, and Recharts
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
