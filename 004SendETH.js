//Signer签名者类是以太坊账户的抽象,可用于对消息和交易进行签名,
//并将签名的交易发送到以太坊网络,并更改区块链状态.
//Signer是抽象类,不能直接实例化,要使用它的子类:Wallet钱包类

//Wallet类继承了Signer类,并且可以像包含私钥的外部拥有账户(EOA)一样,
//用它对交易和消息签名

const ethers = require("ethers");

const ALCHEMY_SEPOLIA_URL = 'https://eth-sepolia.g.alchemy.com/v2/9wE1yRYtd9af7fc8KLTt-k_SuFJStzsS';
const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

//创建随机的wallet对象
const wallet1 = ethers.Wallet.createRandom()
const wallet1WithProvider = wallet1.connect(provider)
const mnemonic = wallet1.mnemonic //获取助记词

//利用私钥和provider创建wallet对象
const privatekey = `fcbe63d30fadcbdc958152cb2afc99e3e29a647bb4edf20bcb2cebf045ec4d90`
const wallet2 = new ethers.Wallet(privatekey, provider)

//从助记词创建wallet对象
const wallet3 = ethers.Wallet.fromPhrase(mnemonic.phrase)

const main = async() => {
    const address1 = await wallet1.getAddress()
    const address2 = await wallet2.getAddress()
    const address3 = await wallet3.getAddress()

    console.log(`1. Get wallet address`)
    console.log(`wallet1 address: ${address1}`)
    console.log(`wallet2 address: ${address2}`)
    console.log(`wallet3 address: ${address3}`)
    console.log(`are the addresses of wallet1 and wallet3 the same: ${address1 === address3}`);

    console.log(`\n2. Get mnemonic`)
    console.log(`wallet1 mnemonic: ${wallet1.mnemonic.phrase}`)
    // wallet2 has no mnemonic
    // console.log(wallet2.mnemonic.phrase)

    console.log(`\n3. Get privatekey`)
    console.log(`wallet1 privatekey: ${wallet1.privateKey}`)
    console.log(`wallet2 privatekey: ${wallet2.privateKey}`)

    console.log(`\n4. Get tx count`)
    const txCount1 = await provider.getTransactionCount(wallet1WithProvider)
    const txCount2 = await provider.getTransactionCount(wallet2)
    console.log(`wallet1 tx count: ${txCount1}`)
    console.log(`wallet2 tx count: ${txCount2}`)

    console.log(`\n5 Send ETH`)
    console.log(`\ni. balance before sending`)
    console.log(`wallet1: ${ethers.formatEther(await provider.getBalance(wallet1WithProvider))} ETH`)
    console.log(`wallet2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`)
    const tx = {
        to : address1,
        value: ethers.parseEther("0.0001")
    }
    console.log(`\nii. wait for the transaction to be confirmed on the blockchain`)
    const receipt = await wallet2.sendTransaction(tx)
    await receipt.wait()
    console.log(receipt)
    console.log(`\niii. balance after sending`)
    console.log(`wallet1: ${ethers.formatEther(await provider.getBalance(wallet1WithProvider))} ETH`)
    console.log(`wallet2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`)

}

main().catch((error) => {
    console.error(`transaction failure:`, error);
});
