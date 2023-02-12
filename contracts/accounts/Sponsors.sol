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
        accountRec storage account = accounts[_accountKey];
//        uint256 insertionTime = block.timestamp;

        addressRec memory newSponsor;
        newSponsor.addr = _sponsorKey;
        account.sponsors.push(newSponsor);

        return true;
    }

    /// @notice retreives the sponsor array record size a specific address.
    /// @param _accountKey public account key to get Sponsor Record Length
    function getSponsorRecordCount(address _accountKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (uint) {
        return getAccountSponsors(_accountKey).length;
    }

    /// @notice retreives the sponsor array records from a specific account address.
    /// @param _accountKey public account key to get Sponsors
   function getAccountSponsors(address _accountKey) internal view onlyOwnerOrRootAdmin(_accountKey) returns (addressRec[] memory) {
        return accounts[_accountKey].sponsors;
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
//        concat("", "");

        address sponsoraddr = accounts[_accountKey].sponsors[_sponsorIdx].addr;
        return sponsoraddr;
    }

    /// @notice retreives the account balance of a specific address.
    function getSponsorRecCount() public view returns (uint) {
        return getSponsorRecords().length;
    }
    
   /// @notice retreives the account balance of a specific address.
    function getSponsorRecords() internal view returns (addressRec[] memory) {
        return getSponsorRecords(msg.sender);
    }
    
    /// @notice retreives the account balance of a specific address.
    /// @param _accountKey public account key to set new balance
    function getSponsorRecords(address _accountKey) internal onlyOwnerOrRootAdmin(_accountKey) view returns (addressRec[] memory) {
        addressRec[] storage actSponsor = accounts[_accountKey].sponsors;
        return actSponsor;
    }

}
