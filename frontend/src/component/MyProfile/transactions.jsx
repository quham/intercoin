'use client';
import { useState, useEffect, useRef, use } from 'react';
import './style.css'; // Import the CSS file for styling
import { FiCopy } from 'react-icons/fi'; // Import the copy icon
import QRCode from 'react-qr-code';
import { addActivity, getMaxDeposit } from './submitTransactions';
import { getUserDetails } from '../userInfoService';
import { useCurrency } from '../CurrencyContext';
import { get } from 'http';
import { parse } from 'path';


export default function MoneyBtns() {
    const { fetchBalance, currencyText, convertToAfri, convertCurrency} = useCurrency();
    const [amount, setAmount] = useState('');
    // receiver details
    const [emailAddress, setEmailAddress] = useState(''); 
    const [mobile, setMobile] = useState('');
    const [walletAddress, setWalletAddress] = useState('');

    const [activeModal, setActiveModal] = useState(null);
    const [activeRequestOption, setActiveRequestOption] = useState('link');
    const [isRecurring, setIsRecurring] = useState(false);

    const [showPopup, setShowPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const [popupType, setPopupType] = useState('');
    const [maxDeposit, setMaxDeposit] = useState(0);

    const [selectedOption, setSelectedOption] = useState('email');

    const [userWallet, setUserWallet] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');

    const btnsText = [
        { id: 0, text: 'Deposit' },
        { id: 1, text: 'Withdraw' },
        { id: 2, text: 'Transfer' },
        { id: 3, text: 'Request Money' },
    ];

    const openModal = (id) => {
        setActiveModal(id);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const action = params.get('action');
        const amount = convertCurrency(parseFloat(params.get('amount')));
        const currency = params.get('currency');
        const email = params.get('email');

        if (action === 'transfer' && email) {
            setActiveModal(2); // Open Transfer modal
            setAmount(amount);
            setSelectedOption("email");
            setEmailAddress(email);
        }
        
    }, [showSuccessPopup]);

    useEffect(() => {
        getMaxDeposit().then((max) => setMaxDeposit(max));
    }, []);

    useEffect(() => {
        const fetchDetails = async () => {
            const {wallet, email, phone} = await getUserDetails();
            setUserWallet(wallet);
            setUserEmail(email);
            setUserPhone(phone);
        };
        fetchDetails();
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Link copied to clipboard');
        });
    };

    const handleTransferSubmit = (e) => {
        e.preventDefault();
        setPopupType('transfer');
        setShowPopup(true);
    };

    const handleDepositSubmit = () => {
        setPopupType('deposit');
        setShowPopup(true);
    };

    const handleWithdrawSubmit = () => {
        setPopupType('withdraw');
        setShowPopup(true);
    };

    const handleConfirm = async () => {
        const afriAmount = convertToAfri(parseFloat(amount));
        setShowPopup(false);
        let success = false;
        if (popupType === 'transfer') {
            success = await addActivity("transfer", afriAmount, walletAddress, emailAddress, mobile);
        } else if (popupType === 'deposit') {
            success = await addActivity("deposit", afriAmount, "", "", "");
        } else if (popupType === 'withdraw') {
            success = await addActivity("withdraw", afriAmount, "", "", "");
        }

        if (success) {
            setShowSuccessPopup(true);
            setTimeout(() => {
                setShowSuccessPopup(false);
                setActiveModal(null);
            }, 1000); // Hide the success popup after 1 second
            fetchBalance();
        }
    };

    const generateLink = () => {
        const params = new URLSearchParams({
            action: 'transfer',
            amount: convertToAfri(parseFloat(amount)),
            option: selectedOption,
            email: userEmail,
        });
        const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
        copyToClipboard(url);
        return url;
    };

    const renderFormContent = () => {
        switch (activeModal) {
            case 0:
                return (
                    <form>
                        <label>Deposit Amount (Max Deposit: {currencyText()}{convertCurrency(maxDeposit)}) </label>
                        <input 
                            type="text" 
                            placeholder="Type Amount" 
                            className="bg" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                        <button type="button" onClick={handleDepositSubmit}>Deposit</button>
                    </form>
                );
            case 1:
                return (
                    <form>
                        <label>Withdraw Amount</label>
                        <input 
                            type="text" 
                            placeholder="Type Amount" 
                            className="bg" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                        <button type="button" onClick={handleWithdrawSubmit}>Withdraw</button>
                    </form>
                );
            case 2:
                return (
                    <form>
                        <label>Select Transfer Method</label>
                        <select
                            className="bg"
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                        >
                            <option selected disabled>
                                Select
                            </option>
                            <option value="email">Email</option>
                            <option value="phone">Phone no</option>
                            <option value="wallet">Wallet Address</option>
                        </select>

                        {selectedOption === 'email' && (
                            <>
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Abc@Gmail.Com"
                                    className="bg"
                                    value={emailAddress}
                                    onChange={(e) => setEmailAddress(e.target.value)}
                                />
                            </>
                        )}
                        {selectedOption === 'phone' && (
                            <>
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="012345678"
                                    className="bg"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                            </>
                        )}
                        {selectedOption === 'wallet' && (
                            <>
                                <label>Wallet Address</label>
                                <div className="wallet-address">
                                    <input 
                                        type="text" 
                                        placeholder="Type Amount" 
                                        className="bg" 
                                        value={walletAddress}
                                        onChange={(e) => setWalletAddress(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                        <label>Transfer Amount</label>
                        <input 
                            type="text" 
                            placeholder="Type Amount" 
                            className="bg" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                        <label>Recurring</label>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={isRecurring}
                                onChange={() => setIsRecurring(!isRecurring)}
                            />
                            <div className="slider"></div>
                            <div className="slider-card">
                                <div className="slider-card-face slider-card-front"></div>
                                <div className="slider-card-face slider-card-back"></div>
                            </div>
                        </label>
                        {isRecurring && (
                            <>
                                <label>Repeats Every</label>
                                <select className="bg">
                                    <option selected disabled>
                                        Select
                                    </option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                                <input type="date" className="bg" />
                            </>
                        )}
                        <button className="transferbutton" type="button" onClick={handleTransferSubmit}> 
                            Transfer
                        </button>
                    </form>
                );
                
            case 3:
                return (
                    <div>
                        <div className="option-switch">
                            <button
                                className={`option-btn ${activeRequestOption === 'qr' ? 'active' : ''}`}
                                onClick={() => setActiveRequestOption('qr')}
                            >
                                QR Code
                            </button>
                            <button
                                className={`option-btn ${activeRequestOption === 'link' ? 'active' : ''}`}
                                onClick={() => setActiveRequestOption('link')}
                            >
                                Link
                            </button>
                        </div>
                        {activeRequestOption === 'qr' ? (
                            <div>
                                <label>Enter Amount (Optional)</label>
                                <input type="text" placeholder="Amount Here" className="bg" />
                                <div className="qr-code">
                                    <div style={{ height: 'auto', margin: '20px auto', maxWidth: 200, width: '100%' }}>
                                        <QRCode
                                            size={256}
                                            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                                            value={generateLink()}
                                            viewBox={`0 0 256 256`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <form>
                                <label>Enter Amount (Optional)</label>
                                <input type="text" placeholder="Amount Here" className="bg" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                <button className="copylink" type="button" onClick={generateLink}>
                                    Copy Link
                                </button>
                                <p className="form-text">Or Receive Money Using</p>
                                <label>Email Address</label>
                                <div className="wallet-address">
                                    <input
                                        type="email"
                                        style={{ width: '100%' }}
                                        className="bg"
                                        value={userEmail}
                                        readOnly
                                    />
                                    <FiCopy className="copy-icon" onClick={() => copyToClipboard(userEmail)} />
                                </div>
                                <label>Phone Number</label>
                                <div className="wallet-address">
                                    <input
                                        type="text"
                                        style={{ width: '100%' }}
                                        className="bg"
                                        value={userPhone}
                                        readOnly
        
                                    />
                                    <FiCopy className="copy-icon" onClick={() => copyToClipboard(userPhone)} />
                                </div>
                                <label>Wallet Address</label>
                                <div className="wallet-address">
                                    <input
                                        type="text"
                                        style={{ width: '100%' }}
                                        className="bg"
                                        value={userWallet}
                                        readOnly
                                    />
                                    <FiCopy className="copy-icon" onClick={() => copyToClipboard(userWallet)} />
                                </div>
                                <button className="transferbutton" type="submit">
                                    Request
                                </button>
                            </form>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <>
            <div className="btn-div">
                {btnsText.map((value) => (
                    <div key={value.id} className="btns">
                        <button
                            id={`button${value.id}`}
                            onClick={() => openModal(value.id)}
                            className="bottone1"
                        >
                            <strong>{value.text}</strong>
                        </button>
                    </div>
                ))}
            </div>

            {activeModal !== null && (
                <div className="modal-overlay">
                    <div className="modal">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <h1 style={{ color: 'lightblue', fontWeight: 'bold' }}>{btnsText[activeModal].text}</h1>
                        <div className="modal-content">{renderFormContent()}</div>
                    </div>
                </div>
            )}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h2>Confirm {popupType.charAt(0).toUpperCase() + popupType.slice(1)}</h2>
                        <p>{popupType.charAt(0).toUpperCase() + popupType.slice(1)} of {currencyText()}{amount}</p>
                        <button className="confirm-button" onClick={handleConfirm}>
                            Confirm
                        </button>
                        <button className="cancel-button" onClick={() => setShowPopup(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {showSuccessPopup && (
                <div className="success-popup-overlay">
                    <div className="success-popup">
                        <div className="tick-mark">✔️</div>
                        <h2>{popupType.charAt(0).toUpperCase() + popupType.slice(1)} Successful</h2>
                        <p>Your {popupType} of {currencyText}{amount} was successful.</p>
                    </div>
                </div>
            )}
        </>
    );
}
