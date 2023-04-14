// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./AgentRates.sol";

contract Transactions is AgentRates{
    constructor() { }

    function addAgentRateTransaction(address _patronKey, address _recipientKey, uint _recipientRateKey, address _agentKey, uint _agentRateKey, uint256 _transAmount)
    public onlyOwnerOrRootAdmin(msg.sender) {
        uint256 transactionTimeStamp = block.timestamp;
// console.log("Transaction.sol:ADDING RATE REC = ",_agentRateKey, "ADDING TRANSACTION = ",_transAmount);
        addAgentRateRecord(_patronKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
    
        AgentRateStruct storage agentRateRecord= updateAgentRateTransaction(_patronKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey, _transAmount);

        agentRateRecord.lastUpdateTime = transactionTimeStamp;
        TransactionStruct memory transRec = TransactionStruct(
            {insertionTime: transactionTimeStamp, quantity: _transAmount});
        agentRateRecord.transactionList.push(transRec);
    }

    function updateAgentRateTransaction(address _patronKey, address _recipientKey, uint _recipientRateKey, address _agentKey, uint _agentRateKey, uint256 _transAmount)
       internal returns (AgentRateStruct storage) {
        AgentStruct storage agentRec = updateAgentTransaction(_patronKey, _recipientKey, _recipientRateKey, _agentKey, _transAmount);
        AgentRateStruct storage agentRateRecord= agentRec.agentRateMap[_agentRateKey];
        agentRateRecord.stakedSPCoins += _transAmount;
        return agentRateRecord;
    }

    function updateAgentTransaction(address _patronKey, address _recipientKey, uint _recipientRateKey, address _agentKey, uint256 _transAmount)
       internal returns (AgentStruct storage) {
        RecipientRateStruct storage recipientRateRecord = updateRecipientRateTransaction(_patronKey, _recipientKey, _recipientRateKey, _transAmount);
        AgentStruct storage agentRecord = recipientRateRecord.agentMap[_agentKey];
        agentRecord.stakedSPCoins += _transAmount;
        return agentRecord;
    }

    function updateRecipientRateTransaction(address _patronKey, address _recipientKey, uint _recipientRateKey, uint256 _transAmount)
       internal returns (RecipientRateStruct storage) {
        RecipientStruct storage recipientRecord = updateRecipientTransaction(_patronKey, _recipientKey, _transAmount);
        RecipientRateStruct storage recipientRateRecord = recipientRecord.recipientRateMap[_recipientRateKey];
        recipientRateRecord.stakedSPCoins += _transAmount;
        return recipientRateRecord;
    }

    function updateRecipientTransaction(address _patronKey, address _recipientKey, uint256 _transAmount)
       internal returns (RecipientStruct storage) {
        AccountStruct storage patreonRec = updatePatreonTransaction(_patronKey, _transAmount);
        RecipientStruct storage recipientRecord = patreonRec.recipientMap[_recipientKey];
        recipientRecord.stakedSPCoins += _transAmount;
        return recipientRecord;
    }

    function updatePatreonTransaction(address _patronKey, uint256 _transAmount)
       internal returns (AccountStruct storage) {
        AccountStruct storage patreonRec = accountMap[_patronKey];
        patreonRec.stakedSPCoins += _transAmount;
        return patreonRec;
    }
}
