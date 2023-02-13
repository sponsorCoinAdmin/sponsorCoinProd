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
        accountRec storage account = accountMap[_accountKey];
        account.parentAccount = _accountKey;

        string memory accountSponsorKey =  concat(_accountKey, _sponsorKey);
        accountSponsorRecs storage  accountSponsors = sponsorAccountMap[accountSponsorKey];
        if (accountSponsors.account == burnAddress) {
           accountSponsors.account = _accountKey;
           accountSponsors.sponsor = _sponsorKey;
           account.sponsorKeys.push(accountSponsorKey);
           return true;
        }
        return false;
    }

    /// @notice get address for an account sponsor
    /// @param _accountKey public account key to get sponsor array
    /// @param _sponsorIdx new sponsor to add to account list
    function getAccountSponsorAddress(address _accountKey, uint _sponsorIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        accountRec storage account = accountMap[_accountKey];
        string memory accountSponsorKey = account.sponsorKeys[_sponsorIdx];
        address sponsoraddr = sponsorAccountMap[accountSponsorKey].sponsor;

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
        accountRec storage account = accountMap[_accountKey];

        string[] storage sponsorKeys = account.sponsorKeys;
        return sponsorKeys;
    }

}
