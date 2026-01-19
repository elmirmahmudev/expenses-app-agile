import React from 'react';
import { CreditCard } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

/**
 * Virtual Card Component
 * Displays a visually appealing credit/debit card representation
 */
const VirtualCard = () => {
  const { userName, totalBalance } = useWallet();

  // Format balance with currency symbol
  const formatBalance = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      {/* Card Container */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl shadow-2xl overflow-hidden p-6 text-white transform hover:scale-105 transition-transform duration-300">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
        
        {/* Card Content */}
        <div className="relative z-10">
          {/* Card Icon */}
          <div className="flex justify-between items-start mb-8">
            <CreditCard className="w-8 h-8" />
            <div className="text-right">
              <div className="text-sm opacity-80">Balance</div>
              <div className="text-2xl font-bold">{formatBalance(Math.abs(totalBalance))}</div>
            </div>
          </div>

          {/* Card Number */}
          <div className="mb-6">
            <div className="text-sm opacity-80 mb-2">Card Number</div>
            <div className="text-xl font-mono tracking-wider">**** **** **** 4242</div>
          </div>

          {/* Card Holder and Expiry */}
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs opacity-80 mb-1">Card Holder</div>
              <div className="text-lg font-semibold uppercase">{userName}</div>
            </div>
            <div className="text-right">
              <div className="text-xs opacity-80 mb-1">Expires</div>
              <div className="text-lg font-semibold">12/25</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualCard;
