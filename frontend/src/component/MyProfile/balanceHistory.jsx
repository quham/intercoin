'use client'
import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import { useCurrency } from '../CurrencyContext'; // Import the currency context
import { FaDollarSign, FaEuroSign ,FaChartLine} from 'react-icons/fa'; // Importing Euro sign icon
import { getBalanceHistory } from '../userInfoService'; // Import the getBalanceHistory function

function BalanceHistoryChart() {
    const { convertCurrency, convertedBalance, currencyText, currency} = useCurrency();
    const [month, setMonth] = useState('Jun 2024'); // Default to January
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [balances, setBalances] = useState([])
    const monthToNumber = {
        'Jan 2024': 1,
        'Feb 2024': 2,
        'Mar 2024': 3,
        'Apr 2024': 4,
        'May 2024': 5,
        'Jun 2024': 6,
        'Jul 2024': 7,
        'Aug 2024': 8,
        'Sep 2024': 9,
        'Oct 2024': 10,
        'Nov 2024': 11,
        'Dec 2024': 12
    };

    const getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };
    const setter = async () => {
        const monthNumber = monthToNumber[month];
        console.log(monthNumber)
        setBalances(Array.from(await getBalanceHistory(monthNumber.toString())));

    }
    useEffect(() => {
    setter();
    } , [month]);
    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(173, 216, 230, 1)');
        gradient.addColorStop(1, 'rgba(173, 216, 230, 0)');

        const monthNumber = monthToNumber[month];
        const year = parseInt(month.split(' ')[1], 10);
        const daysInMonth = getDaysInMonth(monthNumber, year);
        const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}/${monthNumber}`);

        // const randomBalances = new Array(daysInMonth).fill(0).map(() => Math.random() * 20);
        

        
        // console.log(history)
        // console.log("data", response.data)
        console.log("balances", balances)
        const convertedBalances = balances.map(balance => parseFloat(convertCurrency(balance)));

        const data = {
            labels: labels,
            datasets: [{
                data: convertedBalances,
                backgroundColor: gradient,
                borderColor: '#FFFF',
                borderWidth: 2,
                pointBackgroundColor: '#FFFFFF',
                pointBorderColor: '#FFFF',
                pointRadius: 0,
                pointHoverRadius: 5,
                tension: 0.4,
            }]
        };

        const options = {
            plugins: {
                datalabels: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (context) {
                            if (context.raw === undefined) return 'No data';
                            return `${currencyText()}${context.raw.toFixed(2)}`;
                        }
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white',
                        callback: function (value) {
                            return `${currencyText()}${value.toFixed(2)}`;
                        }
                    },
                    grid: {
                        display: true,
                        drawBorder: false,
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                },
                x: {
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            maintainAspectRatio: false
        };

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });

    }, [convertedBalance, balances, currency]); // Re-render chart when month or currency changes


    return (
        <div className='card-chart card-chart-balance'>
            <div style={{ width: '100%', height: '270px', position: 'relative', borderRadius: '10px' }} className='chart'>
                <div className='balance-chart-main-d'>
                    <div style={{ display: 'flex', alignItems: 'center' }} > {/* Flex container */}
                        <FaChartLine style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} className='currencyIcon' />
                        <span className='head'>Balance History</span>
                    </div>

                    <select value={month} onChange={(e) => setMonth(e.target.value)} className="custom-datepicker-style custom-datepicker">
                        {Object.keys(monthToNumber).map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
                <canvas ref={chartRef} />
            </div>
        </div>
    );
}

export default BalanceHistoryChart;
