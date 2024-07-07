// src/App.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import DecentralizedLottery from './contracts/DecentralizedLottery.json';

function App() {
  const [account, setAccount] = useState('');
  const [lottery, setLottery] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      setWeb3(web3);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DecentralizedLottery.networks[networkId];
      const lottery = new web3.eth.Contract(DecentralizedLottery.abi, deployedNetwork && deployedNetwork.address);
      setLottery(lottery);
    };

    loadBlockchainData();
  }, []);

  const buyTicket = async () => {
    await lottery.methods.buyTicket().send({ from: account, value: web3.utils.toWei('0.1', 'ether') });
  };

  const drawWinner = async () => {
    await lottery.methods.drawWinner().send({ from: account });
  };

  return (
    <div>
      <h1>Decentralized Lottery</h1>
      <button onClick={buyTicket}>Buy Ticket</button>
      <button onClick={drawWinner}>Draw Winner</button>
    </div>
  );
}

export default App;
