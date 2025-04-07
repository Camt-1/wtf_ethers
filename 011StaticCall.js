//staticCall方法,在发送交易之前检查交易是否会失败,节省大量gas
//staticCall方法是属于ethers.Contract类的编写方法分析,
//同类的还有populateTransaction和estimateGas方法

//以太坊节点上有一个eth_call方法,让用户可以模拟一笔交易,并返回可能的交易结果,但交易不上链
//contract.函数名.staticCall()方法可以模拟执行一个可能会改变状态和函数,
//但不实际向区块链提交这个状态改变,这相当于以太节点的eth_call.用于模拟状态改变函数的结果
//如果函数调用成功,将返回函数本身的返回值;如果函数调用失败,它将抛出异常
//这种调用适用于任何函数,无论是否标记为view/pure还是普通的状态改变函数
const ethers = require("ethers");

const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/9wE1yRYtd9af7fc8KLTt-k_SuFJStzsS';
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

const privatekey = `fcbe63d30fadcbdc958152cb2afc99e3e29a647bb4edf20bcb2cebf045ec4d90`
const wallet = new ethers.Wallet(privatekey, provider)

//DAI的ABI
const abiDAI = [
    "function balanceOf(address) public view returns (uint)",
    "function transfer(address, uint) public returns (bool)",
];
//DAI合约地址
const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'

//创建DAI合约实例
const contractDAI = new ethers.Contract(addressDAI, abiDAI, provider)

const main = async () => {
    try {
        const address = await wallet.getAddress()
        //1. 读取DAI合约的链上信息
        console.log("\n1. 读取测试钱包的DAI余额")
        const balanceDAI = await contractDAI.balanceOf(address)
        const balanceDAIVitalik = await contractDAI.balanceOf("vitalik.eth")

        console.log(`测试钱包 DAI持仓: ${ethers.formatEther(balanceDAI)}\n`)
        console.log(`vitalik DAI持仓: ${ethers.formatEther(balanceDAIVitalik)}\n`)

        //2. 用staticCall尝试调用transfer转账1DAI,msg.sender为Vitalik,交易将成功
        console.log("\n2. 用staticCall尝试调用transfer转账1 DAI, msg.sender为Vitalik地址")
        //发起交易
        const tx = await contractDAI.transfer.staticCall("vitalik.eth", ethers.parseEther("10000"), {from: address})
        console.log(`交易会成功吗?:`, tx)

        //3. 用staticCall尝试调用transfer转账1000DAI,msg.sender为测试钱包地址,交易将失败
        console.log("\n3. 用staticCall尝试调用transfer转账1 DAI, msg.sender为测试钱包地址")
        const tx2 = await contractDAI.transfer.staticCall("vitalik.eth", ethers.parseEther("10000"), {from: address})
        console.log(`交易会成功吗?:`, tx2)
    } catch (e) {
        console.log(e);
    }
}

main ()