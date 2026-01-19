# e-Wallet - Digital Wallet Application

A modern, responsive Single Page Application (SPA) for managing your digital wallet with transaction tracking, analytics, and a beautiful UI.

## 🚀 Features

- **Dashboard**: View total balance, income, expenses, and spending trends chart
- **Transaction History**: Scrollable list of all transactions with categories and dates
- **Add Transactions**: Modal form to add income/expense with validation
- **Virtual Card**: Beautiful card representation with balance
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Local Storage**: Data persists in browser's localStorage

## 🛠️ Tech Stack

- **React.js** with Vite
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Recharts** for data visualization
- **Context API** for state management

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
e-wallet/
├── src/
│   ├── components/         # React components
│   │   ├── AddTransaction.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Navigation.jsx
│   │   ├── Settings.jsx
│   │   ├── TransactionHistory.jsx
│   │   └── VirtualCard.jsx
│   ├── context/            # Context API for state management
│   │   └── WalletContext.jsx
│   ├── App.jsx             # Main App component
│   ├── main.jsx            # Entry point
│   └── index.css           # Tailwind CSS imports
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎯 Usage

1. **View Dashboard**: See your total balance, income, expenses, and spending trends
2. **Add Transactions**: Click the "Add Transaction" button to add income or expenses
3. **View History**: Navigate to "Transactions" to see all your transaction history
4. **Settings**: Access settings to view wallet information and manage data

## ✨ Features in Detail

- **Form Validation**: All transaction forms include validation for required fields
- **Category System**: Transactions are organized by categories (Food, Transport, Salary, etc.)
- **Data Persistence**: All transactions are saved to localStorage
- **Responsive Navigation**: Bottom navigation on mobile, sidebar on desktop
- **Visual Charts**: Spending trends displayed with Recharts
- **Transaction Management**: Delete transactions directly from the history

Enjoy managing your finances with e-Wallet! 💰