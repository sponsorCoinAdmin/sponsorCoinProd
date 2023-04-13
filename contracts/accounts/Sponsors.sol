// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./Accounts.sol";

contract Sponsors is Accounts {
        constructor() {
    }

    /// @notice Create Patron and Sponsor accounts if they do not exist
    /// @notice Relate Patron and Sponsor accounts for POS sharing
    /// @param _patronKey public patron key to get sponsor array
    /// @param _sponsorKey new sponsor to add to account list
    function addPatronSponsor(address _patronKey, address _sponsorKey) 
        public onlyOwnerOrRootAdmin(_patronKey)
        nonRedundantSponsor ( _patronKey,  _sponsorKey) {
        SponsorStruct storage sponsorRecord = getSponsorRecordByKeys(_patronKey, _sponsorKey);
        if (!sponsorRecord.inserted) {
            addAccountRecord(_patronKey);
            addAccountRecord(_sponsorKey);
            AccountStruct storage patronAccount = accountMap[_patronKey];
            AccountStruct storage sponsorAccount = accountMap[_sponsorKey];
            sponsorRecord.insertionTime = block.timestamp;
            sponsorRecord.patronKey = _patronKey;
            sponsorRecord.sponsorAccountKey = _sponsorKey;
            sponsorRecord.stakedSPCoins = 0; // Coins not owned but Sponsored
            sponsorRecord.inserted = true;
            patronAccount.sponsorAccountList.push(_sponsorKey);
            sponsorAccount.patronAccountList.push(_patronKey);
        }
    }

    /*
    /// @notice determines if agent address is inserted in account.sponsor.agent.map
    /// @param _patronKey public account key validate Insertion
    /// @param _sponsorKey public sponsor account key validate Insertion
    /// @param _sponsorRateKey public agent account key validate Insertion
    function isAgentRateInserted(address _patronKey,address _sponsorKey, uint _sponsorRateKey, address _agentKey) public onlyOwnerOrRootAdmin(_patronKey) view returns (bool) {
        return getAgentRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey).inserted;
    }
*/

    /// @notice determines if sponsor address is inserted in account.sponsor.map
    /// @param _patronKey public account key validate Insertion
    /// @param _sponsorKey public sponsor account key validate Insertion
    function isSponsorInserted(address _patronKey, address _sponsorKey) public onlyOwnerOrRootAdmin(_patronKey) view returns (bool) {
        return getSponsorRecordByKeys(_patronKey, _sponsorKey).inserted;
    }
    function getSponsorRecordByKeys(address _patronKey, address _sponsorKey) internal view onlyOwnerOrRootAdmin(_patronKey) returns (SponsorStruct storage) {
        AccountStruct storage accountRec = accountMap[_patronKey];
        SponsorStruct storage sponsorRecord = accountRec.sponsorMap[_sponsorKey];
       return sponsorRecord;
    }

    function serializeSponsorRecordStr(address _patronKey, address _sponsorKey) public view returns (string memory) {
        SponsorStruct storage sponsorRecord =  getSponsorRecordByKeys(_patronKey, _sponsorKey);
        string memory sponsorRecordStr = toString(sponsorRecord.insertionTime);
        string memory stakedSPCoinsStr = toString(sponsorRecord.stakedSPCoins);
        sponsorRecordStr = concat(sponsorRecordStr, ",", stakedSPCoinsStr);
        return sponsorRecordStr;
    }

    //////////////////// NESTED AGENT METHODS /////////////////////////

    /// @notice retreives the sponsor array records from a specific account address.
    /// @param _patronKey patron Key to retrieve the sponsor list
    /// @param _sponsorKey sponsor Key to retrieve the sponsor list
    function getSponsorRateKeys(address _patronKey, address _sponsorKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (uint[] memory) {
        SponsorStruct storage sponsorRecord = getSponsorRecordByKeys(_patronKey, _sponsorKey);
        uint[] memory sponsorRateKeys = sponsorRecord.sponsorRateKeys;
// console.log("AGENTS.SOL:addSponsorAgent: _patronKey, _sponsorKey, _sponsorRateKey, _sponsorKey = " , _patronKey, _sponsorKey, _sponsorRateKey, _sponsorKey);
// console.log("AGENTS.SOL:addSponsorAgent:sponsorRecord.sponsorAccountKey = " , sponsorRecord.sponsorAccountKey);
// console.log("AGENTS.SOL:getAgentRateKeys:sponsorRateKeys.length = ",sponsorRateKeys.length);
        return sponsorRateKeys;
    }

    /*
    ///////////////////// DELETE SPONSOR METHODS ////////////////////////
    modifier sponsorExists (address _patronKey, address _sponsorKey) {
        require (isSponsorInserted(_patronKey, _sponsorKey) , "_sponsorKey not found)");
        _;
    }
*/
}
