// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
/// @title ERC20 Contract
import "./Accounts.sol";

contract Sponsors is Accounts {
        constructor() {
    }

    /// @notice insert address for later recall
    /// @param _accountKey public account key to get sponsor array
    /// @param _sponsorKey new sponsor to add to account list
    function insertAccountSponsor(address _accountKey, address _sponsorKey) public onlyOwnerOrRootAdmin(_accountKey) {
        addNetworkAccount(_accountKey);
        addNetworkAccount(_sponsorKey);
        AccountStruct storage parentAccountRec = accountMap[_accountKey];
        AccountStruct storage sponsorAccountRec = accountMap[_sponsorKey];
        SponsorStruct storage sponsorRec = getSponsorRec(_accountKey, _sponsorKey);
        if (!sponsorRec.inserted) {
            sponsorRec.index = parentAccountRec.sponsorKeys.length;
            sponsorRec.insertionTime = block.timestamp;
            sponsorRec.sponsor = _sponsorKey;
            sponsorRec.inserted = true;
            parentAccountRec.sponsorKeys.push(_sponsorKey);
            sponsorAccountRec.parentAccountKeys.push(_accountKey);
        }
    }

    /// @notice determines if sponsor address is inserted in account.sponsor.map
    /// @param _accountKey public account key validate Insertion
    /// @param _sponsorKey public sponsor account key validate Insertion
    function isSponsorInserted(address _accountKey, address _sponsorKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (bool) {
        return getSponsorRec(_accountKey, _sponsorKey).inserted;
    }

    /// @notice retreives the array index of a specific address.
    /// @param _accountKey public account key to set new balance
    function getSponsorIndex(address _accountKey, address _sponsorKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (uint) {
        if (isSponsorInserted(_accountKey, _sponsorKey))
            return accountMap[_accountKey].sponsorMap[_sponsorKey].index;
        else
            return 0;
    }

    function getSponsorInsertionTime(address _accountKey, address _sponsorKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (uint) {
        if (isSponsorInserted(_accountKey, _sponsorKey))
            return accountMap[_accountKey].sponsorMap[_sponsorKey].insertionTime;
        else
            return 0;
    }

    function getValidSponsorRec(address _accountKey, address _sponsorKey) internal onlyOwnerOrRootAdmin(_accountKey) returns (SponsorStruct storage) {
        if (!isSponsorInserted(_accountKey, _sponsorKey)) {
            insertAccountSponsor(_accountKey, _sponsorKey);
        }
        return getSponsorRec(_accountKey, _sponsorKey);
     }

     function getSponsorRec(address _accountKey, address _sponsorKey) internal view onlyOwnerOrRootAdmin(_accountKey) returns (SponsorStruct storage) {
        AccountStruct storage accountRec = accountMap[_accountKey];
        SponsorStruct storage accountSponsor = accountRec.sponsorMap[_sponsorKey];
       return accountSponsor;
     }

    /// @notice get address for an account sponsor
    /// @param _accountKey public account key to get sponsor array
    /// @param _sponsorIdx new sponsor to add to account list
    function getSponsorKeyAddress(address _accountKey, uint _sponsorIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        AccountStruct storage accountRec = accountMap[_accountKey];
        address sponsor = accountRec.sponsorKeys[_sponsorIdx];
        return sponsor;
    }

    /// @notice retreives the sponsor array record size a specific address.
    /// @param _accountKey public account key to get Sponsor Record Length
    function getSponsorRecordCount(address _accountKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (uint) {
        return getSponsorList(_accountKey).length;
    }

    /// @notice retreives the sponsor array record size a specific address.
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAccountSponsorCount(address _accountKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (uint) {
            AccountStruct storage accountRec = accountMap[_accountKey];
        return accountRec.sponsorKeys.length;
    }

    /// @notice retreives the sponsors of a specific address.
    /// @param _accountKey public account key to set new balance
    function getSponsorList(address _accountKey) internal onlyOwnerOrRootAdmin(_accountKey) view returns (address[] memory) {
        AccountStruct storage account = accountMap[_accountKey];
        address[] storage sponsorKeys = account.sponsorKeys;
        return sponsorKeys;
    }

}
