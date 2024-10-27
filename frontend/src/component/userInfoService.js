import axios from 'axios';
import { ethers } from 'ethers';
import { abi } from './MyProfile/abi';

const API_URL = 'http://127.0.0.1:5000';

const getDefaultCurrency = () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/defaultCurrency`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
};

const setDefaultCurrency = (currency) => {
  const token = localStorage.getItem('token');
  return axios.post(`${API_URL}/setCurrency`, { currency }, {
    headers: {'Authorization': `Bearer ${token}` },
  });
      
};

const getBalance = async () => {
  const provider = new ethers.providers.JsonRpcProvider("https://sepolia.drpc.org");
  // const provider = new ethers.providers.JsonRpcProvider('https://polygon-amoy.g.alchemy.com/v2/TsZ4T0SNOKlXhFGD_1eMCVg6Lp1gV4ae');
  const privateKey = localStorage.getItem('privateKey');

  // Create a wallet instance using the private key and provider
  const contractAddress = "0x7fA609372f6D1bF89502bF8b0194b71717789594";
  const wallet = new ethers.Wallet(privateKey, provider);



  const contract = new ethers.Contract(contractAddress, abi, wallet);

  try {
    // Call the transfer function
    const balance = await contract.balanceOf(wallet.address);
    console.log('Balance:', ethers.utils.formatUnits(balance, 18));
    return ethers.utils.formatUnits(balance, 18);
  } catch (error) {
    console.error('Error getting balance:', error);
    return 0;
  }
    
};
const getBalanceHistory = async (month) => {
    const token = localStorage.getItem('token');
    const response =  await axios.get(`${API_URL}/balanceHistory`, {
        headers: { 'Authorization': `Bearer ${token}` }, params: { month }});

    return response.data.balance_history;
}
const getCashflows = async () => {
    const token = localStorage.getItem('token');
    
    return await axios.get(`${API_URL}/cashflows`, {
        headers: { 'Authorization': `Bearer ${token}` }});
    
};
const getPrevBalance = async () => {
  const token = localStorage.getItem('token');
  
  const response = await axios.get(`${API_URL}/prevBalance`, {
      headers: { 'Authorization': `Bearer ${token}` }});
  console.log("response prev", response)
  console.log("response prev balance", response.data.prevBalance)
  return response.data.prevBalance  ;
  
};

const getActivity = async (month) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/getActivity`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { month },
      });
      console.log("response_act", response)
      console.log("response activity", response.data.activity)
      return response.data.activity; // Extract activity list
    } catch (error) {
      console.error("Error fetching activity:", error);
      throw error; // Handle the error gracefully
    }
  };
const getPortfolioData = async () => {
    const token = localStorage.getItem('token');
    const balance = await getBalance();
    const response = await axios.get(`${API_URL}/getPortfolio`, {
        headers: { 'Authorization': `Bearer ${token}` }, params: { balance }});
    return response.data.portfolio;
    
};

const getUserDetails = async () => {
    const token = localStorage.getItem('token');
    
    const response = await axios.get(`${API_URL}/userDetails`, {
        headers: { 'Authorization': `Bearer ${token}` }});
    console.log("response", response.data.details)
    return response.data.details;
    
    
};  
const getExchangeRates = async () => {
  const token = localStorage.getItem('token');
  
  const response = await axios.get(`${API_URL}/exchangeRates`, {
      headers: { 'Authorization': `Bearer ${token}` }});
  
  return response.data.exchangeRates;
  
};

export { getBalance, getBalanceHistory, getCashflows, getActivity, getPortfolioData, getExchangeRates, getDefaultCurrency, getPrevBalance, getUserDetails};