// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "./Rates.sol";

contract Transactions is Rates{
    constructor(){
    }

    function addRateTransaction(address _patreonKey, address _sponsorKey, address _agentKey, uint _rate)
    public onlyOwnerOrRootAdmin(msg.sender) {

        addAgentRate(_patreonKey, _sponsorKey, _agentKey, _rate);

        RateStruct storage agentRec = getRateRecordByKeys(_patreonKey, _sponsorKey, _agentKey, _rate);
    }
}
