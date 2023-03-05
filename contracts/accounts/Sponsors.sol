// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
/// @title ERC20 Contract
import "./Accounts.sol";

contract Sponsors is Accounts {
        constructor() {
    }

    /// @notice insert address for later recall
    /// @param _accountKey public account key to get sponsor array
    /// @param _sponsorAccountKey new sponsor to add to account list
    function insertAccountSponsor(address _accountKey, address _sponsorAccountKey) 
        public onlyOwnerOrRootAdmin(_accountKey)
        nonRedundantSponsor ( _accountKey,  _sponsorAccountKey) {
        addAccountRecord(_accountKey);
        addAccountRecord(_sponsorAccountKey);
        AccountStruct storage parentAccountRec = accountMap[_accountKey];
        AccountStruct storage sponsorAccountRec = accountMap[_sponsorAccountKey];
        SponsorStruct storage sponsorRec = getAccountSponsorRecByKey(_accountKey, _sponsorAccountKey);
        if (!sponsorRec.inserted) {
            sponsorRec.index = parentAccountRec.accountSponsorKeys.length;
            sponsorRec.insertionTime = block.timestamp;
            sponsorRec.sponsorAccountKey = _sponsorAccountKey;
            sponsorRec.inserted = true;
            parentAccountRec.accountSponsorKeys.push(_sponsorAccountKey);
            sponsorAccountRec.accountPatreonKeys.push(_accountKey);
        }
    }

    /// @notice determines if sponsor address is inserted in account.sponsor.map
    /// @param _accountKey public account key validate Insertion
    /// @param _sponsorAccountKey public sponsor account key validate Insertion
    function isSponsorInserted(address _accountKey, address _sponsorAccountKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (bool) {
        return getAccountSponsorRecByKey(_accountKey, _sponsorAccountKey).inserted;
    }

    /// @notice retreives the array index of a specific address.
    /// @param _accountKey public account key to set new balance
    function getAccountSponsorIndex(address _accountKey, address _sponsorAccountKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (uint) {
        if (isSponsorInserted(_accountKey, _sponsorAccountKey))
            return accountMap[_accountKey].sponsorMap[_sponsorAccountKey].index;
        else
            return 0;
    }

    function getSponsorInsertionTime(address _accountKey, address _sponsorAccountKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (uint) {
        if (isSponsorInserted(_accountKey, _sponsorAccountKey))
            return accountMap[_accountKey].sponsorMap[_sponsorAccountKey].insertionTime;
        else
            return 0;
    }

    function getValidSponsorRec(address _accountKey, address _sponsorAccountKey) internal onlyOwnerOrRootAdmin(_accountKey) returns (SponsorStruct storage) {
        if (!isSponsorInserted(_accountKey, _sponsorAccountKey)) {
            insertAccountSponsor(_accountKey, _sponsorAccountKey);
        }
        return getAccountSponsorRecByKey(_accountKey, _sponsorAccountKey);
     }

     function getAccountSponsorRecByKey(address _accountKey, address _sponsorAccountKey) internal view onlyOwnerOrRootAdmin(_accountKey) returns (SponsorStruct storage) {
        AccountStruct storage accountRec = accountMap[_accountKey];
        SponsorStruct storage accountSponsor = accountRec.sponsorMap[_sponsorAccountKey];
       return accountSponsor;
     }

    /// @notice get address for an account sponsor
    /// @param _accountKey public account key to get sponsor array
    /// @param _sponsorIdx new sponsor to add to account list
    function getAccountSponsorKeyByIndex(address _accountKey, uint _sponsorIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        AccountStruct storage accountRec = accountMap[_accountKey];
        address sponsor = accountRec.accountSponsorKeys[_sponsorIdx];
        return sponsor;
    }

    /// @notice retreives the sponsor array record size a specific address.
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAccountSponsorSize(address _accountKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (uint) {
        return getSponsorList(_accountKey).length;
    }

    /// @notice retreives the sponsors of a specific address.
    /// @param _accountKey public account key to set new balance
    function getSponsorList(address _accountKey) internal onlyOwnerOrRootAdmin(_accountKey) view returns (address[] memory) {
        AccountStruct storage account = accountMap[_accountKey];
        address[] storage accountSponsorKeys = account.accountSponsorKeys;
        return accountSponsorKeys;
    }

}
