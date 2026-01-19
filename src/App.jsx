import React, { useState } from 'react';
import { WalletProvider } from './context/WalletContext';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import TransactionHistory from './components/TransactionHistory';
import Settings from './components/Settings';
import AddTransaction from './components/AddTransaction';

/**
 * Main App Component
 * Single Page Application (SPA) for e-Wallet
 */
function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);

  // Render current view
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <TransactionHistory />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <WalletProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <Navigation
          currentView={currentView}
          setCurrentView={setCurrentView}
          onAddTransactionClick={() => setIsAddTransactionOpen(true)}
        />

        {/* Main Content */}
        <main className="md:ml-64 pb-20 md:pb-0">
          <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
            {renderView()}
          </div>
        </main>

        {/* Add Transaction Modal */}
        <AddTransaction
          isOpen={isAddTransactionOpen}
          onClose={() => setIsAddTransactionOpen(false)}
        />
      </div>
    </WalletProvider>
  );
}

export default App;
