// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./Token.sol";

contract SPCoin is Token{
    string private defaultName         = "sponsorCoin";
    string private defaultSymbol       = "SPCoin";
    uint256 private defaultDecimals    = 18;
    uint256 private defaultTotalSupply = 1000000000 * 10**defaultDecimals;

    constructor()  {
        initToken(defaultName,  defaultSymbol, defaultDecimals, defaultTotalSupply);
//        console.log("MESSAGE.SENDER: ", msg.sender);
    }

   function msgSender() external view returns(address){
      return (msg.sender);
   }

}