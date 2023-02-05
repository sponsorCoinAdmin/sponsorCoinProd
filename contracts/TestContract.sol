// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract TestContract is ERC721 {

    constructor(string memory _name, string memory _symbol) 
        ERC721(_name, _symbol) {
            console.log("CONTRACT => name", _name);
            console.log("CONTRACT => This is the NFT symbol:2", _symbol);
            console.log("CONTRACT => msg.sender", msg.sender);
    }
}