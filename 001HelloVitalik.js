const ethers = require("ethers");

const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/9wE1yRYtd9af7fc8KLTt-k_SuFJStzsS';
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

const main = async () => {
    const balance = await provider.getBalance(`vitalik.eth`);

    console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);
}

main()