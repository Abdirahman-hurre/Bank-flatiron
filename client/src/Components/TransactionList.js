// src/components/TransactionList.js
import React from 'react';

const TransactionList = ({ transactions, onDelete }) => {
    return (
        <div>
            <h2>Transaction List</h2>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        {transaction.description} - {transaction.amount}$
                        <button onClick={() => onDelete(transaction.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
