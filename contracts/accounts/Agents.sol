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
        addAccountRecord(_agentKey);

        AccountStruct storage accountSponsorRec = accountMap[_sponsorKey];
        AccountStruct storage accountAgentRec = accountMap[_agentKey];
        SponsorStruct storage patronSponsorRec = getSponsorRecordByKeys(_patronKey, _sponsorKey);
        SponsorRateStruct storage sponsorRateRec = getSponsorRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey);
        AgentStruct storage  sponsorAgentRec = getAgentRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey);
        if (!sponsorAgentRec.inserted) {
            sponsorAgentRec.insertionTime = block.timestamp;
            sponsorAgentRec.agentAccountKey = _agentKey;
            sponsorAgentRec.inserted = true;
            accountSponsorRec.agentAccountKeys.push(_agentKey);
            accountAgentRec.parentSponsorAccountKeys.push(_sponsorKey);
            sponsorRateRec.agentAccountKeys.push(_agentKey);
        }
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
        uint256 totalSponsoed = sponsorRec.stakedAgentsSponsored;

        // console.log("BEFORE patronAccountRec.balanceOf     = ", patronAccountRec.balanceOf);
        // console.log("BEFORE patronAccountRec.stakedSPCoins = ", patronAccountRec.stakedSPCoins);
        // console.log("BEFORE totalSponsoed                   = ", totalSponsoed);
        patronAccountRec.balanceOf += totalSponsoed;
        patronAccountRec.stakedSPCoins -= totalSponsoed;
        // console.log("AFTER patronAccountRec.balanceOf     = ", patronAccountRec.balanceOf);
        // console.log("AFTER patronAccountRec.stakedSPCoins = ", patronAccountRec.stakedSPCoins);

        address[] storage patronSponsorKeys = patronAccountRec.sponsorAccount2Keys;
        if (deleteAccountRecordFromSearchKeys(_sponsorKey, patronSponsorKeys)) {
            deleteSponsorRecord(_patronKey, _sponsorKey);
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

    function deleteSponsorRecord(address _patronKey, address _sponsorKey) internal {
        AccountStruct storage sponsorAccountRec = accountMap[_sponsorKey];
        address[] storage patronAccountKeys = sponsorAccountRec.patronAccountKeys;
        if (deleteAccountRecordFromSearchKeys(_patronKey, patronAccountKeys)) {
            deletePatronSponsorAgentRecords (_patronKey, _sponsorKey);
        }
        // Optional        delete accountMap[_sponsorKey];
    }

    function deletePatronSponsorAgentRecords (address _patronKey, address _sponsorKey) internal {
        // Get The Patron Account Record and Remove from the Child Sponsor Relationship account list
/* *** VERY IMPORTANT, FIX DELETE RECORDS
        AccountStruct storage patronAccountRec = accountMap[_patronKey];
        mapping(address => SponsorStruct) storage sponsorMap = patronAccountRec.sponsorMap;

        // console.log("deleteAgentsFromSponsor(_sponsorKey, sponsorMap)");
        mapping(address => AgentStruct) storage agentMap = sponsorMap[_sponsorKey].agentMap;
        address[] storage agentAccountKeys = sponsorMap[_sponsorKey].agentAccountKeys;

        uint i = agentAccountKeys.length - 1;
        // console.log("*** BEFORE AGENT DELETE agentAccountKeys.length = ", agentAccountKeys.length);
         for (i; i >= 0; i--) {
            deletePatronSponsorAgentRecord(_sponsorKey, agentAccountKeys[i]); 
            // console.log("***** Deleting agentAccountKeys ", agentStruct.agentAccountKey);
            delete agentMap[agentAccountKeys[i]];
            delete agentAccountKeys[i];
            agentAccountKeys.pop();
            if (i == 0)
               break;
        }
        ***/
    }

    function deletePatronSponsorAgentRecord (address _sponsorKey, address _agentKey) public {
        // console.log("Deleting Agent Key ", _agentKey, "from Sponsor child Agent Keys ", _sponsorKey); 
        AccountStruct storage accountSponsorRec = accountMap[_sponsorKey];
        address[] storage AgentKeys = accountSponsorRec.agentAccountKeys;
        if (deleteAccountRecordFromSearchKeys(_agentKey, AgentKeys)) {
            deleteSponsorParentFromAgent (_sponsorKey, _agentKey);
        }
    }

    function deleteSponsorParentFromAgent (address _sponsorKey, address _agentKey) internal {
        // console.log("Deleting Sponsor Key ", _sponsorKey, "from Agent Parent Sponsor Keys ", _agentKey); 
        AccountStruct storage accountAgentRec = accountMap[_agentKey];

        address[] storage parentSponsorKeys = accountAgentRec.parentSponsorAccountKeys;
        deleteAccountRecordFromSearchKeys(_sponsorKey, parentSponsorKeys);
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
        // console.log("Agents.sol:agentRec.stakedRatesSponsored  = ", agentRec.stakedRatesSponsored);
        return agentRec.stakedRatesSponsored; 
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
