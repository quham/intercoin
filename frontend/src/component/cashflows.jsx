'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useCurrency } from './CurrencyContext'; // Import the currency context
import { getCashflows } from './userInfoService'; 
import { set } from 'date-fns';

function Cards() {
    const { convertCurrency, currencyText } = useCurrency();
    const [amountIn, setAmountIn] = useState(0.0); // should i chnage to strings?
    const [amountOut, setAmountOut] = useState(0.0);
    const [investmentReturn, setInvestmentReturn] = useState(0.0);
    const [amountInPctChange, setAmountInPctChange] = useState(0.0);
    const [amountOutPctChange, setAmountOutPctChange] = useState(0.0);
    const [investmentReturnPctChange, setInvestmentReturnPctChange] = useState(0.0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCashflows = async () => {
            try {
                const response = await getCashflows();
                const data = response.data;
                console.log("response", data);
                setAmountIn(data.amountIn);
                setAmountOut(data.amountOut);
                setInvestmentReturn(data.investmentReturn);
                setAmountInPctChange(data.amountInPctChange);
                setAmountOutPctChange(data.amountOutPctChange);
                setInvestmentReturnPctChange(data.investmentReturnPctChange);
            }
          catch(error){
            console.error('Error fetching Cashflow Stats:', error);
          
          }finally{
            if (loading){
                setLoading(false);
            }
          }
        };

        fetchCashflows();
}, [loading]);
    const cardstext = [
        { id: 1, title: "Amount in", amount: amountIn, incDec: `${amountInPctChange * 100}%` },
        { id: 2, title: "Amount Out", amount: amountOut, incDec: `${amountOutPctChange * 100}%`},
        { id: 3, title: "Investment Return", amount: investmentReturn, incDec: `${investmentReturnPctChange * 100}%`}
    ];

    return (
        <div className="cards-container ">
            {cardstext.map((card) => (
                <div key={card.id} className="card">
                    <h3>{card.title}</h3>
                    <h2>{currencyText()} {convertCurrency(card.amount)}</h2>
                    <div className="card-row">
                        <p>From Last Month</p>
                        <p className={parseFloat(card.incDec) > 0 ? 'green' : 'red'}>
                            {card.incDec}
                          <span>  {parseFloat(card.incDec) > 0 ? <FaArrowUp className="arrow-icon green" /> : <FaArrowDown className="arrow-icon red" />} </span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Cards;
