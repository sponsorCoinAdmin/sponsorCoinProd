// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "./Rates.sol";

contract Transactions is Rates{
    constructor() {
    }

    function addAgentRateTransaction(address _patreonKey, address _sponsorKey, address _agentKey, uint _rateKey, uint256 _transAmount)
    public onlyOwnerOrRootAdmin(msg.sender) {
        uint256 transactionTimeStamp = block.timestamp;
        // console.log("ADDING RATE REC = ",_rateKey, "ADDING TRANSACTION = ",_transAmount);
        addAgentRate(_patreonKey, _sponsorKey, _agentKey, _rateKey);
    //    RateStruct storage rateRec = getRateRecordByKeys(_patreonKey, _sponsorKey, _agentKey, _rateKey);

        AccountStruct storage accountRec = accountMap[_patreonKey];
        SponsorStruct storage sponsorRec = accountRec.sponsorMap[_sponsorKey];
        AgentStruct storage agentRec = sponsorRec.agentMap[_agentKey];
        RateStruct storage rateRec = agentRec.rateMap[_rateKey];
// console.log("accountRec.stakedSPCoins = ",accountRec.stakedSPCoins, "Adding ",_transAmount);
// console.log("   sponsorRec.totalSponsored = ",sponsorRec.totalSponsored, "Adding ",_transAmount);
// console.log("      agentRec.totalSponsored = ",agentRec.totalSponsored, "Adding ",_transAmount);
// console.log("         rateRec.totalSponsored = ",rateRec.totalSponsored, "Adding ",_transAmount);
        accountRec.stakedSPCoins += _transAmount;
        sponsorRec.totalSponsored += _transAmount;
        agentRec.totalSponsored += _transAmount;
        rateRec.totalSponsored += _transAmount;
        /**/
        // console.log("rateRec.inserted", rateRec.inserted);  

        rateRec.lastUpdateTime = transactionTimeStamp;
        TransactionStruct memory transRec = TransactionStruct(
            {insertionTime: transactionTimeStamp, quantity: _transAmount});
        TransactionStruct[] storage transactionList = rateRec.transactionList;
        transactionList.push(transRec);
    }
}
