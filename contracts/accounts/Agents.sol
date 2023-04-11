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
            sponsorAccount.agentAccountKeys.push(_agentKey);
            agentAccount.parentSponsorAccountKeys.push(_sponsorKey);
            sponsorRateRecord.agentAccountKeys.push(_agentKey);
        }
    }

    /// @notice retreives the sponsor array records from a specific account address.
    /// @param _patronKey patron Key to retrieve the sponsor list
    /// @param _sponsorKey sponsor Key to retrieve the agent list
    function getAgentRecordKeys(address _patronKey, address _sponsorKey, uint256 _sponsorRateKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (address[] memory) {
        SponsorRateStruct storage sponsorRateRecord = getSponsorRateRecordByKeys(_patronKey, _sponsorKey,  _sponsorRateKey);
        address[] memory agentAccountKeys = sponsorRateRecord.agentAccountKeys;
        return agentAccountKeys;
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

    /// @notice Remove all sponsorship relationships for Patron and Sponsor accounts
    /// @param _patronKey Patron key containing the Sponsor relationship
    /// @param _sponsorKey Sponsor to be removed from the Sponsor relationship
    function deletePatronSponsorRecord(address _patronKey, address _sponsorKey)  
        public onlyOwnerOrRootAdmin(_patronKey)
        accountExists(_patronKey)
        accountExists(_sponsorKey)
        nonRedundantSponsor ( _patronKey,  _sponsorKey) {
    
        AccountStruct storage patronAccount = accountMap[_patronKey];

        address[] storage patronSponsorKeys = patronAccount.sponsorAccountKeys;
        if (deleteAccountRecordFromSearchKeys(_sponsorKey, patronSponsorKeys)) {
            SponsorStruct storage sponsorRecord = patronAccount.sponsorMap[_sponsorKey];
            deleteSponsorRecord(sponsorRecord);

            address[] storage patronAccountList = accountMap[_sponsorKey].patronAccountList;
            deleteAccountRecordFromSearchKeys(_sponsorKey, patronAccountList);

            uint256 totalSponsoed = sponsorRecord.stakedSPCoins;
            patronAccount.balanceOf += totalSponsoed;
            patronAccount.stakedSPCoins -= totalSponsoed;
        }
    }

    function deleteSponsorRecord(SponsorStruct storage _sponsorRecord) internal {

        // Delete Agent Rate Keys
        uint256[] storage sponsorRateKeys = _sponsorRecord.sponsorRateKeys;
        AccountStruct storage sponsorAccount = accountMap[_sponsorRecord.sponsorAccountKey];

        uint i = sponsorRateKeys.length - 1;
        for (i; i >=0; i--) {
            // console.log("====deleteSponsorRecord: sponsorRateKeys[", i, "] ", sponsorRateKeys[i]);
            uint256 sponsorRateKey = sponsorRateKeys[i];
            SponsorRateStruct storage sponsorRateRecord = _sponsorRecord.sponsorRateMap[sponsorRateKey];

            deletesponsorRateRecord(sponsorAccount, sponsorRateRecord);
            sponsorRateKeys.pop();
            if (i == 0)
              break;
        }
//        delete _sponsorRecord;
    }

    // Delete sponsor rate list.
    function deletesponsorRateRecord(AccountStruct storage sponsorAccount, SponsorRateStruct storage sponsorRateRecord) internal {
        address[] storage agentAccountKeys = sponsorRateRecord.agentAccountKeys;
        uint i = agentAccountKeys.length - 1;
        for (i; i >= 0; i--) {
            // console.log("====deletesponsorRateRecord: Found agentAccountKey[", i, "] ", agentAccountKeys[i]);
            address agentAccountKey = agentAccountKeys[i];
            AgentStruct storage agentRec = sponsorRateRecord.agentMap[agentAccountKey];
            AccountStruct storage agentAccount = accountMap[agentAccountKey];

            console.log("***** Deleting sponsorAccount.accountKey ", sponsorAccount.accountKey,
             "From agentRec.agentAccountKey ", agentRec.agentAccountKey);
            deleteAccountRecordFromSearchKeys(sponsorAccount.accountKey, agentAccount.parentSponsorAccountKeys);

            deleteAgentRecord(agentRec);
            agentAccountKeys.pop();
            if (i == 0)
              break;
        }
        // delete sponsorRateRecord;
    }

/* *** VERY IMPORTANT, FIX DELETE RECORDS */
    function deleteAgentRecord (AgentStruct storage agentRec) internal {
        uint256[] storage agentRateKeys = agentRec.agentRateKeys;
        uint i = agentRateKeys.length - 1;
        for (i; i >= 0; i--) {
            // console.log("====deleteAgentRecord: Found agentRateKeys[", i, "] ", agentRateKeys[i]);
            uint256 agentRateKey = agentRateKeys[i];
            AgentRateStruct storage agentRateRecord= agentRec.agentRateMap[agentRateKey];
            deleteAgentRateRecord(agentRateRecord);
            agentRateKeys.pop();
            if (i == 0)
              break;
        }
        // delete agentRec;
    }

    // Delete sponsor rate list.
    function deleteAgentRateRecord(AgentRateStruct storage agentRateRecord) internal {
        TransactionStruct[] storage transactionList = agentRateRecord.transactionList;
        for (uint i=0; i< transactionList.length; i++) { 
            // console.log("====deleteAgentRateRecord: Deleting transactionList[", i, "].quantity ", transactionList[i].quantity);
            delete transactionList[i];
            transactionList.pop();
        }
        // delete agentRateRecord;
    }
}
