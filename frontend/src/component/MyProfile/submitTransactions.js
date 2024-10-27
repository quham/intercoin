import axios, { all } from 'axios';
import { ethers } from 'ethers';
import { abi } from './abi';
import { useCurrency} from '../CurrencyContext';
import { get } from 'http';

const API_URL = 'http://127.0.0.1:5000';
const contractAddress = "0x7fA609372f6D1bF89502bF8b0194b71717789594"; // move to config
const provider = new ethers.providers.JsonRpcProvider("https://sepolia.drpc.org");


const getWallet = async (token, mobile, email) => {
    return await axios.get(`${API_URL}/getWallet`,{ headers: { 'Authorization': `Bearer ${token}`} , params: {email, mobile}});
}
const addActivity = async (type, amount, recipient_wallet, email, mobile) => {
    const token = localStorage.getItem('token');
    if (type === "transfer" && !recipient_wallet){
    let response = await getWallet(token, mobile, email);
    recipient_wallet =  response.data.wallet_address;
    }
    if (type === "transfer") {
        console.log("transfering")
        await transfer(amount, recipient_wallet);
    }
    else if (type === "deposit"){
      await deposit(amount);
    }else if (type === "withdraw"){
      await withdraw(amount);
    }

    await axios.post(`${API_URL}/addActivity`, { type, amount,  recipient_wallet}, {
        headers: { 'Authorization': `Bearer ${token}` }
    }); // maybe abstract to function as well
    return true;
    
};
const transfer = async (amount, recipient_wallet) => {
    
    // const provider = new ethers.providers.JsonRpcProvider('https://polygon-amoy.g.alchemy.com/v2/TsZ4T0SNOKlXhFGD_1eMCVg6Lp1gV4ae');
    const privateKey = localStorage.getItem('privateKey');

    // Create a wallet instance using the private key and provider
    const wallet = new ethers.Wallet(privateKey, provider);

    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    try {
      // Call the transfer function
      const tx = await contract.transfer(recipient_wallet, ethers.utils.parseUnits(amount, 18));
      console.log("tx", tx.hash);
      //update balance
    //   await updateBalance();
    } catch (error) {
      console.error('Error transferring tokens:', error);
    }
}
const deposit = async (amount) => {
    // const provider = new ethers.providers.JsonRpcProvider('https://polygon-amoy.g.alchemy.com/v2/TsZ4T0SNOKlXhFGD_1eMCVg6Lp1gV4ae');
    const privateKey = localStorage.getItem('privateKey');

    // Create a wallet instance using the private key and provider
    const wallet = new ethers.Wallet(privateKey, provider);

    const token = localStorage.getItem('token');
    const address = wallet.address;
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    try {
      // Call the transfer function
      // const supply = await contract.totalSupply();
      // console.log('Supply:', ethers.utils.formatUnits(supply, 18));
      const intAmount = parseInt(amount);
      const tx = await contract.mint(address, intAmount);
      console.log("tx mint", tx.hash);

    } catch (error) {
      console.error('Error Minting tokens:', error);
    }


  //   await axios.post(`${API_URL}/deposit`, { amount, address}, {
  //     headers: { 'Authorization': `Bearer ${token}` }
  // });
}

const withdraw = async (amount) => {
  // const provider = new ethers.providers.JsonRpcProvider('https://polygon-amoy.g.alchemy.com/v2/TsZ4T0SNOKlXhFGD_1eMCVg6Lp1gV4ae');
  const privateKey = localStorage.getItem('privateKey');

  // Create a wallet instance using the private key and provider
  const wallet = new ethers.Wallet(privateKey, provider);
  const token = localStorage.getItem('token');
  const address = wallet.address;

  const contract = new ethers.Contract(contractAddress, abi, wallet);
  try {
    const tx = await contract.burn(ethers.utils.parseUnits(amount, 18));
    console.log("tx burn", tx.hash);
  } catch (error) {
    console.error('Error Burning:', error);
  }
//   await axios.post(`${API_URL}/withdraw`, { amount, address}, {
//     headers: { 'Authorization': `Bearer ${token}` }
// });
}
const getMaxDeposit = async () => {
    // const provider = new ethers.providers.JsonRpcProvider('https://polygon-amoy.g.alchemy.com/v2/TsZ4T0SNOKlXhFGD_1eMCVg6Lp1gV4ae');
    const privateKey = localStorage.getItem('privateKey');
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, abi, wallet);
    const supply = await contract.totalSupply();
    const totalSupply = ethers.utils.formatUnits(supply, 18);
    const allowedSupply = await contract.allowedSupply();
    return allowedSupply - totalSupply;
}

export { addActivity, getWallet, getMaxDeposit};