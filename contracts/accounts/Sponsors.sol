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

        // console.log ("Sponsors.sol => *** insertAccountSponsor ****");
        // console.log ("account = ", _accountKey);
        // console.log ("sponsor = ", _sponsorKey);

        sponsorStruct storage sponsorRec = getSponsorRec(_accountKey, _sponsorKey);
        if (sponsorRec.account == burnAddress) {
            accountRec.sponsors.push(_sponsorKey);
            accountRec.sponsorMap[_sponsorKey].account = _accountKey;
            accountRec.sponsorMap[_sponsorKey].sponsor = _sponsorKey;
            uint256 accountSponsorCount = getAccountSponsorCount(_accountKey);
//            console.log("accountRec.sponsors.push(", _sponsorKey, ").sponsor = ", accountRec.sponsors[accountSponsorCount - 1]);
            return true;
        }
        return false;
    }

    function getSponsorRec(address _accountKey, address _sponsorKey) internal view onlyOwnerOrRootAdmin(_accountKey) returns (sponsorStruct storage) {
        accountStruct storage accountRec = accountMap[_accountKey];
        sponsorStruct storage accountSponsor = accountRec.sponsorMap[_sponsorKey];
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
