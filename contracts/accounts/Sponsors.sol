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
    function insertAccountSponsor(address _accountKey, address _sponsorKey) public onlyOwnerOrRootAdmin(_accountKey) returns (bool) {
        insertAccount(_accountKey);
        insertAccount(_sponsorKey);
        accountStruct storage accountRec = accountMap[_accountKey];
        sponsorStruct storage sponsorRec = getSponsorRec(_accountKey, _sponsorKey);
        if (!sponsorRec.inserted) {
            sponsorRec.index = accountRec.sponsors.length;
            sponsorRec.insertionTime = block.timestamp;
            sponsorRec.account = _accountKey;
            sponsorRec.sponsor = _sponsorKey;
            sponsorRec.inserted = true;
            accountRec.sponsors.push(_sponsorKey);
            uint256 accountSponsorCount = getAccountSponsorCount(_accountKey);
//            console.log("accountRec.sponsors.push(", _sponsorKey, ").sponsor = ", accountRec.sponsors[accountSponsorCount - 1]);
            return true;
        }
        return false;
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

    function getValidSponsorRec(address _accountKey, address _sponsorKey) internal onlyOwnerOrRootAdmin(_accountKey) returns (sponsorStruct storage) {
        if (!isSponsorInserted(_accountKey, _sponsorKey)) {
            console.log("Sponsor Account ", _sponsorKey, " Not Found, ***INSERTING***");
            insertAccountSponsor(_accountKey, _sponsorKey);
        }
        return getSponsorRec(_accountKey, _sponsorKey);
     }

     function getSponsorRec(address _accountKey, address _sponsorKey) internal view onlyOwnerOrRootAdmin(_accountKey) returns (sponsorStruct storage) {
        accountStruct storage accountRec = accountMap[_accountKey];
        sponsorStruct storage accountSponsor = accountRec.sponsorMap[_sponsorKey];
        // console.log("SPONSOR IS INSERTED = ", accountSponsor.inserted);
        // console.log("ACCOUNT ADDRESS     = ", accountSponsor.account);
        // console.log("SPONSOR ADDRESS     = ", accountSponsor.sponsor);
        return accountSponsor;
     }

    /// @notice get address for an account sponsor
    /// @param _accountKey public account key to get sponsor array
    /// @param _sponsorIdx new sponsor to add to account list
    function getAccountSponsorAddress(address _accountKey, uint _sponsorIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        // console.log("Sponsors.sol =>  getAccountSponsorAddress KEY(_accountKey, _sponsorIdx)");
        // console.log("getAccountSponsorAddress KEY ", _accountKey, ",", _sponsorIdx);
        accountStruct storage accountRec = accountMap[_accountKey];
        address sponsor = accountRec.sponsors[_sponsorIdx];
        // console.log("returning sponsoraddr", sponsor);

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
            accountStruct storage accountRec = accountMap[_accountKey];
        return accountRec.sponsors.length;
    }

    /// @notice retreives the sponsors of a specific address.
    /// @param _accountKey public account key to set new balance
    function getSponsorList(address _accountKey) internal onlyOwnerOrRootAdmin(_accountKey) view returns (address[] memory) {
        accountStruct storage account = accountMap[_accountKey];
        address[] storage sponsors = account.sponsors;
        return sponsors;
    }

}
