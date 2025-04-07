const ethers = require("ethers");

const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/9wE1yRYtd9af7fc8KLTt-k_SuFJStzsS';
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

const abiERC721 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function supportsInterface(bytes4) public view return (bool)",
];

const addressBAYC = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"

const contractERC721 = new ethers.Contract(addressBAYC, abiERC721, provider)

const selectorERC721 = "0x80ac58cd"

const main = async () => {
    try {
        const nameERC721 = await contractERC721.name()
        const symbolERC721 = await contractERC721.symbol()
        console.log("\n1. 读取ERC721合约信息")
        console.log(`合约地址: ${addressBAYC}`)
        console.log(`名称: ${nameERC721}`)
        console.log(`代号: ${symbolERC721}`)

        const isERC721 = await contractERC721.supportsInterface(selectorERC721)
        console.log("\n2. 利用ERC165的supportInterface,确定合约是否为ERC721标准")
        console.log(`合约是否为ERC721标准: ${isERC721}`)
    } catch (e) {
        console.log(e);
    }
}

main()