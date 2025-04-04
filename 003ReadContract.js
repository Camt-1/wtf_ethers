//声明只读合约的规则:
//参数分别为合约地址`address`, 合约ABI`abi`, Provider变量`provider`
//const contract = new ethers.Contract(`address`, `abi`, `provider`);

//contrac类是部署在以太坊网络上的合约(EVM字节码)的抽象,
//通过它可以对合约读取`call`和交易`transaction`,并可以获得交易的结果和事件

const ethers = require("ethers");

const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/9wE1yRYtd9af7fc8KLTt-k_SuFJStzsS';
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);
//第1种输入abi的方式:复制abi全文
const abiWETH = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]';
const addressWETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'; // WETH Contract
const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider);
//第2种输入abi方式:输入程序需要用到的函数,逗号分隔,ethers会自动转换成相应的abi
const abiERC20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
];
const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; //DAI Contract
const contractDAI = new ethers.Contract(addressDAI, abiERC20, provider);

const main = async () => {
    //1. 读取WETH合约链上信息(WETH abi)
    const nameWETH = await contractWETH.name();
    const symbolWETH = await contractWETH.symbol();
    const totalSupplyWETH = await contractWETH.totalSupply();
    console.log("\n1. 读取WETH合约信息");
    console.log(`合约地址: ${addressWETH}`);
    console.log(`名称: ${nameWETH}`);
    console.log(`代号: ${symbolWETH}`);
    console.log(`总供给: ${ethers.formatEther(totalSupplyWETH)}`);
    const balanceWETH = await contractWETH.balanceOf('vitalik.eth');
    console.log(`Vitalik持仓: ${ethers.formatEther(balanceWETH)}\n`);

    //2. 读取DAI合约的链上信息(IERC20接口合约)
    const nameDAI = await contractDAI.name();
    const symbolDAI = await contractDAI.symbol();
    const totalSupplyDAI = await contractDAI.totalSupply();
    console.log("\n2. 读取DAI合约信息");
    console.log(`合约地址: ${addressDAI}`);
    console.log(`名称: ${nameDAI}`);
    console.log(`代号: ${symbolDAI}`);
    console.log(`总供给: ${ethers.formatEther(totalSupplyDAI)}`);
    const balanceDAI = await contractDAI.balanceOf(`vitalik.eth`);
    console.log(`Vitalik持仓: ${ethers.formatEther(balanceDAI)}\n`);
}

main()
