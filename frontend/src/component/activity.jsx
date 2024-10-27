'use client'
import React, { useState , useEffect} from 'react';
import './MyProfile/style.css';

import { useCurrency } from './CurrencyContext'; // Import the currency context

import { getActivity } from './userInfoService'; // Import the getActivity function

const Transactions = () => {

    const {convertCurrency, currencyText } = useCurrency();
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([
        { to: 'Me', email: 'quham@test.com', date: 'Sat, 20 Apr 2024', amount: 0.00, type: 'Deposited' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('June 2024');// change to use today's month
    useEffect(() => {
        const fetchTransactions= async () => {
            try {
                const date = new Date(selectedMonth);
                const month = date.getMonth() + 1; 
                const arr = await getActivity(month);
                setTransactions(arr);
                console.log('Transactions:', arr)
            }
          catch(error){
            console.error('Error fetching transactions Stats:', error);
          
          }finally{
            if (loading){
                setLoading(false);
            }
          }
        };

        fetchTransactions();
}, [loading, selectedMonth]);
// setLoading(true);


    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    // Filter transactions by search term and selected month
    const filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const transactionMonthYear = `${transactionDate.toLocaleString('default', { month: 'long' })} ${transactionDate.getFullYear()}`;
        return transaction.to.toLowerCase().includes(searchTerm.toLowerCase()) &&
            transactionMonthYear === selectedMonth;
    });

    // Generate list of months from transactions for the dropdown
    const months = Array.from(new Set(transactions.map(transaction => {
        const date = new Date(transaction.date);
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    })));

    return (
        <div className="transactions-container">
            <div className="header-t">
                <h2 className='trans-head'>Activity</h2>
                <div className="search">
                    <input type="text" className="search__input" placeholder="Search"
                        value={searchTerm}
                        onChange={handleChange} />
                    <button className="search__button">
                        <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                            <g>
                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
                <select value={selectedMonth} onChange={handleMonthChange} className="date-select">
                    {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>To/From</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.length > 0 ? filteredTransactions.map((transaction, index) => (
                            <tr key={index}>
                                <td className='name'>{transaction.to} <br /> <span>{transaction.from_}</span></td>
                                <td>{transaction.date}</td>
                                <td>{currencyText()}  {convertCurrency(transaction.amount)}</td>
                                <td>
                                    <span className={`status ${transaction.type.toLowerCase()}`}>{transaction.type.replace("_", ' ')}</span>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="4">No transactions found for this month</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transactions;

// const currentDate = new Date();
    
    // // Array of month names
    // const monthNames = [
    //     'January', 'February', 'March', 'April', 'May', 'June',
    //     'July', 'August', 'September', 'October', 'November', 'December'
    // ];
    
    // // Format the current month and year
    // const currentMonthYear = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    // // Initialize the state with the current month and year
    // const [selectedMonth, setSelectedMonth] = useState(currentMonthYear);