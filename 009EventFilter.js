//过滤器
//当合约创建日志是,它最多可以包含[4]条数据作为索引(indexed).
//索引数据经过哈希处理并包含在布隆过滤器中,这是一种运行有效过滤的数据结构.
//因此,一个事件过滤器最多包含4个主题集,每个主题是个条件,用于筛选目标事件.
//规则:
//- 如果一个主题集为null,则该位置的日志主体不会被过滤,任何值都匹配
//- 如果主题集是单个值,则该位置的日志主题必须与该值匹配
//- 如果主题集是数组,则该位置的日志主题至少与数组中其中一个匹配

//构建过滤器
//const filter = contract.filters.EVENT_NAME( ...args )
//`EVENT_NAME`为要过滤的事件名,`..args`为主题集/条件

const ethers = require("ethers");

const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/9wE1yRYtd9af7fc8KLTt-k_SuFJStzsS';
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

const addressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
const accountBinance = '0x28C6c06298d514Db089934071355E5743bf21d60'
const abi = [
    "event Transfer(address indexed from, address indexed to, uint value)",
    "function balanceOf(address) public view returns(uint)",
];
const contractUSDT = new ethers.Contract(addressUSDT, abi, provider);

(async () => {
    try {
        console.log("\n1. read USDT balance of Binance hot wallet")
        const balanceUSDT = await contractUSDT.balanceOf(accountBinance)
        console.log(`USDT balance: ${ethers.formatUnits(balanceUSDT,6)}\n`)

        console.log("\n2. create a filter for USDT transfers into the exchange")
        let filterBinanceIn = contractUSDT.filters.Transfer(null, accountBinance);
        console.log("Filter details:")
        console.log(filterBinanceIn)
        contractUSDT.on(filterBinanceIn, (res) => {
            console.log(`---------Listening for USDT transfers into the exchange--------`)
            console.log(
                `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2],6)}`
            )
        })

        let filterToBinanceOut = contractUSDT.filters.Transfer(accountBinance);
        console.log("\n3. create a filter to listen for USDT transfers out of the exchange")
        console.log("filter details:")
        console.log(filterToBinanceOut);
        contractUSDT.on(filterToBinanceOut, (res) => {
            console.log('---------Listening for USDT transfers out of the exchange--------')
            console.log(
                `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2],6)}`
            ) 
        })
    } catch (e) {
        console.log(e);
    }
}) ()