// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./AgentRates.sol";

contract Transactions is AgentRates{
    constructor() { }

    function addAgentRateTransaction(address _patronKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey, uint _agentRateKey, uint256 _transAmount)
    public onlyOwnerOrRootAdmin(msg.sender) {
        uint256 transactionTimeStamp = block.timestamp;
// console.log("Transaction.sol:ADDING RATE REC = ",_agentRateKey, "ADDING TRANSACTION = ",_transAmount);
        addAgentRateRecord(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey);
        AgentRateStruct storage agentRateRec = getAgentRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey);
        AccountStruct storage patreonRec = accountMap[_patronKey];
        SponsorStruct storage sponsorRec = patreonRec.sponsorMap[_sponsorKey];
        SponsorRateStruct storage sponsorRateRec = sponsorRec.sponsorRateMap[_sponsorRateKey];
        AgentStruct storage agentRec = sponsorRateRec.agentMap[_agentKey];

        // Propogate Transaction Rates
        patreonRec.stakedSPCoins += _transAmount;
        sponsorRec.stakedAgentsSponsored += _transAmount;
        agentRec.stakedRatesSponsored += _transAmount;
        agentRateRec.stakedTransactionsSponsored += _transAmount;

        // console.log("agentRateRec.inserted", agentRateRec.inserted);  
        // console.log("patreonRec.stakedSPCoins = ",patreonRec.stakedSPCoins, "Adding ",_transAmount);
        // console.log("   sponsorRec.stakedAgentsSponsored = ",sponsorRec.stakedAgentsSponsored, "Adding ",_transAmount);
        // console.log("      agentRec.stakedRatesSponsored = ",agentRec.stakedRatesSponsored, "Adding ",_transAmount);
        // console.log("         agentRateRec.stakedTransactionsSponsored = ",agentRateRec.stakedTransactionsSponsored, "Adding ",_transAmount);

        agentRateRec.lastUpdateTime = transactionTimeStamp;
        TransactionStruct memory transRec = TransactionStruct(
            {insertionTime: transactionTimeStamp, quantity: _transAmount});
        TransactionStruct[] storage transactionList = agentRateRec.transactionList;
        transactionList.push(transRec);
    }
/*
    function getAgentRateRecord(address _patronKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey, uint _agentRateKey, uint256 _transAmount)
       internal returns (AgentRateStruct storage) {
        AccountStruct storage patreonRec = accountMap[_patronKey];
        SponsorStruct storage sponsorRec = patreonRec.sponsorMap[_sponsorKey];
        SponsorRateStruct storage sponsorRateRec = sponsorRec.sponsorRateMap[_sponsorRateKey];
        AgentStruct storage agentRec = sponsorRateRec.agentMap[_agentKey];
        AgentRateStruct storage agentRateRec = agentRec.agentRateMap[_agentRateKey];
        return agentRateRec;
       }
*/
}
