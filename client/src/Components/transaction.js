import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import Form from './Form';
import { Watch } from 'react-loader-spinner';

function Trans() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/transactions");
                const data = await response.json();
                setTransactions(data.transactions);
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

    const handleDeleteTransaction = (id) => {
        const newTransactions = transactions.filter((transaction) => transaction.id !== id);
        setTransactions(newTransactions);
    };

    return (
        <div className="transactions-container">
            {loading ? (
                <Watch type="ThreeDots" color="#000" height={40} width={40} />
            ) : (
                <>
                    <Filter transactions={transactions} onDelete={handleDeleteTransaction} />
                    <Form onSubmit={handleNewTransaction} />
                </>
            )}
        </div>
    );
}

export default Trans;
