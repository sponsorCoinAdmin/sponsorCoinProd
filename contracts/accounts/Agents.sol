// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./RecipientRates.sol";
import "../utils/StructSerialization.sol";

contract Agents is RecipientRates {
        constructor(){
    }

    /// @notice insert recipients Agent
    /// @param _patronKey public Recipient Coin Account Key
    /// @param _recipientKey public account key to get recipient array
    /// @param _agentKey new recipient to add to account list
    function addRecipientAgent(address _patronKey, address _recipientKey, uint _recipientRateKey, address _agentKey)
            public onlyOwnerOrRootAdmin(msg.sender) 
            nonRedundantAgent ( _patronKey, _recipientKey, _agentKey) {
        addRecipientRate(_patronKey, _recipientKey, _recipientRateKey);

        AgentStruct storage  agentRecord = getAgentRecordByKeys(_patronKey, _recipientKey, _recipientRateKey, _agentKey);
        if (!agentRecord.inserted) {
            addAccountRecord(_agentKey);
            AccountStruct storage recipientAccount = accountMap[_recipientKey];
            AccountStruct storage agentAccount = accountMap[_agentKey];
            RecipientRateStruct storage recipientRateRecord = getRecipientRateRecordByKeys(_patronKey, _recipientKey, _recipientRateKey);
            agentRecord.insertionTime = block.timestamp;
            agentRecord.agentKey = _agentKey;
            agentRecord.inserted = true;
            recipientAccount.agentAccountList.push(_agentKey);
            agentAccount.parentRecipientAccountList.push(_recipientKey);
            recipientRateRecord.agentAccountList.push(_agentKey);
        }
    }

    /// @notice retreives the recipient array records from a specific account address.
    /// @param _patronKey patron Key to retrieve the recipient list
    /// @param _recipientKey recipient Key to retrieve the agent list
    function getAgentRecordKeys(address _patronKey, address _recipientKey, uint256 _recipientRateKey) public view onlyOwnerOrRootAdmin(_recipientKey) returns (address[] memory) {
        RecipientRateStruct storage recipientRateRecord = getRecipientRateRecordByKeys(_patronKey, _recipientKey,  _recipientRateKey);
        address[] memory agentAccountList = recipientRateRecord.agentAccountList;
        return agentAccountList;
    }

    /// @notice Returns Agent record
    /// @param _patronKey account key
    /// @param _recipientKey recipient account key
    /// @param _recipientRateKey recipient rate
    /// @param _agentKey agent record key to be returned
    function getAgentRecordByKeys(address _patronKey, address _recipientKey, uint _recipientRateKey, address _agentKey) internal view onlyOwnerOrRootAdmin(_patronKey) returns (AgentStruct storage) {
        RecipientRateStruct storage recipientRateRecord = getRecipientRateRecordByKeys(_patronKey, _recipientKey, _recipientRateKey);
        AgentStruct storage agentRecord = recipientRateRecord.agentMap[_agentKey];
        return agentRecord;
     }

    /// @notice Total Coin Staked Rates Recipiented
    /// @param _patronKey account key
    /// @param _recipientKey recipient account key
    /// @param _recipientRateKey recipient rate
    /// @param _agentKey agent record key to be returned
    function getAgentTotalRecipiented(address _patronKey, address _recipientKey, uint _recipientRateKey, address _agentKey) public view onlyOwnerOrRootAdmin(_recipientKey) returns (uint) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_patronKey, _recipientKey, _recipientRateKey, _agentKey);
        return agentRec.stakedSPCoins; 
    }

    /// @notice retreives the recipient array records from a specific account address.
    /// @param _patronKey patron Key to retrieve the recipient list
    /// @param _recipientKey recipient Key to retrieve the agent list
    /// @param _agentKey agent Key to retrieve the agentate list
    function getAgentRateKeys(address _patronKey, address _recipientKey, uint _recipientRateKey, address _agentKey) public view onlyOwnerOrRootAdmin(_recipientKey) returns (uint[] memory) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_patronKey, _recipientKey, _recipientRateKey, _agentKey);
        uint[] memory agentRateKeys = agentRec.agentRateKeys;
        // console.log("AGENTS.SOL:addRecipientAgent: _patronKey, _recipientKey, _recipientRateKey, _agentKey = " , _patronKey, _recipientKey, _recipientRateKey, _agentKey);
        // console.log("AGENTS.SOL:addRecipientAgent:agentRec.agentKey = " , agentRec.agentKey);
        // console.log("AGENTS.SOL:getAgentRateKeys:agentRateKeys.length = ",agentRateKeys.length);
        return agentRateKeys;
    }
}
