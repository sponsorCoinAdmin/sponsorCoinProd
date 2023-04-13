// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./SponsorRates.sol";
import "../utils/StructSerialization.sol";

contract Agents is SponsorRates {
        constructor(){
    }

    /// @notice insert sponsors Agent
    /// @param _patronKey public Sponsor Coin Account Key
    /// @param _sponsorKey public account key to get sponsor array
    /// @param _agentKey new sponsor to add to account list
    function addSponsorAgent(address _patronKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey)
            public onlyOwnerOrRootAdmin(msg.sender) 
            nonRedundantAgent ( _patronKey, _sponsorKey, _agentKey) {
        addSponsorRate(_patronKey, _sponsorKey, _sponsorRateKey);

        AgentStruct storage  agentRecord = getAgentRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey);
        if (!agentRecord.inserted) {
            addAccountRecord(_agentKey);
            AccountStruct storage sponsorAccount = accountMap[_sponsorKey];
            AccountStruct storage agentAccount = accountMap[_agentKey];
            SponsorRateStruct storage sponsorRateRecord = getSponsorRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey);
            agentRecord.insertionTime = block.timestamp;
            agentRecord.agentAccountKey = _agentKey;
            agentRecord.inserted = true;
            sponsorAccount.agentAccountList.push(_agentKey);
            agentAccount.parentSponsorAccountList.push(_sponsorKey);
            sponsorRateRecord.agentAccountList.push(_agentKey);
        }
    }

    /// @notice retreives the sponsor array records from a specific account address.
    /// @param _patronKey patron Key to retrieve the sponsor list
    /// @param _sponsorKey sponsor Key to retrieve the agent list
    function getAgentRecordKeys(address _patronKey, address _sponsorKey, uint256 _sponsorRateKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (address[] memory) {
        SponsorRateStruct storage sponsorRateRecord = getSponsorRateRecordByKeys(_patronKey, _sponsorKey,  _sponsorRateKey);
        address[] memory agentAccountList = sponsorRateRecord.agentAccountList;
        return agentAccountList;
    }

    /// @notice Returns Agent record
    /// @param _patronKey account key
    /// @param _sponsorKey sponsor account key
    /// @param _sponsorRateKey sponsor rate
    /// @param _agentKey agent record key to be returned
    function getAgentRecordByKeys(address _patronKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey) internal view onlyOwnerOrRootAdmin(_patronKey) returns (AgentStruct storage) {
        SponsorRateStruct storage sponsorRateRecord = getSponsorRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey);
        AgentStruct storage agentRecord = sponsorRateRecord.agentMap[_agentKey];
        return agentRecord;
     }

    /// @notice Total Coin Staked Rates Sponsored
    /// @param _patronKey account key
    /// @param _sponsorKey sponsor account key
    /// @param _sponsorRateKey sponsor rate
    /// @param _agentKey agent record key to be returned
    function getAgentTotalSponsored(address _patronKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (uint) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey);
        return agentRec.stakedSPCoins; 
    }

    /// @notice retreives the sponsor array records from a specific account address.
    /// @param _patronKey patron Key to retrieve the sponsor list
    /// @param _sponsorKey sponsor Key to retrieve the agent list
    /// @param _agentKey agent Key to retrieve the agentate list
    function getAgentRateKeys(address _patronKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (uint[] memory) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey);
        uint[] memory agentRateKeys = agentRec.agentRateKeys;
        // console.log("AGENTS.SOL:addSponsorAgent: _patronKey, _sponsorKey, _sponsorRateKey, _agentKey = " , _patronKey, _sponsorKey, _sponsorRateKey, _agentKey);
        // console.log("AGENTS.SOL:addSponsorAgent:agentRec.agentAccountKey = " , agentRec.agentAccountKey);
        // console.log("AGENTS.SOL:getAgentRateKeys:agentRateKeys.length = ",agentRateKeys.length);
        return agentRateKeys;
    }
}
