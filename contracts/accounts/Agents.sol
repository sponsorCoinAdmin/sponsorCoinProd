// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./RecipientRates.sol";
import "../utils/StructSerialization.sol";

contract Agents is RecipientRates {
        constructor(){
    }

    /// @notice insert recipients Agent
    /// @param _recipientKey public account key to get recipient array
    /// @param _agentKey new recipient to add to account list
    function addAgent(address _recipientKey, uint _recipientRateKey, address _agentKey)
            public onlyOwnerOrRootAdmin(msg.sender) 
            nonRedundantAgent ( msg.sender, _recipientKey, _agentKey) {
        addRecipientRate(_recipientKey, _recipientRateKey);

        AgentStruct storage  agentRecord = getAgentRecordByKeys(_recipientKey, _recipientRateKey, _agentKey);
        if (!agentRecord.inserted) {
            addAccountRecord(_agentKey);
            RecipientRateStruct storage recipientRateRecord = getRecipientRateRecordByKeys(_recipientKey, _recipientRateKey);
            agentRecord.insertionTime = block.timestamp;
            agentRecord.sponsorKey = msg.sender;
            agentRecord.recipientKey = _recipientKey;
            agentRecord.agentKey = _agentKey;
            agentRecord.inserted = true;
            accountMap[_recipientKey].agentAccountList.push(_agentKey);
            accountMap[_agentKey].parentRecipientAccountList.push(_recipientKey);
            recipientRateRecord.agentAccountList.push(_agentKey);
        }
    }

    /// @notice retreives the recipient array records from a specific account address.
    /// @param _recipientKey recipient Key to retrieve the agent list
    function getAgentRecordKeys(address _recipientKey, uint256 _recipientRateKey) public view onlyOwnerOrRootAdmin(_recipientKey) returns (address[] memory) {
        RecipientRateStruct storage recipientRateRecord = getRecipientRateRecordByKeys( _recipientKey,  _recipientRateKey);
        address[] memory agentAccountList = recipientRateRecord.agentAccountList;
        return agentAccountList;
    }

    /// @notice Returns Agent record
    /// @param _recipientKey recipient account key
    /// @param _recipientRateKey recipient rate
    /// @param _agentKey agent record key to be returned
    function getAgentRecordByKeys(address _recipientKey, uint _recipientRateKey, address _agentKey) internal view onlyOwnerOrRootAdmin(msg.sender) returns (AgentStruct storage) {
        RecipientRateStruct storage recipientRateRecord = getRecipientRateRecordByKeys(_recipientKey, _recipientRateKey);
        AgentStruct storage agentRecord = recipientRateRecord.agentMap[_agentKey];
        return agentRecord;
     }

    /// @notice Total Coin Staked Rates Recipiented
    /// @param _recipientKey recipient account key
    /// @param _recipientRateKey recipient rate
    /// @param _agentKey agent record key to be returned
    function getAgentTotalRecipient(address _recipientKey, uint _recipientRateKey, address _agentKey) public view onlyOwnerOrRootAdmin(_recipientKey) returns (uint) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_recipientKey, _recipientRateKey, _agentKey);
        return agentRec.stakedSPCoins; 
    }

    /// @notice retreives the recipient array records from a specific account address.
    /// @param _recipientKey recipient Key to retrieve the agent list
    /// @param _agentKey agent Key to retrieve the agentate list
    function getAgentRateKeys(address _recipientKey, uint _recipientRateKey, address _agentKey) public view onlyOwnerOrRootAdmin(_recipientKey) returns (uint[] memory) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_recipientKey, _recipientRateKey, _agentKey);
        uint[] memory agentRateKeys = agentRec.agentRateKeys;
        // console.log("AGENTS.SOL:addAgent:agentRec.agentKey = " , agentRec.agentKey);
        // console.log("AGENTS.SOL:getAgentRateKeys:agentRateKeys.length = ",agentRateKeys.length);
        return agentRateKeys;
    }
}
