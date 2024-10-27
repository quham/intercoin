'use client'
import { useEffect } from "react";
import BalanceHistoryChart from "./balanceHistory";
import Balance from "./balance";
import MoneyBtns from "./transactions";
import Transactions from "../activity";
import { CurrencyProvider } from "../CurrencyContext";
import MyPieChart from "./InvestmentPortfolio";
import AssetReserves from "./reserves";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const { default: Cards } = require("../cashflows");

function Homez() {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
    }, []);

    return (
        <>
            <CurrencyProvider>
                <div id="main-content" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}> 
                        <Cards />
                    </div>
                    <div className="balance-chart-main" style={{ marginTop: "20px" }}>
                        <div style={{ width: "30%" }}>
                            <Balance />
                        </div>
                        <div style={{ width: "60%" }}>
                            <BalanceHistoryChart />
                        </div>
                    </div>
                    <div  >
                        <MoneyBtns />
                    </div>
                    <div data-aos="fade-up">
                        <Transactions />
                    </div>
                    <div className="chart-reserve-div" style={{ marginTop: "20px", display: "flex", justifyContent: "space-evenly" }} >
                        <div style={{ width: "30%" }} data-aos="fade-right">
                            <MyPieChart />
                        </div>
                        <div style={{ width: "60%" }} data-aos="fade-up">
                            <AssetReserves />
                        </div>
                    </div>
                </div>
            </CurrencyProvider>
        </>
    )
}

export default Homez;
