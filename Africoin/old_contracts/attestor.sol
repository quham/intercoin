// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
 
import "@reclaimprotocol/verifier-solidity-sdk/contracts/Reclaim.sol";
import "@reclaimprotocol/verifier-solidity-sdk/contracts/Addresses.sol";
import "./africoin.sol";
import "hardhat/console.sol";
 
 
contract Attestor {  // more accurately named verifier
   address public reclaimAddress;
   // add providersHashes for your permitted providers (What is this for?)
   // Reclaim.proof public latestProof; // use personal struct instead of reclaim struct
   Africoin public stablecoin;
   address public reserveManager;
   
 
   constructor(address coin){ // etoro, trading212, etc
        // TODO: Replace with network you are deploying on
      reclaimAddress = Addresses.POLYGON_MAINNET; 
      stablecoin = Africoin(coin);
      // reserveManager = rm;
 
   } 
   function userVerifyProof() public {
      // Reclaim(reclaimAddress).verifyProof(latestProof);
   }


 
   function verifyProof(Reclaim.Proof memory proof) public { // more appropriately named updateReserve
      // require(Reclaim.extractFieldFromContext(proof.claimInfo.context, '"contextAddress":"') == reserveManager, "only reserve manager can update reserve");
      
      // Reclaim(reclaimAddress).verifyProof(proof); // key

      // for (uint i = 0; i < proof.claimInfo.parameters.length; i++) {
      //     console.log(proof.claimInfo.parameters[i]);
      // }
      console.log("parameters...", proof.claimInfo.parameters);
      console.log("context....", proof.claimInfo.context);


      //    proof.Claiminfo.provider;

      stablecoin.updateReserve(proof.claimInfo.context);



   }
  
}

// // Attestor.sol
// pragma solidity 0.8.20;
 
 
// import "@reclaimprotocol/verifier-solidity-sdk/contracts/Reclaim.sol";
// import "@reclaimprotocol/verifier-solidity-sdk/contracts/Addresses.sol";
 
// contract Attestor {
//   address public reclaimAddress;
//   // add providersHashes for your permitted providers
//   string[] public providersHashes;
//   constructor(string[] memory _providersHashes){
//      providersHashes = _providersHashes;
//        // TODO: Replace with network you are deploying on
//      reclaimAddress = Addresses.PLOYGON_MUMBAI_TESTNET; 
//   }  
//   function verifyProof(Reclaim.Proof memory proof) public view{
//       Reclaim(reclaimAddress).verifyProof(proof, providersHashes);
//       // TODO: your business logic upon success
//       // verify proof.context is what you expect
//   }
// }
// // refer this example for more details - 
// // https://github.com/reclaimprotocol/verifier-sdk-example/blob/main/contracts/Attestor.sol