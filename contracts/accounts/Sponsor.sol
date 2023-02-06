// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
/// @title ERC20 Contract

import "./Agent.sol";

contract Sponsor is Agent{

    struct sponsorRec {
       address addr;
       uint rate;
       bool verified;
       agentRec[] agentAccounts;
    }

    constructor(){
    }
}