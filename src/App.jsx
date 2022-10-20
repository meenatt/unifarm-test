import { useState } from "react";

function App() {
  const ethereum = window.ethereum;
  const [connectedAccount, setConnectedAccount] = useState(null);

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

  const addNum = async () => {};

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
          <input
            type="number"
            className="flex-1 p-3 border-2 rounded-lg placeholder-grey focus:outline-none"
            placeholder="Enter a number"
          />
          <button className="px-5 py-3 bg-black text-white rounded-lg hover:opacity-70 md:py-2">
            Add Num
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
