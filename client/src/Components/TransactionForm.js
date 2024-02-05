// src/components/TransactionForm.js
import React, { useState } from 'react';

const TransactionForm = ({ onNewTransaction }) => {
    const [formData, setFormData] = useState({
        description: '',
        amount: 0,
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTransaction = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
            ...formData,
        };

        onNewTransaction(newTransaction);
        setFormData({
            description: '',
            amount: 0,
        });
    };

    return (
        <div>
            <h2>Add New Transaction</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Amount:
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
};

export default TransactionForm;
