'use client';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useCurrency } from '../CurrencyContext'; // Import the convertCurrency function
import { getPortfolioData } from '../userInfoService';

export default function MyPieChart() {
    const [displayMode, setDisplayMode] = useState('percentage');
    const { convertCurrency, currencyText, balance, currency } = useCurrency();
    const [portfolio, setPortfolio] = useState([]);
    const [series, setSeries] = useState([]);
    const [totalValue, setTotalValue] = useState(0);

    const handleToggle = () => {
        setDisplayMode(displayMode === 'percentage' ? 'dollar' : 'percentage');
    };

    useEffect(() => {
        const fetchPortfolio = async () => {
            const p = await getPortfolioData(balance);
            setPortfolio(p);
            
            const convertedValues = p.map(item => parseFloat(convertCurrency(item.value)));
            setSeries(convertedValues);
            const total = convertedValues.reduce((a, b) => a + b, 0).toFixed(2);
            setTotalValue(total);

            
        };

        fetchPortfolio();
    }, [balance, convertCurrency, currency]);
    // useEffect(() => {
    //     handleToggle();
    // },[currency]);

    // useEffect(() => {
    //     if (portfolio.length > 0) {
    //         const convertedValues = portfolio.map(item => parseFloat(convertCurrency(item.value)));
    //         setSeries(convertedValues);

    //         const total = convertedValues.reduce((a, b) => a + b, 0).toFixed(2);
    //         setTotalValue(total);
    //     }
    // }, [portfolio, convertCurrency, currency]);

    const labels = portfolio.map(item => item.asset);


    const options = {
        chart: {
            width: 380,
            type: 'donut',
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270,
                donut: {
                    labels: {
                        show: true,
                        total: {
                            showAlways: true,
                            show: true,
                            label: 'Total',
                            formatter: () => displayMode === 'percentage' ? 
                                `100%` : 
                                `${currencyText()}${totalValue}`
                        }
                    }
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                const value = opts.w.globals.series[opts.seriesIndex];
                const percentage = (value / totalValue * 100).toFixed(0);
                return displayMode === 'percentage' ? `${percentage}%` : `${currencyText()}${value}`;
            }
        },
        fill: {
            type: 'gradient',
        },
        legend: {
            formatter: function (val, opts) {
                const value = opts.w.globals.series[opts.seriesIndex];
                const percentage = (value / totalValue * 100).toFixed(0); // ideally use values directly here rather than from setter above setter has delayed update
                return displayMode === 'percentage' ? 
                    `${labels[opts.seriesIndex]} - ${percentage}%` : 
                    `${labels[opts.seriesIndex]} - ${currencyText()}${value}`;
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    // Conditional rendering to avoid showing the chart before data is available
    if (balance === 0 || portfolio.length === 0) {
        return <div style={{ textAlign: 'center', background: "white", borderRadius: "20px", height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ padding: "20px 0px 0px 0px", fontSize: "25px" }}>My Investment Portfolio</h2>
        <p> You haven't invested yet!</p>
        </div>;
    }

    return (
        <div style={{ textAlign: 'center', background: "white", borderRadius: "20px", height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ padding: "20px 0px 0px 0px", fontSize: "25px" }}>My Investment Portfolio</h2>
            <div id="chart" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <ReactApexChart options={options} series={series} type="donut" width={380} key={`${displayMode}-${currency}`} />
            </div>
            <div style={{ marginBottom: "50px", marginLeft: "100px" }}>
                <label className="switch-p">
                    <input type="checkbox" className='checkbox-p' checked={displayMode === 'dollar'} onChange={handleToggle} />
                    <span className="slider-p">
                        <span className="symbol-p">{displayMode === 'dollar' ? currencyText() : '%'}</span>
                    </span>
                </label>
            </div>
        </div>
    );
}