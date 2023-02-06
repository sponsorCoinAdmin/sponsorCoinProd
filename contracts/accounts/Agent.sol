// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
/// @title ERC20 Contract

import "../utils/Utils.sol";

contract Agent is Utils {

    struct agentRec {
       address addr;
       uint rate;
       bool verified;
    }

    constructor(){
    }
}