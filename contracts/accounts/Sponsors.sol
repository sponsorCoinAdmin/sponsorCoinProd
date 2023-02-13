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
        account.sponsors.push(_sponsorKey);

        
        string memory accountSponsorKey =  concat(_accountKey, _sponsorKey);
        console.log("Account Sponsor =");
        console.log(accountSponsorKey);

        accountSponsorRecs storage  accountSponsors = sponsorAccountMap[accountSponsorKey];
        accountSponsors.account = _accountKey;
        accountSponsors.sponsor = _sponsorKey;
        account.sponsorKeys.push(accountSponsorKey);
        return true;
    }

    /// @notice get address for an account sponsor
    /// @param _accountKey public account key to get sponsor array
    /// @param _sponsorIdx new sponsor to add to account list
    function getAccountSponsorKey(address _accountKey, uint _sponsorIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        // console.log("getAccountSponsorKey(");
        // console.log("_accountKey = ");
        // console.log(_accountKey);
        // console.log("_sponsorIdx = ");
        // console.log(_sponsorIdx);
        // console.log(")");

        // console.log("#########################################################################");
        // console.log(concat(_accountKey, 15));
        // console.log("#########################################################################");
        // concat("", "");

        address sponsoraddr = accountMap[_accountKey].sponsors[_sponsorIdx];
        return sponsoraddr;
    }

    /// @notice retreives the sponsor array record size a specific address.
    /// @param _accountKey public account key to get Sponsor Record Length
    function getSponsorRecordCount(address _accountKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (uint) {
        return getSponsors(_accountKey).length;
    }

    /// @notice retreives the sponsors of a specific address.
    /// @param _accountKey public account key to set new balance
    function getSponsors(address _accountKey) internal onlyOwnerOrRootAdmin(_accountKey) view returns (address[] memory) {
        address[] storage actSponsor = accountMap[_accountKey].sponsors;
        return actSponsor;
    }

}
