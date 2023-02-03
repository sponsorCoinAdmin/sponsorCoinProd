// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Security {
    address private  rootAdmin;
 
    constructor()  {
        rootAdmin = msg.sender;
    }

    modifier onlyRootAdmin () {
        require (msg.sender == rootAdmin, "Security Access Violation");
        _;
    }

}
