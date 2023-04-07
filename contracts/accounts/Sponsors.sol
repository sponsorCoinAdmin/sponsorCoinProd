// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./Accounts.sol";

contract Sponsors is Accounts {
        constructor() {
    }

    /// @notice Create Patron and Sponsor accounts if they do not exist
    /// @notice Relate Patron and Sponsor accounts for POS sharing
    /// @param _patreonKey public patreon key to get sponsor array
    /// @param _sponsorKey new sponsor to add to account list
    function addPatronSponsor(address _patreonKey, address _sponsorKey) 
        public onlyOwnerOrRootAdmin(_patreonKey)
        nonRedundantSponsor ( _patreonKey,  _sponsorKey) {
        addAccountRecord(_patreonKey);
        addAccountRecord(_sponsorKey);
        AccountStruct storage patreonAccountRec = accountMap[_patreonKey];
        AccountStruct storage sponsorAccountRec = accountMap[_sponsorKey];
        SponsorStruct storage sponsorRec = getSponsorRecordByKeys(_patreonKey, _sponsorKey);
        if (!sponsorRec.inserted) {
            // sponsorRec.index = patreonAccountRec.agentRecKeys.length;
            sponsorRec.insertionTime = block.timestamp;
            sponsorRec.sponsorAccountKey = _sponsorKey;
            sponsorRec.totalAgentsSponsored = 0; // Coins not owned but Sponsored
            sponsorRec.inserted = true;
            patreonAccountRec.agentRecKeys.push(_sponsorKey);
            sponsorAccountRec.patreonAccountKeys.push(_patreonKey);
        }
    }

    /*
    /// @notice determines if agent address is inserted in account.sponsor.agent.map
    /// @param _patreonKey public account key validate Insertion
    /// @param _sponsorKey public sponsor account key validate Insertion
    /// @param _sponsorRateKey public agent account key validate Insertion
    function isAgentRateInserted(address _patreonKey,address _sponsorKey, uint _sponsorRateKey, address _agentKey) public onlyOwnerOrRootAdmin(_patreonKey) view returns (bool) {
        return getAgentRecordByKeys(_patreonKey, _sponsorKey, _sponsorRateKey, _agentKey).inserted;
    }
*/

    /// @notice determines if sponsor address is inserted in account.sponsor.map
    /// @param _patreonKey public account key validate Insertion
    /// @param _sponsorKey public sponsor account key validate Insertion
    function isSponsorInserted(address _patreonKey, address _sponsorKey) public onlyOwnerOrRootAdmin(_patreonKey) view returns (bool) {
        return getSponsorRecordByKeys(_patreonKey, _sponsorKey).inserted;
    }
    function getSponsorRecordByKeys(address _patreonKey, address _sponsorKey) internal view onlyOwnerOrRootAdmin(_patreonKey) returns (SponsorStruct storage) {
        AccountStruct storage accountRec = accountMap[_patreonKey];
        SponsorStruct storage accountSponsor = accountRec.sponsorMap[_sponsorKey];
       return accountSponsor;
    }

    /*
    /// @notice get address for an account sponsor
    /// @param _patreonKey public account key to get sponsor array
    /// @param _sponsorIdx new sponsor to add to account list
    function getPatronSponsorKeyByIndex(address _patreonKey, uint _sponsorIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        AccountStruct storage accountRec = accountMap[_patreonKey];
        address sponsor = accountRec.agentRecKeys[_sponsorIdx];
        return sponsor;
    }
*/
    //////////////////// NESTED AGENT METHODS /////////////////////////

    function getAgentRecordByKeys(address _patreonKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey) internal view onlyOwnerOrRootAdmin(_patreonKey) returns (AgentStruct storage) {
        SponsorStruct storage sponsorRec = getSponsorRecordByKeys(_patreonKey, _sponsorKey);
        AgentStruct storage sponsorAgentRec = sponsorRec.agentMap[_agentKey];
        return sponsorAgentRec;
     }

    function getTotalSponsoredAmount(address _patreonKey, address _sponsorKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (uint) {
        SponsorStruct storage sponsorRec = getSponsorRecordByKeys(_patreonKey, _sponsorKey);
        // console.log("Sponsor.sol:sponsorRec.totalAgentsSponsored  = ", sponsorRec.totalAgentsSponsored);
        return sponsorRec.totalAgentsSponsored;
    }

    /// @notice retreives the sponsor array records from a specific account address.
    /// @param _patreonKey patreon Key to retrieve the sponsor list
    /// @param _sponsorKey sponsor Key to retrieve the agent list
    function getAgentRecordKeys(address _patreonKey, address _sponsorKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (address[] memory) {
        SponsorStruct storage sponsorRec = getSponsorRecordByKeys(_patreonKey, _sponsorKey);
        address[] memory agentAccountKeys = sponsorRec.agentAccountKeys;
        return agentAccountKeys;
    }

    /// @notice retreives the sponsor array records from a specific account address.
    /// @param _patreonKey patreon Key to retrieve the sponsor list
    /// @param _sponsorKey sponsor Key to retrieve the sponsor list
    function getSponsorRateKeys(address _patreonKey, address _sponsorKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (uint[] memory) {
        SponsorStruct storage sponsorRec = getSponsorRecordByKeys(_patreonKey, _sponsorKey);
        uint[] memory sponsorRateKeys = sponsorRec.sponsorRateKeys;
// console.log("AGENTS.SOL:addSponsorAgent: _patreonKey, _sponsorKey, _sponsorRateKey, _sponsorKey = " , _patreonKey, _sponsorKey, _sponsorRateKey, _sponsorKey);
// console.log("AGENTS.SOL:addSponsorAgent:sponsorRec.sponsorAccountKey = " , sponsorRec.sponsorAccountKey);
// console.log("AGENTS.SOL:getAgentRateKeys:sponsorRateKeys.length = ",sponsorRateKeys.length);
        return sponsorRateKeys;
    }

    /*
    ///////////////////// DELETE SPONSOR METHODS ////////////////////////
    modifier sponsorExists (address _patreonKey, address _sponsorKey) {
        require (isSponsorInserted(_patreonKey, _sponsorKey) , "_sponsorKey not found)");
        _;
    }
*/
}
