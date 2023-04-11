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

        AgentStruct storage  sponsorAgentRec = getAgentRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey);
        if (!sponsorAgentRec.inserted) {
            addAccountRecord(_agentKey);
            AccountStruct storage accountSponsorRec = accountMap[_sponsorKey];
            AccountStruct storage accountAgentRec = accountMap[_agentKey];
            SponsorRateStruct storage sponsorRateRec = getSponsorRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey);
            sponsorAgentRec.insertionTime = block.timestamp;
            sponsorAgentRec.agentAccountKey = _agentKey;
            sponsorAgentRec.inserted = true;
            accountSponsorRec.agentAccountKeys.push(_agentKey);
            string memory agentParentKeys = concat(toString(_patronKey), ", ", toString(_sponsorKey));
            accountSponsorRec.agentParentKeys.push(agentParentKeys);
            accountAgentRec.parentSponsorAccountKeys.push(_sponsorKey);
            sponsorRateRec.agentAccountKeys.push(_agentKey);
        }
    }

    /// @notice retreives the sponsor array records from a specific account address.
    /// @param _patronKey patron Key to retrieve the sponsor list
    /// @param _sponsorKey sponsor Key to retrieve the agent list
    function getAgentRecordKeys(address _patronKey, address _sponsorKey, uint256 _sponsorRateKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (address[] memory) {
        SponsorRateStruct storage sponsorRateRec = getSponsorRateRecordByKeys(_patronKey, _sponsorKey,  _sponsorRateKey);
        address[] memory agentAccountKeys = sponsorRateRec.agentAccountKeys;
        return agentAccountKeys;
    }

    /// @notice Returns Agent record
    /// @param _patronKey account key
    /// @param _sponsorKey sponsor account key
    /// @param _sponsorRateKey sponsor rate
    /// @param _agentKey agent record key to be returned
    function getAgentRecordByKeys(address _patronKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey) internal view onlyOwnerOrRootAdmin(_patronKey) returns (AgentStruct storage) {
        SponsorRateStruct storage sponsorRateRec = getSponsorRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey);
        AgentStruct storage sponsorAgentRec = sponsorRateRec.agentMap[_agentKey];
        return sponsorAgentRec;
     }

    /// @notice Total Coin Staked Rates Sponsored
    /// @param _patronKey account key
    /// @param _sponsorKey sponsor account key
    /// @param _sponsorRateKey sponsor rate
    /// @param _agentKey agent record key to be returned
    function getAgentTotalSponsored(address _patronKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (uint) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey);
        // console.log("Agents.sol:agentRec.stakedSPCoins  = ", agentRec.stakedSPCoins);
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

    /// @notice Remove all sponsorship relationships for Patron and Sponsor accounts
    /// @param _patronKey Patron key containing the Sponsor relationship
    /// @param _sponsorKey Sponsor to be removed from the Sponsor relationship
    function deletePatronSponsorRecord(address _patronKey, address _sponsorKey)  
        public onlyOwnerOrRootAdmin(_patronKey)
        accountExists(_patronKey)
        accountExists(_sponsorKey)
        nonRedundantSponsor ( _patronKey,  _sponsorKey) {
    
        AccountStruct storage patronAccountRec = accountMap[_patronKey];
        SponsorStruct storage sponsorRec = patronAccountRec.sponsorMap[_sponsorKey];
        uint256 totalSponsoed = sponsorRec.stakedSPCoins;

        // console.log("BEFORE patronAccountRec.balanceOf     = ", patronAccountRec.balanceOf);
        // console.log("BEFORE patronAccountRec.stakedSPCoins = ", patronAccountRec.stakedSPCoins);
        // console.log("BEFORE totalSponsoed                   = ", totalSponsoed);
        patronAccountRec.balanceOf += totalSponsoed;
        patronAccountRec.stakedSPCoins -= totalSponsoed;
        // console.log("AFTER patronAccountRec.balanceOf     = ", patronAccountRec.balanceOf);
        // console.log("AFTER patronAccountRec.stakedSPCoins = ", patronAccountRec.stakedSPCoins);

        address[] storage patronSponsorKeys = patronAccountRec.sponsorAccountKeys;
        if (deleteAccountRecordFromSearchKeys(_sponsorKey, patronSponsorKeys)) {
            mapping(address => SponsorStruct) storage sponsorMap = patronAccountRec.sponsorMap;
            SponsorStruct storage sponsorAccountRec = sponsorMap[_sponsorKey];
            deleteSponsorRecord(sponsorAccountRec);
        }
    }

    function deleteSponsorRecord(SponsorStruct storage sponsorAccountRec) internal {
        uint256[] storage sponsorRateKeys = sponsorAccountRec.sponsorRateKeys;
        uint i = sponsorRateKeys.length - 1;
        for (i; i >=0; i--) {
            // console.log("====deleteSponsorRecord: sponsorRateKeys[", i, "] ", sponsorRateKeys[i]);
            uint256 sponsorRateKey = sponsorRateKeys[i];
            SponsorRateStruct storage sponsorRateRec = sponsorAccountRec.sponsorRateMap[sponsorRateKey];
            deleteSponsorRateRecord(sponsorRateRec);
            sponsorRateKeys.pop();
            if (i == 0)
              break;
        }
//        delete sponsorAccountRec;
    }

    // Delete sponsor rate list.
    function deleteSponsorRateRecord(SponsorRateStruct storage sponsorRateRec) internal {
        address[] storage agentAccountKeys = sponsorRateRec.agentAccountKeys;
        uint i = agentAccountKeys.length - 1;
        for (i; i >= 0; i--) {
            // console.log("====deleteSponsorRateRecord: Found agentAccountKey[", i, "] ", agentAccountKeys[i]);
            address agentAccountKey = agentAccountKeys[i];
            AgentStruct storage agentRec = sponsorRateRec.agentMap[agentAccountKey];
            deleteAgentRecord(agentRec);
            agentAccountKeys.pop();
            if (i == 0)
              break;
        }
        // delete sponsorRateRec;
    }

/* *** VERY IMPORTANT, FIX DELETE RECORDS */
    function deleteAgentRecord (AgentStruct storage agentRec) internal {
        uint256[] storage agentRateKeys = agentRec.agentRateKeys;
        uint i = agentRateKeys.length - 1;
        for (i; i >= 0; i--) {
            // console.log("====deleteAgentRecord: Found agentRateKeys[", i, "] ", agentRateKeys[i]);
            uint256 agentRateKey = agentRateKeys[i];
            AgentRateStruct storage agentRateRec = agentRec.agentRateMap[agentRateKey];
            deleteAgentRateRecord(agentRateRec);
            agentRateKeys.pop();
            if (i == 0)
              break;
        }
        // delete agentRec;
    }

    // Delete sponsor rate list.
    function deleteAgentRateRecord(AgentRateStruct storage agentRateRec) internal {
        TransactionStruct[] storage transactionList = agentRateRec.transactionList;
        for (uint i=0; i< transactionList.length; i++) { 
            // console.log("====deleteAgentRateRecord: Deleting transactionList[", i, "].quantity ", transactionList[i].quantity);
            delete transactionList[i];
            transactionList.pop();
        }
        // delete agentRateRec;
    }
}
