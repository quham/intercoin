import React from 'react';
import './style.css';
import { useState, useEffect } from 'react';
import { getReserves, getReserveProofs , getReserveTime, addNotary} from '../reservesService';
import { useCurrency } from '../CurrencyContext';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';


const dataa = [
  { asset: 'USD', actual: 700, required: 700, ratio: 120 },
  { asset: 'BTC', actual: 700, required: 700, ratio: 56 },
  { asset: 'GOLD', actual: 700, required: 700, ratio: 30 },
];

export default function AssetReserves() {
  const { currencyText, convertCurrency } = useCurrency();
  const [data, setData] = useState([]);
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [reserveTime, setReserveTime] = useState('');
  const [enterNotary, setEnterNotary] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setData(await getReserves());
      setReserveTime(await getReserveTime());
    };

    // Initial fetch and then every 5 minutes
    fetchData();
    const intervalId = setInterval(fetchData, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  const downloadZipFile = async () => {
    const reserveProofs = await getReserveProofs();
    const zip = new JSZip();

    // Adding each proof and sent string to the zip file with the provided name
    reserveProofs.forEach(proofObj => {
      const { name, proof, request, response } = proofObj;
      zip.file(`${name}_proof.json`, proof);
      zip.file(`${name}_request.txt`, request);
      zip.file(`${name}_response.txt`, response);
    });

    zip.generateAsync({ type: 'blob' })
      .then((content) => {
        saveAs(content, 'proofs.zip');
      })
      .catch((err) => {
        console.error('Error generating zip file', err);
      });
  };
  // const submitNotary = async () => {

  return (
    <>
      <div className="asset-reserves-container">
        <div className="header">
          <h2>Total Asset Reserves</h2>
          <span>Total Supply: 10000 Africoins</span>
        </div>
        <div className="table">
          <div className="table-header">
            <div className="table-cell">Asset</div>
            <div className="table-cell">Actual Reserves</div>
            <div className="table-cell">Required Reserves</div>
            <div className="table-cell">Reserve Ratio</div>
          </div>
          {data.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="table-cell">{item.asset}</div>
              <div className="table-cell">
                {currencyText()}{convertCurrency(item.actual)}
              </div>
              <div className="table-cell">
                {currencyText()}{convertCurrency(item.required)}
              </div>
              <div className="table-cell">
                <div className="ratio-bar">
                  <div
                    className="ratio-fill"
                    style={{
                      width: `${Math.min(item.ratio * 100, 100)}%`,
                      backgroundColor: item.ratio * 100 < 100 ? 'red' : 'green',
                    }}
                  ></div>
                  <span>{(item.ratio * 100).toFixed(2)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="footer">
          <span>Proof Last Updated: {reserveTime}</span>
          <button onClick={() => setEnterNotary(true)}>Become a Notary!</button>
          <button onClick={downloadZipFile}>Download Proof Of Reserves</button>
        </div>
      </div>
      {enterNotary && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={() => setEnterNotary(false)}>
              &times;
            </span>
            <h2>Become a Notary!</h2>
            <p>Enter your details to become a notary and attest to the reserves yourself</p>
            <div className="modal-content">
              <form>
                <label>Host</label>
                <input
                  type="text"
                  placeholder="Type Here"
                  className="bg"
                  onChange={(e) => setHost(e.target.value)}
                />
                <label>Port</label>
                <input
                  type="text"
                  placeholder="Type Here"
                  className="bg"
                  onChange={(e) => setPort(e.target.value)}
                />
                <button type="submit" onClick={() => addNotary(host, port)}>Submit Notary details</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}