import React, { useState } from "react";
import { ethers } from "ethers";

const MetaMask = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: `eth_requestAccounts` })
        .then((result) => {
          accountChanged([result[0]]);
        });
    } else {
      setErrorMessage("Install MetaMask Please!!");
    }
  };

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    getUSerBalance(accountName);
  };

  const getUSerBalance = (accountAddress) => {
    window.ethereum
      .request({
        method: `eth_getBalance`,
        params: [String(accountAddress), "latest"],
      })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };

  async function sendTransaction(e) {
    let params = [
      {
        from: "0x3fFdd95041EE642F083bC215e7d876569C433591",
        to: e.target.to_address.value,
        gas: Number(21000).toString(16),
        gasPrice: Number(2500000).toString(16),
        value: Number(100000000).toString(16),
        // 100000000000000000
      },
    ];
    let result = await window.ethereum
      .request({
        method: "eth_sendTransaction",
        params,
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="bg-gradient-to-b from-blue-500 via-blue-300 to-white w-full h-screen flex flex-col justify-center items-center backdrop-blur-md rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-4">MetaMask Wallet Connection</h1>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full mb-4"
        onClick={connectWallet}
      >
        Connect Wallet Button
      </button>
      <h3 className="text-xl mb-2">Address: {defaultAccount}</h3>
      <h3 className="text-xl mb-6">Balance: ${userBalance}</h3>

      <form className="w-full max-w-sm" onSubmit={sendTransaction}>
        <h3 className="text-xl mb-2">Enter Transaction Address</h3>
        <input
          type="text"
          name="to_address"
          placeholder="Recipient's address"
          className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full w-full"
        >
          Submit
        </button>
      </form>
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default MetaMask;
