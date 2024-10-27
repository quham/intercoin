// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// https://docs.google.com/forms/d/e/1FAIpQLSeq8HTef2dYpRx35_WWYhyr4C146K9dfhyYJQcoD1RuTTVABg/viewform
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Africoin is ERC20, Ownable{
    uint256 public allowedSupply;

    constructor(uint256 inital_supply) ERC20("Africoin", "AFRI") {

        allowedSupply = inital_supply;
        _mint(msg.sender,inital_supply * (10 ** uint256(decimals())));

    }
    function updateAllowedSupply(uint256 newSupply) public onlyOwner {
        allowedSupply = newSupply;
    }

        // Function to mint new tokens
    function mint(address to, uint256 amount) public {
        uint256 amountToMint = amount * (10 ** uint256(decimals()));
        require(totalSupply() + amountToMint < allowedSupply * (10 ** uint256(decimals())), "cannot mint more than allowed supply");
        _mint(to, amountToMint);
    }

    // Function to burn tokens
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    // Function to burn tokens from a specific account
    function burnFrom(address account, uint256 amount) public {
        uint256 decreasedAllowance = allowance(account, msg.sender) - amount;
        _approve(account, msg.sender, decreasedAllowance);
        _burn(account, amount);
    }

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