// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";
// import "@reclaimprotocol/verifier-solidity-sdk/contracts/Reclaim.sol";
// import "@reclaimprotocol/verifier-solidity-sdk/contracts/Addresses.sol";

contract Africoin is ERC20 {//Burnable, ERC20Mintable {
    address payable immutable public owner;
    uint256 public allowedSupply;
    // mapping(string => uint256) public coinAllocation; // per coin
    // mapping(string => uint256) public verifiedReserves;
    // string[] public assetTickers = ["AAPL", "WMT"];// new string[](3); // should i make fixed size
    // Reclaim public reclaim;
    // uint256 public totalSupply;
    constructor(uint256 inital_supply) ERC20("Africoin", "AFRI") {
        // reclaim = Reclaim(Addresses.POLYGON_MAINNET);
        allowedSupply = inital_supply;
        owner = payable(msg.sender);
        _mint(msg.sender,inital_supply * (10 ** uint256(decimals()))); // dynamic peg only pegged to certain portfolio of assets for a month

    }
    function updateAllowedSupply(uint256 newSupply) external {
        require(msg.sender == owner, "only owner can update supply");
        allowedSupply = newSupply;
    }
//     function mint(address account, uint256 amount) external {
//         require(msg.sender == owner, "only owner can mint");
//         // require(totalSupply() + amount < verifiedReserve * (10 ** uint256(decimals())), "cannot mint more than reserve");
//         for (uint i = 0; i < assetTickers.length; i++) {
//             require((totalSupply() + amount) * coinAllocation[assetTickers[i]]  < verifiedReserves[assetTickers[i]] * 10 ** uint256(decimals()), "cannot mint more than reserve");
//         }
//         // need to override mint function from ERC20
//         _mint(account, amount * (10 ** uint256(decimals())));
    
//     }
//     function burn(uint256 amount) external {
//         _burn(msg.sender, amount);
//     }
//     function updateReserve(string memory context) external { 
//         // require(tx.origin == owner, "only owner can update reserve");
//         string memory x;
//         for (uint i = 0; i < assetTickers.length; i++) {
//             string memory asset = assetTickers[i];
//             string memory target = string(abi.encodePacked('"',asset, '_quantity":"'));
//             console.log(target);
//             x = extractFieldFromContext(context, target);
//             console.log("field extracted: ", x, asset);
            
//             // assetReserves[asset] = uint256(keccak256(abi.encodePacked(x)));
//             console.log("integer reserve", uint256(stringToTruncatedUint(x)), asset);
//             verifiedReserves[asset] = uint256(stringToTruncatedUint(x));
//         }
//     }
//     function getTarget(string memory asset) external view returns (string memory) {
//         return string(abi.encodePacked('"',asset, '_quantity":"'));
//     }
//     function setCoinAllocation(string memory asset, uint256 allocation) external {//need to go from int to bigint in python script
//         // require(msg.sender == owner, "only owner can set coin allocation");
//         coinAllocation[asset] = allocation;
//     }
//     function getCoinAllocation(string memory asset) external view returns (uint256) {
//         return coinAllocation[asset];
//     } 
//     function getVerifiedReserve(string memory asset) external view returns (uint256) {
//         return verifiedReserves[asset];
//     }   
//     function stringToTruncatedUint(string memory text) public pure returns (uint) {
//       uint result = 0;
//       bytes memory stringBytes = bytes(text);
//       for (uint i = 0; i < stringBytes.length; i++) {
//          uint ascii = uint(uint8(stringBytes[i]));
//          if (ascii >= 58 || ascii < 48 ){
//             return result;
//          }
//          uint digit = uint(uint8(stringBytes[i])) - 48;
//          // Check if the character is a number between 0-9
//          console.log(digit);
         
//          require(digit < 10, "Invalid character in string");
//          result = result * 10 + digit;
//       }
//       return result;
//    }
//    	function extractFieldFromContext(
// 		string memory data,
// 		string memory target
// 	) public pure returns (string memory) {
// 		bytes memory dataBytes = bytes(data);
// 		bytes memory targetBytes = bytes(target);

// 		require(dataBytes.length >= targetBytes.length, "target is longer than data");
// 		uint start = 0;
// 		bool foundStart = false;
// 		// Find start of "contextMessage":"

// 		for (uint i = 0; i <= dataBytes.length - targetBytes.length; i++) {
// 			bool isMatch = true;

// 			for (uint j = 0; j < targetBytes.length && isMatch; j++) {
// 				if (dataBytes[i + j] != targetBytes[j]) {
// 					isMatch = false;
// 				}
// 			}

// 			if (isMatch) {
// 				start = i + targetBytes.length; // Move start to the end of "contextMessage":"
// 				foundStart = true;
// 				break;
// 			}
// 		}

// 		if (!foundStart) {
// 			return ""; // Malformed or missing message
// 		}
// 		// Find the end of the message, assuming it ends with a quote not preceded by a backslash
// 		uint end = start;
// 		while (
// 			end < dataBytes.length &&
// 			!(dataBytes[end] == '"' && dataBytes[end - 1] != "\\")
// 		) {
// 			end++;
// 		}
// 		if (end <= start) {
// 			return ""; // Malformed or missing message
// 		}
// 		bytes memory contextMessage = new bytes(end - start);
// 		for (uint i = start; i < end; i++) {
// 			contextMessage[i - start] = dataBytes[i];
// 		}
// 		return string(contextMessage);
// 	}
    
}
    