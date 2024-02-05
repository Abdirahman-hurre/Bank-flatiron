// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionList from './Components/TransactionList';
import TransactionForm from './Components/TransactionForm';
import './styles.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNewTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/transactions/${id}`);
      const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="App">
      <h1>Bank of Flatiron</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
          <TransactionForm onNewTransaction={handleNewTransaction} />
        </>
      )}
    </div>
  );
}

export default App;
