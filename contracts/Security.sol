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
        require (msg.sender == rootAdmin, "Security Access Violation");
        _;
    }
}
