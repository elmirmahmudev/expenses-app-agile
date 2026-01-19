import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import VirtualCard from './VirtualCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Dashboard Component
 * Displays total balance, income/expense summary, and spending trends chart
 */
const Dashboard = () => {
  const { totalBalance, totalIncome, totalExpenses, transactions } = useWallet();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Prepare chart data (last 7 days of expenses)
  const prepareChartData = () => {
    const last7Days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const dayExpenses = transactions
        .filter(t => {
          const tDate = new Date(t.date);
          tDate.setHours(0, 0, 0, 0);
          return t.type === 'expense' && tDate.getTime() === date.getTime();
        })
        .reduce((sum, t) => sum + t.amount, 0);

      last7Days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        expenses: dayExpenses,
      });
    }

    return last7Days;
  };

  const chartData = prepareChartData();

  return (
    <div className="space-y-6">
      {/* Virtual Card */}
      <VirtualCard />

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Balance */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Balance</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(totalBalance)}
              </p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Total Income */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Income</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(totalIncome)}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(totalExpenses)}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Spending Trends Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Spending Trends (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              formatter={(value) => [`$${value}`, 'Expenses']}
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={{ fill: '#ef4444', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
