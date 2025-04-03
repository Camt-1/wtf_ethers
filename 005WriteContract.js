//声明只可写合约的规则:
//const contract = new ether.Contract(address, abi, signer);
//参数分别为合约地址`address`, 合约ABI`abi`, Signer变量`signer`

const ethers = require("ethers");

const ALCHEMY_SEPOLIA_URL = 'https://eth-sepolia.g.alchemy.com/v2/9wE1yRYtd9af7fc8KLTt-k_SuFJStzsS';
const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

const privatekey = `fcbe63d30fadcbdc958152cb2afc99e3e29a647bb4edf20bcb2cebf045ec4d90`
const wallet = new ethers.Wallet(privatekey, provider)

//WETH合约的ABI
const abiWETH = [
    "function balanceOf(address) public view returns(uint)",
    "function deposit() public payable",
    "function transfer(address, uint) public retruns (bool)",
    "function withdraw(uint) public",
];
//WETH合约地址
const addressWETH = `0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9`
//声明可写合约
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet)

const main = async () => {

    const address = await wallet.getAddress()
    console.log("\n1. get WETH balance")
    const balanceWETH = await contractWETH.balanceOf(address)
    console.log(`WETH balance before deposit: ${ethers.formatEther(balanceWETH)}\n`)
    const balanceETH = await provider.getBalance(wallet)

    if (ethers.formatEther(balanceETH) > 0.0015) {

        console.log("\n2. call the deposit() and deposit 0.001ETH")
        const tx = await contractWETH.deposit({value: ethers.parseEther("0.001")})
        await tx.wait()
        console.log(`tx info:`)
        console.log(tx)
        const balanceWETH_deposit = await contractWETH.balanceOf(address)
        console.log(`WETH balance after deposit: ${ethers.formatEther(balanceWETH_deposit)}\n`)

        console.log("\n3. call the transfer() and transfer 0.001WETH to vitalik")
        const tx2 = await contractWETH.transfer("vitalik.eth", ethers.parseEther("0.001"))
        await tx2.wait()
        const balanceWETH_transfer = await contractWETH.balanceWETH.balanceOf(address)
        console.log(`WETH balance after transfer: ${ethers.formatEther(balanceWETH(balanceWETH_transfer))}\n`)

    } else {
        console.log("insufficient balance")
    }
}

main()
