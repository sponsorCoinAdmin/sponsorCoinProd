// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
/// @title ERC20 Contract

import "./Security.sol";

contract Agent is Security {

    struct agentRec {
       address addr;
       uint rate;
       bool verified;
    }

    constructor(){
    }
}