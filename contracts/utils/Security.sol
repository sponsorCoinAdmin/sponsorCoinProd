// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "hardhat/console.sol";

contract Security {
    address private  rootAdmin;
 
    constructor()  {
        rootAdmin = msg.sender;
        console.log("HARDHAT LOGGING WORKS");
    }

    modifier onlyRootAdmin () {
        require (msg.sender == rootAdmin, "Root Admin Security Access Violation");
        _;
    }

    modifier onlyOwner (address _account) {
        require (msg.sender == _account, "Owner Security Access Violation");
        _;
    }

    modifier onlyOwnerOrRootAdmin (address _account) {
        require (msg.sender == rootAdmin || msg.sender == _account, "Owner or Root Admin Security Access Violation");
        _;
    }
}
