require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.20", // Or your Solidity version
//   networks: {
//     amoy: {
//       url: process.env.ALCHEMY_API_URL_AMOY,
//       accounts: [process.env.PRIVATE_KEY] // Your private key
//     }
//   },
//   etherscan: {
//     apiKey: process.env.POLYGONSCAN_API_KEY, // For contract verification (optional)
//   }
// };
// require("@nomiclabs/hardhat-ethers");
// require("@nomiclabs/hardhat-waffle");
// require("@base-protocol/hardhat-base");
// require("hardhat-deploy");

module.exports = {
  solidity: "0.8.20", // Adjust to your contract's Solidity version
  networks: {
    base_sepolia: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111,
    },
  },
};
// module.exports = {
//   solidity: {
//     compilers: 
//       {
//         version: "0.8.20",
//       },
//     //   {
//     //     version: "0.8.4",
//     //     settings: {},
//     //   },
//     // ],
//   },
//   networks: {
//     // localhost: {
//     hardhat: {},
//     polygon_sepolia:{

//     }
//     // polygon_mumbai: {
//     //   url: process.env.ALCHEMY_API_URL,
//     //   accounts: [process.env.PRIVATE_KEY]
//     // },
//     polygon_mainnet: {
//       url: process.env.ALCHEMY_API_URL,
//       accounts: [process.env.PRIVATE_KEY]
//     }
//   }
// };
