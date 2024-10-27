'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getBalance, getExchangeRates} from './userInfoService';
import { FaDollarSign, FaEuroSign, FaPoundSign } from 'react-icons/fa';
import { FaNairaSign, FaAustralSign, FaBitcoinSign } from "react-icons/fa6";

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState('AFR');
    const [balance, setBalance] = useState(0); // Example initial balance
    const [exchangeRates, setExchangeRates] = useState({AFR:1});
    const [error, setError] = useState(null);
    const fetchBalance = async () => {

      console.log("fetching balance")
      const balance = await getBalance();
      console.log(balance);
      setBalance(balance);
      

  };

    useEffect(() => {
    
        const fetchExchangeRates = async () => {
          const exchangeRates = await getExchangeRates();
            setExchangeRates(exchangeRates);
            // console.log(response.data.balance);
        }

        fetchBalance();
        fetchExchangeRates();
        console.log("fetching balance")
    }, [currency]);

    const updateBalance = async () => {
      console.log("updating balance")
      setCurrency(currency);
    };
    // Conversion rates, typically fetched from an API
    // const conversionRates = {
    //     USD: 1,
    //     EUR: 0.93
    // };

    const convertCurrency = (amount) => (amount * exchangeRates[currency]).toFixed(2);
    const convertToAfri = (amount) => (amount / exchangeRates[currency]).toFixed(2);
    const convertedBalance = convertCurrency(balance);
    const currencyIcon = () => {
        let Icon;
        
        switch (currency) {
          case 'USD':
            Icon = FaDollarSign;
            break;
          case 'EUR':
            Icon = FaEuroSign;
            break;
          case 'GBP':
            Icon = FaPoundSign;
            break;
          case 'NGN':
            Icon = FaNairaSign;
            break;
          case 'AFR':
            Icon = FaAustralSign;
            break;
          case 'BTC':
            Icon = FaBitcoinSign;
            break;
          default:
            Icon = FaDollarSign; // default to USD if no match
        }
      
        return <Icon />;
      };
    const currencyText = () => {
        let text;
        switch (currency) {
            case 'USD':
                text = '$';
                break;
            case 'EUR':
                text = '€';
                break;
            case 'GBP':
                text = '£';
                break;
            case 'NGN':
                text = '₦';
                break;
            case 'AFR':
                text = '₳';
                break;
            case 'BTC':
                text = '₿';
                break;
            default:
                text = '$'; // default to USD if no match
        }

        return text;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, convertedBalance, convertCurrency, currencyIcon , currencyText, updateBalance, balance, fetchBalance, convertToAfri}}>
            {children}
        </CurrencyContext.Provider>
    );
};
