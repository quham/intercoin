import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';
const getReserves = async () => {
    const token = localStorage.getItem('token');
    
    const response = await axios.get(`${API_URL}/reserves`, {
        headers: { 'Authorization': `Bearer ${token}` }});
    return response.data.reserves;
    
};
const getReserveProofs = async () => {
    const token = localStorage.getItem('token');
    
    const response = await axios.get(`${API_URL}/reserveProofs`, {
        headers: { 'Authorization': `Bearer ${token}` }});
    return response.data.proofs;
    
}
const getReserveTime= async () => {
    const token = localStorage.getItem('token');
    
    const response = await axios.get(`${API_URL}/reserveTime`, {
        headers: { 'Authorization': `Bearer ${token}` }});
    return response.data.time;
    
}
const addNotary = async (host, port) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/addNotary`, {
        host,
        port
    }, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response;
}
export { getReserves , getReserveProofs, getReserveTime, addNotary};