//检索事件的方法:
//const transferEvents = await contract.queryFilter("事件名", [起始区块高度, 结束区块高度])
//其中起始区块高度和结束区块高度为选填参数

const ethers = require("ethers");

const ALCHEMY_SEPOLIA_URL = 'https://eth-sepolia.g.alchemy.com/v2/9wE1yRYtd9af7fc8KLTt-k_SuFJStzsS';
const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

const abiCamt = [
    "event Transfer(address indexed from, address indexed to, uint256 value)"
];

const addressCamt = `0xE0aD822FC788048bda7471a3Fe756A539e2D4194`

const contract = new ethers.Contract(addressCamt, abiCamt, provider)

const main = async () => {

    const block = await provider.getBlockNumber()
    console.log(`the current block height: ${block}`)
    console.log(`event details:`)
    const transferEvents = await contract.queryFilter(`Transfer`, 8039440, 8039450)
    console.log(transferEvents[0])

    console.log("\n2. parse the event:")
    const amount = ethers.formatUnits(ethers.getBigInt(transferEvents[0].args["value"]), "ether")
    console.log(`Address ${transferEvents[0].args["from"]} transferred ${amount} Camt to address ${transferEvents[0].args["to"]}`)
}

main()
