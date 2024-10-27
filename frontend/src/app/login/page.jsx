'use client';
import React, { useState, useEffect } from 'react';
import { generateKeyPair } from 'crypto';
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';
// import { useNavigate } from 'react-router-dom';
import { register, login } from '../../component/authService'; // Import the authService functions
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ethers } from 'ethers';
import '@/component/MyProfile/style.css'

const API_URL = 'http://127.0.0.1:5000';


export default function SignUp() {
    const [activeRequestOption, setActiveRequestOption] = useState('login');
    const router = useRouter();
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [privateKey, setPrivateKey] = useState(null);
    // const navigate = useNavigate();
    // const [publicKey, setPublicKey] = useState(null);
    // const [address, setAddress] = useState("");

  
    const address = "";
  const generateKeyPair = async () => {
    console.log("generating key pair");
    // Generate a random wallet
    const wallet = ethers.Wallet.createRandom();
    console.log(wallet)
    const privateKey = wallet.privateKey;
    console.log("privateKey", privateKey)
    // const encryptedKey = CryptoJS.AES.encrypt(privateKey, password).toString()
    localStorage.setItem("privateKey", privateKey);
    // Encrypt private key with user's password
    // const encryptedJson = wallet;
    // const encryptedJson = await wallet.encrypt(password);
    // console.log(encryptedJson)

    // // Store the encrypted private key in local storage
    // localStorage.setItem('encryptedPrivateKey', encryptedJson);
    // console.log("encryptedPrivateKey", localStorage.getItem('encryptedPrivateKey'))
    // Get the public key and address
    

    // Set the public key and address to state
    // setPublicKey(publicKey);
    return wallet.address;

  };
    const handleSignUp = async (e) => {
        e.preventDefault();
        var address = "";
        try {
            if (privateKey === null) {
                address = await generateKeyPair();
            }else{
                console.log("importing wallet")
                console.log("pk", privateKey);
                
                const wallet = new ethers.Wallet(privateKey);
                address = wallet.address;
                // Get the address from the wallet instance
                console.log("address", address);
                localStorage.setItem("privateKey", privateKey);
            }
            console.log("registering address", address);
            await register(email, password, username, address); // TODO: generate wallet address

            alert('Registration successful!');
            setActiveRequestOption('login');
        } catch (error) {
            alert('Error registering user');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios.post(`${API_URL}/login`, { email, password });
            console.log(response.status)
            localStorage.setItem('token', response.data.access_token);
            // alert('Login successful!');
            router.push('/dashboard');
        } catch (error) {
            alert('Error logging in');
            console.log(error);
        }
    };

    return (
        <>
        <div className="modal-overlay">
            <div className="signup">
                <div className="option-switch">
                    <button className={`option-btn ${activeRequestOption === 'signup' ? 'active' : ''}`} onClick={() => setActiveRequestOption('signup')}>SignUp</button>
                    <button className={`option-btn ${activeRequestOption === 'login' ? 'active' : ''}`} onClick={() => setActiveRequestOption('login')}>Login</button>
                </div>
                {activeRequestOption === 'login' ? (
                    <form onSubmit={handleLogin}>
                        <p className="form-text" style={{ margin: "20px auto" }}>Login</p>

                        <div className="form__group field">
                            <input type="email" className="form__field" placeholder="abc@gmail.com" required onChange={(e) => setEmail(e.target.value)} style={{ color: 'black' }}/>
                            <label htmlFor="email" className="form__label">Email</label>
                        </div>

                        <div className="form__group field">
                            <input type="password" className="form__field" placeholder="****" required onChange={(e) => setPassword(e.target.value)} style={{ color: 'black' }}/>
                            <label htmlFor="password" className="form__label">Password</label>
                        </div>

                        <button type="submit" className="transferbutton">Login</button>
                    </form>
                ) : (
                    <form onSubmit={handleSignUp}>
                        <p className="form-text" style={{ margin: "20px auto" }}>Signup</p>
                        <div className="form__group field">
                            <input type="username" className="form__field" placeholder="john smith" required onChange={(e) => setUsername(e.target.value)} style={{ color: 'black' }} />
                            <label htmlFor="username" className="form__label">Username</label>
                        </div>

                        <div className="form__group field">
                            <input type="email" className="form__field" placeholder="abc@gmail.com" required onChange={(e) => setEmail(e.target.value)} style={{ color: 'black' }}/>
                            <label htmlFor="email" className="form__label">Email</label>
                        </div>

                        <div className="form__group field">
                            <input type="password" className="form__field" placeholder="****" required onChange={(e) => setPassword(e.target.value)} style={{ color: 'black' }} />
                            <label htmlFor="password" className="form__label">Password</label>
                        </div>
                        <div className="form__group field">
                            <input type="text" className="form__field" placeholder="****" onChange={(e) => setPrivateKey(e.target.value)} style={{ color: 'black' }} />
                            <label htmlFor="privateKey" className="form__label">Private Key (optional) </label>
                        </div>

                        <button type="submit" className="transferButton">Signup</button>
                    </form>
                )}
            </div>
        </div>
    </>
);
}

