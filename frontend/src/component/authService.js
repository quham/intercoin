import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

const register = (email, password, username, wallet_address) => {
    console.log("Registering user");
    console.log(email);
    console.log(password);
    return axios.post(`${API_URL}/register`, { email, password, username, wallet_address });
};

const  login = async (email, password) => {
    console.log("Logging in user");
    return await axios.post(`${API_URL}/login`, { email, password });

    
};

const logout = () => {
    localStorage.removeItem("token"); 
    // window.location.href = "/login";
    
    
};


export { register, login, logout};