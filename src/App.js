import "./App.css";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { useState } from "react";

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web 3 Modal Demo",
      infuraId: process.env.INFURA_KEY,
    },
  },
};

function App() {
  const [Web3Provider, setWeb3Provider] = useState(null);

  const refreshState = () => {
    setWeb3Provider();
  };

  const disconnect = async () => {
    await Web3Modal.clearCachedProvider();
    refreshState();
  };

  async function connectWallet() {
    try {
      let web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });
      const web3ModalInstance = await web3Modal.connect();
      const web3modalProvider = new ethers.providers.Web3Provider(
        web3ModalInstance
      );
      if (web3modalProvider) {
        setWeb3Provider(web3modalProvider);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Web3Modal Connection!</h1>
        {Web3Provider == null ? (
          //run if null
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          //run if there
          <div>
            <p>Connected!</p>
            <p>Address: {Web3Provider.provider.selectedAddress}</p>
            <button onClick={disconnect}>Disconnect</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
