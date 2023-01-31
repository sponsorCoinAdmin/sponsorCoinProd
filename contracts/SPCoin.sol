// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./Token.sol";
import "./Sponsor.sol";
import "./Agent.sol";

contract SPCoin is Token{
    string public defaultName = "sponsorCoin";
    string public defaultSymbol = "SPCoin";
    uint256 public defaultDecimals = 18;
    uint256 public defaultTotalSupply = 1000000000 * 10**defaultDecimals;

    constructor()  {
        initToken(defaultName,  defaultSymbol, defaultDecimals, defaultTotalSupply);
    }

}