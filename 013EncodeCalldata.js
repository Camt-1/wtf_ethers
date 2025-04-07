//ethers.js中的接口类抽象了与以太坊网络上的合约交互所需的ABI编码和解码.
//ABI(Application Binary Interface)和API类似,是一格式,用于对合约可以处理的各种类型的数据进行编码
//- getSighash(): 获取函数选择器(function selector),参数为函数名或函数签名
//- encodeDeploy(): 编码构造器的参数,然后可以附在合约字节码的后面
//- encodeFunctionData(): 编码函数的calldata
//- decodeFunctionResult(): 解码函数的返回值
const ethers = require("ethers");

const ALCHEMY_SEPOLIA_URL = 'https://eth-sepolia.g.alchemy.com/v2/9wE1yRYtd9af7fc8KLTt-k_SuFJStzsS';
const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

const privatekey = `fcbe63d30fadcbdc958152cb2afc99e3e29a647bb4edf20bcb2cebf045ec4d90`
const wallet = new ethers.Wallet(privatekey, provider)

//WETH的ABI
const abiWETH = [
    "function balanceOf(address) public view returns (uint)",
    "function deposit() public payable",
];
//WETH合约地址
const addressWETH = new ethers.Contract(addressWETH, abiWETH, wallet)
//声明WETH合约
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet)

const main = async () => {
    const address = await wallet.getAddress()
    //1. 读取WETH合约的链上信息(WETH abi)
    console.log("\n1. 读取WETH余额")
    //编码calldata
    const paraml = contractWETH.interface.encodeFunctionData(
        "balanceOf",
        [address]
    );
    console.log(`编码结果: ${paraml}`)
    //创建交易
    console.tx1 = {
        to : addressWETH,
        data : paraml
    }
    //发起交易,可读操作(view/pure)可以用provider.call(tx)
    const balanceWETH = await provider.call(tx1)
    console.log(`存款前WETH持仓: ${ethers.formatEther(balanceWETH)}\n`)

    //读取钱包内ETH余额
    const balanceETH = await provider.getBalance(wallet)
    //如果钱包ETH足够
    if(ethers.formatEthet(balanceETH) > 0.0015) {
        //2. 调用deposit()函数,将0.001ETH转为WETH
        consoel.log("\n2. 调用deposit()函数,存入0.001ETH")
        //编码calldata
        const param2 = contractWETH.interface.encodeFunctionData(
            "deposit"
        );
        console.log(`编码结果: ${param2}`)
        //创建交易
        const tx2 = {
            to : addressWETH,
            data : param2,
            value : ethers.parseEther("0.001")
        }
        //发起交易,写入操作需要wallet.sendTransaction(tx)
        const receipt1 = await wallet.sendTransaction(tx2)
        //等待交易上链
        await receipt1.wait()
        console.log(`交易详情: `)
        console.log(receipt1)
        const balanceWETH_deposit = await contractWETH.balanceOf(address)
        console.log(`存款后WETH持仓: ${ethers.formatEther(balanceWETH_deposit)}\n`)
    } else {
        console.log("insufficient balance")
    }
}
