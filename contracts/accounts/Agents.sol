// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./BenificiaryRates.sol";
import "../utils/StructSerialization.sol";

contract Agents is BenificiaryRates {
        constructor(){
    }

    /// @notice insert benificiarias Agent
    /// @param _patronKey public Benificiary Coin Account Key
    /// @param _benificiaryKey public account key to get benificiary array
    /// @param _agentKey new benificiary to add to account list
    function addBenificiaryAgent(address _patronKey, address _benificiaryKey, uint _benificiaryRateKey, address _agentKey)
            public onlyOwnerOrRootAdmin(msg.sender) 
            nonRedundantAgent ( _patronKey, _benificiaryKey, _agentKey) {
        addBenificiaryRate(_patronKey, _benificiaryKey, _benificiaryRateKey);

        AgentStruct storage  agentRecord = getAgentRecordByKeys(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey);
        if (!agentRecord.inserted) {
            addAccountRecord(_agentKey);
            AccountStruct storage benificiaryAccount = accountMap[_benificiaryKey];
            AccountStruct storage agentAccount = accountMap[_agentKey];
            BenificiaryRateStruct storage benificiaryRateRecord = getBenificiaryRateRecordByKeys(_patronKey, _benificiaryKey, _benificiaryRateKey);
            agentRecord.insertionTime = block.timestamp;
            agentRecord.agentKey = _agentKey;
            agentRecord.inserted = true;
            benificiaryAccount.agentAccountList.push(_agentKey);
            agentAccount.parentBenificiaryAccountList.push(_benificiaryKey);
            benificiaryRateRecord.agentAccountList.push(_agentKey);
        }
    }

    /// @notice retreives the benificiary array records from a specific account address.
    /// @param _patronKey patron Key to retrieve the benificiary list
    /// @param _benificiaryKey benificiary Key to retrieve the agent list
    function getAgentRecordKeys(address _patronKey, address _benificiaryKey, uint256 _benificiaryRateKey) public view onlyOwnerOrRootAdmin(_benificiaryKey) returns (address[] memory) {
        BenificiaryRateStruct storage benificiaryRateRecord = getBenificiaryRateRecordByKeys(_patronKey, _benificiaryKey,  _benificiaryRateKey);
        address[] memory agentAccountList = benificiaryRateRecord.agentAccountList;
        return agentAccountList;
    }

    /// @notice Returns Agent record
    /// @param _patronKey account key
    /// @param _benificiaryKey benificiary account key
    /// @param _benificiaryRateKey benificiary rate
    /// @param _agentKey agent record key to be returned
    function getAgentRecordByKeys(address _patronKey, address _benificiaryKey, uint _benificiaryRateKey, address _agentKey) internal view onlyOwnerOrRootAdmin(_patronKey) returns (AgentStruct storage) {
        BenificiaryRateStruct storage benificiaryRateRecord = getBenificiaryRateRecordByKeys(_patronKey, _benificiaryKey, _benificiaryRateKey);
        AgentStruct storage agentRecord = benificiaryRateRecord.agentMap[_agentKey];
        return agentRecord;
     }

    /// @notice Total Coin Staked Rates Benificiaryed
    /// @param _patronKey account key
    /// @param _benificiaryKey benificiary account key
    /// @param _benificiaryRateKey benificiary rate
    /// @param _agentKey agent record key to be returned
    function getAgentTotalBenificiaryed(address _patronKey, address _benificiaryKey, uint _benificiaryRateKey, address _agentKey) public view onlyOwnerOrRootAdmin(_benificiaryKey) returns (uint) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey);
        return agentRec.stakedSPCoins; 
    }

    /// @notice retreives the benificiary array records from a specific account address.
    /// @param _patronKey patron Key to retrieve the benificiary list
    /// @param _benificiaryKey benificiary Key to retrieve the agent list
    /// @param _agentKey agent Key to retrieve the agentate list
    function getAgentRateKeys(address _patronKey, address _benificiaryKey, uint _benificiaryRateKey, address _agentKey) public view onlyOwnerOrRootAdmin(_benificiaryKey) returns (uint[] memory) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey);
        uint[] memory agentRateKeys = agentRec.agentRateKeys;
        // console.log("AGENTS.SOL:addBenificiaryAgent: _patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey = " , _patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey);
        // console.log("AGENTS.SOL:addBenificiaryAgent:agentRec.agentKey = " , agentRec.agentKey);
        // console.log("AGENTS.SOL:getAgentRateKeys:agentRateKeys.length = ",agentRateKeys.length);
        return agentRateKeys;
    }
}
