// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./SponsorRates.sol";
import "../utils/StructSerialization.sol";

contract Agents is SponsorRates {
        constructor(){
    }

    /// @notice insert sponsors Agent
    /// @param _patreonKey public Sponsor Coin Account Key
    /// @param _sponsorKey public account key to get sponsor array
    /// @param _agentKey new sponsor to add to account list
    function addSponsorAgent(address _patreonKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey)
            public onlyOwnerOrRootAdmin(msg.sender) 
            nonRedundantAgent ( _patreonKey, _sponsorKey, _agentKey) {
        addSponsorRate(_patreonKey, _sponsorKey, _sponsorRateKey);
        addAccountRecord(_agentKey);

        AccountStruct storage accountSponsorRec = accountMap[_sponsorKey];
        AccountStruct storage accountAgentRec = accountMap[_agentKey];
        SponsorStruct storage patreonSponsorRec = getSponsorRecordByKeys(_patreonKey, _sponsorKey);
        SponsorRateStruct storage sponsorRateRec = getSponsorRateRecordByKeys(_patreonKey, _sponsorKey, _sponsorRateKey);
        AgentStruct storage  sponsorAgentRec = getAgentRecordByKeys(_patreonKey, _sponsorKey, _sponsorRateKey, _agentKey);
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
    /// @param _patreonKey Patron key containing the Sponsor relationship
    /// @param _sponsorKey Sponsor to be removed from the Sponsor relationship
    function deletePatronSponsorRecord(address _patreonKey, address _sponsorKey)  
        public onlyOwnerOrRootAdmin(_patreonKey)
        accountExists(_patreonKey)
        accountExists(_sponsorKey)
        nonRedundantSponsor ( _patreonKey,  _sponsorKey) {
    
        AccountStruct storage patreonAccountRec = accountMap[_patreonKey];
        SponsorStruct storage sponsorRec = patreonAccountRec.sponsorMap[_sponsorKey];
        uint256 totalSponsoed = sponsorRec.totalAgentsSponsored;

        // console.log("BEFORE patreonAccountRec.balanceOf     = ", patreonAccountRec.balanceOf);
        // console.log("BEFORE patreonAccountRec.stakedSPCoins = ", patreonAccountRec.stakedSPCoins);
        // console.log("BEFORE totalSponsoed                   = ", totalSponsoed);
        patreonAccountRec.balanceOf += totalSponsoed;
        patreonAccountRec.stakedSPCoins -= totalSponsoed;
        // console.log("AFTER patreonAccountRec.balanceOf     = ", patreonAccountRec.balanceOf);
        // console.log("AFTER patreonAccountRec.stakedSPCoins = ", patreonAccountRec.stakedSPCoins);

        address[] storage patreonSponsorKeys = patreonAccountRec.sponsorAccount2Keys;
        if (deleteAccountRecordFromSearchKeys(_sponsorKey, patreonSponsorKeys)) {
            deleteSponsorRecord(_patreonKey, _sponsorKey);
        }
    }

    /// @notice retreives the sponsor array records from a specific account address.
    /// @param _patreonKey patreon Key to retrieve the sponsor list
    /// @param _sponsorKey sponsor Key to retrieve the agent list
    function getAgentRecordKeys(address _patreonKey, address _sponsorKey, uint256 _sponsorRateKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (address[] memory) {
        SponsorRateStruct storage sponsorRateRec = getSponsorRateRecordByKeys(_patreonKey, _sponsorKey,  _sponsorRateKey);
        address[] memory agentAccountKeys = sponsorRateRec.agentAccountKeys;
        return agentAccountKeys;
    }

    function deleteSponsorRecord(address _patreonKey, address _sponsorKey) internal {
        AccountStruct storage sponsorAccountRec = accountMap[_sponsorKey];
        address[] storage patreonAccountKeys = sponsorAccountRec.patreonAccountKeys;
        if (deleteAccountRecordFromSearchKeys(_patreonKey, patreonAccountKeys)) {
            deletePatronSponsorAgentRecords (_patreonKey, _sponsorKey);
        }
        // Optional        delete accountMap[_sponsorKey];
    }

    function deletePatronSponsorAgentRecords (address _patreonKey, address _sponsorKey) internal {
        // Get The Patron Account Record and Remove from the Child Sponsor Relationship account list
/* *** VERY IMPORTANT, FIX DELETE RECORDS
        AccountStruct storage patreonAccountRec = accountMap[_patreonKey];
        mapping(address => SponsorStruct) storage sponsorMap = patreonAccountRec.sponsorMap;

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
    /// @param _patreonKey account key
    /// @param _sponsorKey sponsor account key
    /// @param _sponsorRateKey sponsor rate
    /// @param _agentKey agent record key to be returned
    function getAgentRecordByKeys(address _patreonKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey) internal view onlyOwnerOrRootAdmin(_patreonKey) returns (AgentStruct storage) {
        SponsorRateStruct storage sponsorRateRec = getSponsorRateRecordByKeys(_patreonKey, _sponsorKey, _sponsorRateKey);
        AgentStruct storage sponsorAgentRec = sponsorRateRec.agentMap[_agentKey];
        return sponsorAgentRec;
     }

    /// @notice Total Coin Staked Rates Sponsored
    /// @param _patreonKey account key
    /// @param _sponsorKey sponsor account key
    /// @param _sponsorRateKey sponsor rate
    /// @param _agentKey agent record key to be returned
    function getAgentTotalSponsored(address _patreonKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (uint) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_patreonKey, _sponsorKey, _sponsorRateKey, _agentKey);
        // console.log("Agents.sol:agentRec.totalRatesSponsored  = ", agentRec.totalRatesSponsored);
        return agentRec.totalRatesSponsored; 
    }

    /// @notice retreives the sponsor array records from a specific account address.
    /// @param _patreonKey patreon Key to retrieve the sponsor list
    /// @param _sponsorKey sponsor Key to retrieve the agent list
    /// @param _agentKey agent Key to retrieve the agentate list
    function getAgentRateKeys(address _patreonKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (uint[] memory) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_patreonKey, _sponsorKey, _sponsorRateKey, _agentKey);
        uint[] memory agentRateKeys = agentRec.agentRateKeys;
// console.log("AGENTS.SOL:addSponsorAgent: _patreonKey, _sponsorKey, _sponsorRateKey, _agentKey = " , _patreonKey, _sponsorKey, _sponsorRateKey, _agentKey);
// console.log("AGENTS.SOL:addSponsorAgent:agentRec.agentAccountKey = " , agentRec.agentAccountKey);
// console.log("AGENTS.SOL:getAgentRateKeys:agentRateKeys.length = ",agentRateKeys.length);
        return agentRateKeys;
    }
}
