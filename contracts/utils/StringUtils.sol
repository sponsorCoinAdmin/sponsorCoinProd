// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "hardhat/console.sol";

contract StringUtils {
string public text;

   function concat(string memory a, string memory b) internal pure returns (string memory) {
       return string(abi.encodePacked(a, b, "", "", ""));
   }

}