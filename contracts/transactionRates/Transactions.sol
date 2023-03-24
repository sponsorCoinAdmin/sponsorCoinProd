// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "./Rates.sol";

contract Transactions is Rates{
    constructor(){
    }
 
    function addAgentRateTransaction(address _patreonKey, address _sponsorKey, address _agentKey, uint _rateKey, int256 _transAmount)
    public onlyOwnerOrRootAdmin(msg.sender) {
        addAgentRate(_patreonKey, _sponsorKey, _agentKey, _rateKey);
        RateStruct storage rateRec = getRateRecordByKeys(_patreonKey, _sponsorKey, _agentKey, _rateKey);
        TransactionStruct memory transStruct = TransactionStruct(
            {insertionTime: block.timestamp, quantity: _transAmount});
            rateRec.transactionList.push(transStruct);   
    }
}
