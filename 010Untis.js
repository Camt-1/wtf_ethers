//以太坊中,很多计算都超出了JavaScript整数的最大值（js中最大安全整数为9007199254740991）
//可以利用ethers.getBigInt()函数将string ,number等类型转换为BigInt

const ethers = require("ethers");

//1. BigNumber
console.group(`\n1. BigNumber类`)

const oneGwei = ethers.getBigInt("1000000000") //从十进制字符串生成
console.log(oneGwei)
console.log(ethers.getBigInt("0x3b9aca00")) //从hex字符串生成
console.log(ethers.getBigInt(1000000000)) //从数字生成
//不能从js最大的安全整数之外的数字生成BigNumber
console.log("js中最大安全整数: ", Number.MAX_SAFE_INTEGER)

//运算
console.log("加法: ", oneGwei + 1n)
console.log("减法: ", oneGwei - 1n)
console.log("乘法: ", oneGwei * 2n)
console.log("除法: ", oneGwei / 2n)
//比较
console.log("是否相等: ", oneGwei == 1000000000n)


//2. 格式化: 小单位转大单位
//例如将wei转换为ethers: formatUnits(变量, 单位): 单位填位数或指定单位
console.group(`\n2. 格式化: 小单位转大单位, formatUnits`)
console.log(ethers.formatUnits(oneGwei, 0))
console.log(ethers.formatUnits(oneGwei, "gwei"))
console.log(ethers.formatUnits(oneGwei, 9))
console.log(ethers.formatUnits(oneGwei, "ether"))
console.log(ethers.formatUnits(1000000000, "gwei"))
console.log(ethers.formatEther(oneGwei))
console.groupEnd()


//3. 解析: 大单位转小单位
//例如将ether转换为wei: parseunits(变量, 单位),parseUntis默认单位是ether
console.group(`\n3. 解析: 大单位转小单位, parseUnits`)
console.log(ethers.parseUnits("1.0").toString())
console.log(ethers.parseUnits("1.0", "ether").toString())
console.log(ethers.parseUnits("1.0", 18).toString())
console.log(ethers.parseUnits("1.0", "gwei").toString())
console.log(ethers.parseUnits("1.0", 9).toString());
console.log(ethers.parseEther("1.0").toString())
console.groupEnd() 