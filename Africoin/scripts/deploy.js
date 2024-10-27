const hre = require("hardhat");
async function main() {
    const Coin = await hre.ethers.getContractFactory("Africoin");
    const coin = await Coin.deploy(10000);
    await coin.waitForDeployment();
    console.log("Africoin deployed to:", coin.target, coin.address);
    // const africoinContract = await hre.ethers.getContractAt("Africoin", coin.target);

    // // Call the totalSupply function to get the total supply
    // const totalSupply = await africoinContract.totalSupply();
  
    // // Format the total supply (assuming 18 decimals)
    // const formattedSupply = hre.ethers.formatUnits(totalSupply, 18);
  
    // console.log("Africoin total supply:", formattedSupply);
    // const balance = await africoinContract.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    // console.log("Africoin balance:", balance.toString());

    }
    main().catch((error) => {
    console.error(error);
    process.exit(1);
    }
    );

