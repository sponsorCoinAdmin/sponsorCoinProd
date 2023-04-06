// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./Token.sol";

contract SPCoin is Token{
    string private defaultName         = "sponsorCoin002";
    string private defaultSymbol       = "SPCT00";
    uint256 private defaultDecimals    = 18;
    uint256 private defaultTotalSupply = 1000000000 * 10**defaultDecimals;

    // constructor()  {
    //     initToken("Test", "Test0001", 18, 100000000000000000000000000);
    // } 

    constructor()  {
//        logDetail("JS => MESSAGE.SENDER: ", msg.sender);
        initToken(defaultName,  defaultSymbol, defaultDecimals, defaultTotalSupply);
//        logDetail("JS => MESSAGE.SENDER: ", msg.sender);
    }

    function initToken(string memory _name, string memory _symbol, uint _decimals, uint _totalSupply) public onlyRootAdmin {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _totalSupply;
        balanceOf[msg.sender] = _totalSupply;
        stakedSPCoins = 0;
    }

    function transferAgentRateTransaction(address _patreonKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey, uint _agentRateKey, uint256 _transAmount)
    public onlyOwnerOrRootAdmin(msg.sender) {
        transfer(_patreonKey, _transAmount);
        addAgentRateTransaction( _patreonKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey, _transAmount);
    }
}