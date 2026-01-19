import React from 'react';
import { Home, History, Settings, Plus } from 'lucide-react';

/**
 * Navigation Component
 * Bottom navigation bar for mobile, sidebar for desktop
 */
const Navigation = ({ currentView, setCurrentView, onAddTransactionClick }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'transactions', label: 'Transactions', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile: Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-40">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={onAddTransactionClick}
            className="flex flex-col items-center justify-center px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="text-xs mt-1 font-medium">Add</span>
          </button>
        </div>
      </nav>

      {/* Desktop: Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:left-0 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-8">
            <h1 className="text-2xl font-bold text-indigo-600">e-Wallet</h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="px-4 mt-auto pb-4">
            <button
              onClick={onAddTransactionClick}
              className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Transaction
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
