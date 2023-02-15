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
        accountStruct storage account = accountMap[_accountKey];
        account.parentAccount = _accountKey;

        string memory accountSponsorKey =  getAccountSponsorKey(_accountKey, _sponsorKey);
        console.log ("Sponsors.sol => *** insertAccountSponsor ****");
        console.log ("insertAccountSponsor AccountSponsorKey = ", accountSponsorKey);
        console.log ("accountSponsors.account = ", _accountKey);
        console.log ("accountSponsors.sponsor = ", _sponsorKey);

        accountSponsorStruct memory  accountSponsors = getAccountSponsorRec(_accountKey, _sponsorKey);
        if (accountSponsors.account == burnAddress) {
            accountSponsorMap[accountSponsorKey].account = _accountKey;
            accountSponsorMap[accountSponsorKey].sponsor = _sponsorKey;
            account.sponsorKeys.push(accountSponsorKey);
            console.log("accountSponsorMap[", accountSponsorKey, "] = ", accountSponsorMap[accountSponsorKey].sponsor);
            return true;
        }
        return false;
    }

     function getAccountSponsorKey(address _accountKey, address _sponsorKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (string memory) {
        string memory accountSponsorKey =  concat(_accountKey, _sponsorKey);
        return accountSponsorKey;
     }

     function getAccountSponsorRec(address _accountKey, address _sponsorKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (accountSponsorStruct memory) {
        string memory accountSponsorKey =  getAccountSponsorKey(_accountKey, _sponsorKey);
        accountSponsorStruct storage  accountSponsors = accountSponsorMap[accountSponsorKey];
        return accountSponsors;
     }

    /// @notice get address for an account sponsor
    /// @param _accountKey public account key to get sponsor array
    /// @param _sponsorIdx new sponsor to add to account list
    function getAccountSponsorAddress(address _accountKey, uint _sponsorIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        console.log("Sponsors.sol =>  getAccountSponsorAddress KEY(_accountKey, _sponsorIdx)");
        console.log("getAccountSponsorAddress KEY ", _accountKey, ",", _sponsorIdx);
        accountStruct storage account = accountMap[_accountKey];
        string memory accountSponsorKey = account.sponsorKeys[_sponsorIdx];
        console.log("accountSponsorMap[", accountSponsorKey, "] = ", accountSponsorMap[accountSponsorKey].sponsor);
        address sponsoraddr = accountSponsorMap[accountSponsorKey].sponsor;
        console.log("returning sponsoraddr", sponsoraddr);

        return sponsoraddr;
    }

    /// @notice retreives the sponsor array record size a specific address.
    /// @param _accountKey public account key to get Sponsor Record Length
    function getSponsorRecordCount(address _accountKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (uint) {
        return getSponsors(_accountKey).length;
    }

    /// @notice retreives the sponsors of a specific address.
    /// @param _accountKey public account key to set new balance
    function getSponsors(address _accountKey) internal onlyOwnerOrRootAdmin(_accountKey) view returns (string[] memory) {
        accountStruct storage account = accountMap[_accountKey];

        string[] storage sponsorKeys = account.sponsorKeys;
        return sponsorKeys;
    }

}
