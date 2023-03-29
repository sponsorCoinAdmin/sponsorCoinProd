// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "./Rates.sol";

contract Transactions is Rates{
    constructor() {
    }

    function addAgentRateTransaction(address _patreonKey, address _sponsorKey, address _agentKey, uint _rateKey, uint256 _transAmount)
    public onlyOwnerOrRootAdmin(msg.sender) {
        // console.log("ADDING RATE REC = ",_rateKey, "ADDING TRANSACTION = ",_transAmount);
        addAgentRate(_patreonKey, _sponsorKey, _agentKey, _rateKey);
        RateStruct storage rateRec = getRateRecordByKeys(_patreonKey, _sponsorKey, _agentKey, _rateKey);

        // console.log("rateRec.inserted", rateRec.inserted);  

        uint256 transactionTimeStamp = block.timestamp;
        TransactionStruct memory transRec = TransactionStruct(
            {insertionTime: transactionTimeStamp, quantity: _transAmount});
        TransactionStruct[] storage transactionList = rateRec.transactionList;
        transactionList.push(transRec);
        rateRec.lastUpdateTime = transactionTimeStamp;
        rateRec.totalSponsored += _transAmount;
    } 

}
