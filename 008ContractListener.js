//监听合约事件,参数分别为监听事件名称`eventName`和事件发生的调用的函数`function`
//contract.on("eventName", function) 持续监听合约的事件
//contract.once("eventName", function) 只监听一次合约释放事件

const ethers = require("ethers");

const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/9wE1yRYtd9af7fc8KLTt-k_SuFJStzsS';
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

const contractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'
const abi = [
    "event Transfer(address indexed from, address indexed to, uint value)"
];
const contractUSDT = new ethers.Contract(contractAddress, abi, provider);

const main = async () => {

    try{
        console.log("\n1. using contract.once() to listen to s single transfer evetn");
        contractUSDT.once("Transfer", (from, to, value) => {
            console.log(
                `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`
            )
        })

        console.log("\n2. using contract.on() to continuously listen to transfer events");
        contractUSDT.on("Transfer", (from, to, value) => {
            console.log(
                 `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`
            )
        })

    } catch(e) {
        console.error("Error occurred:", e);

        // Attempt to re-create the filter if it was removed or expired
        if (e.code === -32000 && e.message === 'filter not found') {
            console.log("Attempting to re-create the filter...");
            contractUSDT.removeAllListeners("Transfer");
            contractUSDT.on("Transfer", handleTransferEvent);
        }
    }
}

main()