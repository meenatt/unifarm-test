import { ethers } from "ethers";
import { useState } from "react";
import { CONTRACT_ADDRESS, ABI, PRECISION } from "./config";

function App() {
  const ethereum = window.ethereum;
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [number, setNumber] = useState(0);

  const connectWallet = async () => {
    if (typeof ethereum !== "undefined") {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      setConnectedAccount(account);
    } else {
      alert("Please install metamask");
    }
  };

  const truncateString = (text, front, end) => {
    let size = front + end;

    if (text.length > size) {
      const finalString = `${text.substring(0, front)}...${text.substring(
        text.length - end
      )}`;
      return finalString;
    }

    return text;
  };

  const addNum = async (event) => {
    event.preventDefault();
    if (number !== 0) {
      if (ethereum.isConnected() && connectedAccount !== null) {
        try {
          const chainId = await ethereum.request({ method: "eth_chainId" });
          if (chainId !== "0x13881") {
            alert("Please connect to Polygon Mumbai Testnet");
            return;
          }

          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const uniFarmTestContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            ABI,
            provider
          );
          const tx = await uniFarmTestContract
            .connect(provider.getSigner())
            .addNum(number * PRECISION);
          await tx.wait();
          alert("Transaction successfull");
        } catch (error) {
          alert(error);
        }
      } else {
        alert("Connect your wallet");
      }
    } else {
      alert("Enter a number");
    }
  };

  return (
    <div className="flex flex-col space-y-2 items-center justify-center h-screen bg-slate-50">
      <button
        onClick={connectWallet}
        className={`${
          connectedAccount === null ? "bg-black" : "bg-[#22c55e]"
        } text-white p-3 rounded-xl`}
      >
        {connectedAccount === null
          ? "Connect wallet"
          : truncateString(connectedAccount.toString(), 6, 3)}
      </button>
      <div className="w-1/2 bg-slate-200 p-4 mx-6 text-black rounded-2xl shadow-lg">
        <div className="flex flex-col space-y-4">
          <h1 className="text-md">Enter a number</h1>
          <form className="flex flex-col space-y-4">
            <input
              type="number"
              className="flex-1 p-3 border-2 rounded-lg placeholder-grey focus:outline-none"
              placeholder="Enter a number"
              required
              onChange={(event) => {
                setNumber(event.target.value);
              }}
            />
            <button
              type="submit"
              onClick={addNum}
              className="px-5 py-3 bg-black text-white rounded-lg hover:opacity-70 md:py-2"
            >
              Add Num
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
