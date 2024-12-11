 import React, { useState } from 'react';
import { BrowserProvider, formatEther } from 'ethers';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);

        // Request accounts
        const accounts = await provider.send('eth_requestAccounts', []);
        const address = accounts[0];
        setWalletAddress(address);

        // Get balance
        const rawBalance = await provider.getBalance(address);
        const ethBalance = formatEther(rawBalance);
        setBalance(ethBalance);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask and try again.');
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={connectWallet} style={styles.button}>
        {walletAddress
          ? `Address: ${walletAddress}\nBalance: ${balance}  `
          : 'Connect Wallet'}
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    outline: 'none',
    whiteSpace: 'pre-wrap', // Allows showing address and balance on multiple lines
  },
};

export default App;
