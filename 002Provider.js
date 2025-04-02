//Provider
//Provider类是对以太坊网络连接的抽象，为标准以太坊节点功能提供简洁、
//一致的接口。在ethers中，Provider不接触用户私钥，只能读取链上信息，
//不能写入，这一点比web3.js要安全。
const ethers = require("ethers");

const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/9wE1yRYtd9af7fc8KLTt-k_SuFJStzsS';
const ALCHEMY_SEPOLIA_URL = 'https://eth-sepolia.g.alchemy.com/v2/9wE1yRYtd9af7fc8KLTt-k_SuFJStzsS';

const providerETH = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL)
const providerSepolia = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL)

const main = async () => {

    console.log("1. 查询vitalik在主网和Sepolia测试网的ETH余额");
    const balance = await providerETH.getBalance(`vitalik.eth`);
    const balanceSepolia = await providerSepolia.getBalance(`0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`);

    console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETh`);
    console.log(`Sepolia ETH Balance of vitalik: ${ethers.formatEther(balanceSepolia)} ETH`);

    console.log("\n2. 查询provider连接到了哪条链")
    const network = await providerETH.getNetwork();
    console.log(network.toJSON());

    console.log("\n3. 查询区块高度")
    const blockNumber = await providerETH.getBlockNumber();
    console.log(blockNumber);

    console.log("\n4. 查询vitalik钱包历史交易次数")
    const txCount = await providerETH.getTransactionCount("vitalik.eth");
    console.log(txCount);

    console.log("\n5. 查询当前建议的gas设置")
    const feeData = await providerETH.getFeeData();
    console.log(feeData);

    console.log("\n6. 查询区块信息")
    const block = await providerETH.getBlock(0);
    console.log(block);

    console.log("\n7. 给定合约地址查询合于bytecode, 例子用的WETH地址")
    const code = await providerETH.getCode("0xc778417e063141139fce010982780140aa0cd5ab");
    console.log(code);

}

main()