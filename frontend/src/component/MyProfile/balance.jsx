'use client'
import React, { useEffect, useState } from 'react';
import { FaDollarSign, FaEuroSign ,FaWallet} from 'react-icons/fa';
import { useCurrency } from '../CurrencyContext'; // Import the currency context
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { getPrevBalance } from '../userInfoService';
import { set } from 'date-fns';

function Balance() {
    const {currency, setCurrency, convertedBalance, currencyIcon, currencyText, convertCurrency, balance} = useCurrency();
    const [prevBalance, setPrevBalance] = useState(2);

    useEffect(() => {
        const fetchBalance = async () => {

            console.log("fetching prev balaance")
            const pb = await getPrevBalance()
            setPrevBalance(pb);
            // const prev = convertCurrency(pb);
            // setPercentChange(();
            // setChange(convertCurrency((balance - pb)));

 
        };

        fetchBalance();
    }, []);
        
    return (
        <div className='card-chart  card-balance'>
            <div className='chart'>
                <div style={{ display: 'flex', alignItems: 'center' }} className='balance-div-'>
                    <FaWallet style={{ verticalAlign: 'middle' ,marginRight: '0.5rem'}} className='currencyIcon'  />
                    <span className='head'>Balance</span>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)} className='custom-datepicker-style custom-currency'>
                        <option value="AFR">AFR</option>
                        <option value="USD">USD</option>
                        <option value="NGN">NGN</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="BTC">BTC</option>
                    </select>
                </div>
                <div>
                    <h1 className='balance-head'> {currencyText()}  {convertedBalance}</h1>
                   
                </div>
                <div>
                <p style={{fontSize:'12px'}} className='green'> <span> {balance > prevBalance ? <FaArrowUp className="arrow-icon green" /> : <FaArrowDown className="arrow-icon red" /> }  </span> <span style={{color:'white'}}> {balance > prevBalance ? "+" : ""} {(((balance - prevBalance) / prevBalance) * 100).toFixed(2)}% {currencyText()}{(balance - prevBalance)} today </span></p>  
                </div>
            </div>
        </div>
    );
}//problem with currencyText here?

export default Balance;
