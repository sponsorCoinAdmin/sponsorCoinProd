// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./AgentRates.sol";

contract Transactions is AgentRates{
    constructor() { }

    function addAgentRateTransaction(address _patronKey, address _benificiaryKey, uint _benificiaryRateKey, address _agentKey, uint _agentRateKey, uint256 _transAmount)
    public onlyOwnerOrRootAdmin(msg.sender) {
        uint256 transactionTimeStamp = block.timestamp;
// console.log("Transaction.sol:ADDING RATE REC = ",_agentRateKey, "ADDING TRANSACTION = ",_transAmount);
        addAgentRateRecord(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey, _agentRateKey);
    
        AgentRateStruct storage agentRateRecord= updateAgentRateTransaction(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey, _agentRateKey, _transAmount);

        agentRateRecord.lastUpdateTime = transactionTimeStamp;
        TransactionStruct memory transRec = TransactionStruct(
            {insertionTime: transactionTimeStamp, quantity: _transAmount});
        agentRateRecord.transactionList.push(transRec);
    }

    function updateAgentRateTransaction(address _patronKey, address _benificiaryKey, uint _benificiaryRateKey, address _agentKey, uint _agentRateKey, uint256 _transAmount)
       internal returns (AgentRateStruct storage) {
        AgentStruct storage agentRec = updateAgentTransaction(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey, _transAmount);
        AgentRateStruct storage agentRateRecord= agentRec.agentRateMap[_agentRateKey];
        agentRateRecord.stakedSPCoins += _transAmount;
        return agentRateRecord;
    }

    function updateAgentTransaction(address _patronKey, address _benificiaryKey, uint _benificiaryRateKey, address _agentKey, uint256 _transAmount)
       internal returns (AgentStruct storage) {
        BenificiaryRateStruct storage benificiaryRateRecord = updateBenificiaryRateTransaction(_patronKey, _benificiaryKey, _benificiaryRateKey, _transAmount);
        AgentStruct storage agentRecord = benificiaryRateRecord.agentMap[_agentKey];
        agentRecord.stakedSPCoins += _transAmount;
        return agentRecord;
    }

    function updateBenificiaryRateTransaction(address _patronKey, address _benificiaryKey, uint _benificiaryRateKey, uint256 _transAmount)
       internal returns (BenificiaryRateStruct storage) {
        BenificiaryStruct storage benificiaryRecord = updateBenificiaryTransaction(_patronKey, _benificiaryKey, _transAmount);
        BenificiaryRateStruct storage benificiaryRateRecord = benificiaryRecord.benificiaryRateMap[_benificiaryRateKey];
        benificiaryRateRecord.stakedSPCoins += _transAmount;
        return benificiaryRateRecord;
    }

    function updateBenificiaryTransaction(address _patronKey, address _benificiaryKey, uint256 _transAmount)
       internal returns (BenificiaryStruct storage) {
        AccountStruct storage patreonRec = updatePatreonTransaction(_patronKey, _transAmount);
        BenificiaryStruct storage benificiaryRecord = patreonRec.benificiaryMap[_benificiaryKey];
        benificiaryRecord.stakedSPCoins += _transAmount;
        return benificiaryRecord;
    }

    function updatePatreonTransaction(address _patronKey, uint256 _transAmount)
       internal returns (AccountStruct storage) {
        AccountStruct storage patreonRec = accountMap[_patronKey];
        patreonRec.stakedSPCoins += _transAmount;
        return patreonRec;
    }
}
