// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./AgentRates.sol";

contract Transactions is Rates{
    constructor() { }

    function addAgentRateTransaction(address _patreonKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey, uint _agentRateKey, uint256 _transAmount)
    public onlyOwnerOrRootAdmin(msg.sender) {
        uint256 transactionTimeStamp = block.timestamp;
// console.log("Transaction.sol:ADDING RATE REC = ",_agentRateKey, "ADDING TRANSACTION = ",_transAmount);
        addAgentRate(_patreonKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey);
        AccountStruct storage accountRec = accountMap[_patreonKey];
        SponsorStruct storage sponsorRec = accountRec.sponsorMap[_sponsorKey];
        AgentStruct storage agentRec = sponsorRec.agentMap[_agentKey];
        AgentRateStruct storage agentRateRec = agentRec.agentRateMap[_agentRateKey];
// console.log("accountRec.stakedSPCoins = ",accountRec.stakedSPCoins, "Adding ",_transAmount);
// console.log("   sponsorRec.totalAgentsSponsored = ",sponsorRec.totalAgentsSponsored, "Adding ",_transAmount);
// console.log("      agentRec.totalRatesSponsored = ",agentRec.totalRatesSponsored, "Adding ",_transAmount);
// console.log("         agentRateRec.totalTransactionsSponsored = ",agentRateRec.totalTransactionsSponsored, "Adding ",_transAmount);
        accountRec.stakedSPCoins += _transAmount;
        sponsorRec.totalAgentsSponsored += _transAmount;
        agentRec.totalRatesSponsored += _transAmount;
        agentRateRec.totalTransactionsSponsored += _transAmount;
        /**/
        // console.log("agentRateRec.inserted", agentRateRec.inserted);  

        agentRateRec.lastUpdateTime = transactionTimeStamp;
        TransactionStruct memory transRec = TransactionStruct(
            {insertionTime: transactionTimeStamp, quantity: _transAmount});
        TransactionStruct[] storage transactionList = agentRateRec.transactionList;
        transactionList.push(transRec);
    }
}
