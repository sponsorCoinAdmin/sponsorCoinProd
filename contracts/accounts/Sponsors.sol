// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "./Accounts.sol";

contract Sponsors is Accounts {
        constructor() {
    }

    /// @notice Create Patreon and Sponsor accounts if they do not exist
    /// @notice Relate Patreon and Sponsor accounts for POS sharing
    /// @param _patreonKey public patreon key to get sponsor array
    /// @param _sponsorKey new sponsor to add to account list
    function addPatreonSponsor(address _patreonKey, address _sponsorKey) 
        public onlyOwnerOrRootAdmin(_patreonKey)
        nonRedundantSponsor ( _patreonKey,  _sponsorKey) {
        addAccountRecord(_patreonKey);
        addAccountRecord(_sponsorKey);
        AccountStruct storage patreonAccountRec = accountMap[_patreonKey];
        AccountStruct storage sponsorAccountRec = accountMap[_sponsorKey];
        SponsorStruct storage patreonSponsorRec = getPatreonSponsorRecByKeys(_patreonKey, _sponsorKey);
        if (!patreonSponsorRec.inserted) {
            patreonSponsorRec.index = patreonAccountRec.accountSponsorKeys.length;
            patreonSponsorRec.insertionTime = block.timestamp;
            patreonSponsorRec.sponsorAccountKey = _sponsorKey;
            patreonSponsorRec.totalSponsored = 0; // Coins not owned but Sponsored
            patreonSponsorRec.inserted = true;
            patreonAccountRec.accountSponsorKeys.push(_sponsorKey);
            sponsorAccountRec.accountPatreonKeys.push(_patreonKey);
        }
    }

    /// @notice determines if sponsor address is inserted in account.sponsor.map
    /// @param _patreonKey public account key validate Insertion
    /// @param _sponsorKey public sponsor account key validate Insertion
    function isSponsorInserted(address _patreonKey, address _sponsorKey) public onlyOwnerOrRootAdmin(_patreonKey) view returns (bool) {
        return getPatreonSponsorRecByKeys(_patreonKey, _sponsorKey).inserted;
    }

    /// @notice retreives the array index of a specific address.
    // /// @param _patreonKey public patreon key to get sponsor array
    // function getPatreonSponsorIndex(address _patreonKey, address _sponsorKey) public onlyOwnerOrRootAdmin(_patreonKey) view returns (uint) {
    //     if (isSponsorInserted(_patreonKey, _sponsorKey))
    //         return accountMap[_patreonKey].sponsorMap[_sponsorKey].index;
    //     else
    //         return 0;
    // }

    function getSponsorInsertionTime(address _patreonKey, address _sponsorKey) public onlyOwnerOrRootAdmin(_patreonKey) view returns (uint) {
        if (isSponsorInserted(_patreonKey, _sponsorKey))
            return accountMap[_patreonKey].sponsorMap[_sponsorKey].insertionTime;
        else
            return 0;
    }

    function getPatreonSponsorRecByKeys(address _patreonKey, address _sponsorKey) internal view onlyOwnerOrRootAdmin(_patreonKey) returns (SponsorStruct storage) {
        AccountStruct storage accountRec = accountMap[_patreonKey];
        SponsorStruct storage accountSponsor = accountRec.sponsorMap[_sponsorKey];
       return accountSponsor;
    }

    /// @notice get address for an account sponsor
    /// @param _patreonKey public account key to get sponsor array
    /// @param _sponsorIdx new sponsor to add to account list
    function getPatreonSponsorKeyByIndex(address _patreonKey, uint _sponsorIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        AccountStruct storage accountRec = accountMap[_patreonKey];
        address sponsor = accountRec.accountSponsorKeys[_sponsorIdx];
        return sponsor;
    }

    //////////////////// NESTED AGENT METHODS /////////////////////////

    function getAgentRecordByKeys(address _patreonKey, address _sponsorKey, address _agentKey) internal view onlyOwnerOrRootAdmin(_patreonKey) returns (AgentStruct storage) {
        SponsorStruct storage sponsorRec = getPatreonSponsorRecByKeys(_patreonKey, _sponsorKey);
        AgentStruct storage sponsorAgentRec = sponsorRec.agentMap[_agentKey];
        return sponsorAgentRec;
     }

    /// @notice get address for an account sponsor
    /// @param _sponsorKey public account key to get agent array
    /// @param _agentIdx new agent to add to account list
    function getSponsorAgentKey(address _patreonKey, address _sponsorKey, uint _agentIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        address[] memory agentKeys = getAgentRecordKeys(_patreonKey, _sponsorKey);
        address agentAddress = agentKeys[_agentIdx];
        return agentAddress;
    }

    /// @notice retreives the sponsor array record size a specific address.
    /// @param _sponsorKey public account key to get Sponsor Record Length
    function getAgentRecordKeySize(address _patreonKey, address _sponsorKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (uint) {
        return getAgentRecordKeys(_patreonKey, _sponsorKey).length;
    }

    function getSponsorTotalSponsored(address _patreonKey, address _sponsorKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (uint) {
        SponsorStruct storage sponsorRec = getPatreonSponsorRecByKeys(_patreonKey, _sponsorKey);
        return sponsorRec.totalSponsored;
    }

    /// @notice retreives the sponsor array records from a specific account address.
    /// @param _patreonKey patreon Key to retrieve the sponsor list
    /// @param _sponsorKey sponsor Key to retrieve the agent list
    function getAgentRecordKeys(address _patreonKey, address _sponsorKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (address[] memory) {
        SponsorStruct storage sponsorRec = getPatreonSponsorRecByKeys(_patreonKey, _sponsorKey);
        address[] memory accountAgentKeys = sponsorRec.accountAgentKeys;
        return accountAgentKeys;
    }

    /*
    ///////////////////// DELETE SPONSOR METHODS ////////////////////////
    modifier sponsorExists (address _patreonKey, address _sponsorKey) {
        require (isSponsorInserted(_patreonKey, _sponsorKey) , "_sponsorKey not found)");
        _;
    }
*/
}
