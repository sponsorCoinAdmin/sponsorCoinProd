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
    
        AgentRateStruct storage agentRateRecord= updateAgentRateTransaction(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey, _transAmount);

        agentRateRecord.lastUpdateTime = transactionTimeStamp;
        TransactionStruct memory transRec = TransactionStruct(
            {insertionTime: transactionTimeStamp, quantity: _transAmount});
        agentRateRecord.transactionList.push(transRec);
    }

    function updateAgentRateTransaction(address _patronKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey, uint _agentRateKey, uint256 _transAmount)
       internal returns (AgentRateStruct storage) {
        AgentStruct storage agentRec = updateAgentTransaction(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _transAmount);
        AgentRateStruct storage agentRateRecord= agentRec.agentRateMap[_agentRateKey];
        agentRateRecord.stakedSPCoins += _transAmount;
        return agentRateRecord;
    }

    function updateAgentTransaction(address _patronKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey, uint256 _transAmount)
       internal returns (AgentStruct storage) {
        SponsorRateStruct storage sponsorRateRecord = updateSponsorRateTransaction(_patronKey, _sponsorKey, _sponsorRateKey, _transAmount);
        AgentStruct storage agentRecord = sponsorRateRecord.agentMap[_agentKey];
        agentRecord.stakedSPCoins += _transAmount;
        return agentRecord;
    }

    function updateSponsorRateTransaction(address _patronKey, address _sponsorKey, uint _sponsorRateKey, uint256 _transAmount)
       internal returns (SponsorRateStruct storage) {
        SponsorStruct storage sponsorRecord = updateSponsorTransaction(_patronKey, _sponsorKey, _transAmount);
        SponsorRateStruct storage sponsorRateRecord = sponsorRecord.sponsorRateMap[_sponsorRateKey];
        sponsorRateRecord.stakedSPCoins += _transAmount;
        return sponsorRateRecord;
    }

    function updateSponsorTransaction(address _patronKey, address _sponsorKey, uint256 _transAmount)
       internal returns (SponsorStruct storage) {
        AccountStruct storage patreonRec = updatePatreonTransaction(_patronKey, _transAmount);
        SponsorStruct storage sponsorRecord = patreonRec.sponsorMap[_sponsorKey];
        sponsorRecord.stakedSPCoins += _transAmount;
        return sponsorRecord;
    }

    function updatePatreonTransaction(address _patronKey, uint256 _transAmount)
       internal returns (AccountStruct storage) {
        AccountStruct storage patreonRec = accountMap[_patronKey];
        patreonRec.stakedSPCoins += _transAmount;
        return patreonRec;
    }
}
