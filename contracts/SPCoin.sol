// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./Token.sol";
import "./Sponsor.sol";
import "./Agent.sol";

contract SPCoin is Token, Sponsor, Agent{
    string public defaultName = "sponsorCoin";
    string public defaultSymbol = "SPCoin";
    uint256 public defaultDecimals = 18;
    uint256 public defaultTotalSupply = 1000000000000000000000000;

    constructor() Token(defaultName,  defaultSymbol, defaultDecimals, defaultTotalSupply) {
    }

}