// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
/// @title ERC20 Contract
import "./accounts/Accounts.sol";

contract AccountRecords is Accounts{

   // Keep track of account insertions
   address[] public accountIndex;
   uint public lastStakingUpdateTime = block.timestamp;
   struct accountRec {
       uint index;
       uint insertionTime;
       bool inserted;
       sponsorRec[] sponsorAccounts;
       kyc KYC;
    }
    mapping(address => accountRec)  accounts;

    constructor(){
    }

    /// @notice determines if address is inserted in account array
    /// @param _accountKey public account key validate Insertion
    function isInserted(address _accountKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (bool) {
        if (accounts[_accountKey].inserted)
            return true;
        else
            return false;
    }

    /// @notice insert address for later recall
    /// @param _accountKey public account key to set new balance
    /// @return true if balance is set, false otherwise
    function insertAccountSponsor(address _accountKey, address _sponsorKey) public onlyOwnerOrRootAdmin(_accountKey) returns (bool) {
        insertAccount(_accountKey);
        insertAccount(_sponsorKey);
        accountRec memory actRec  = getAccountRecord(_accountKey);
        // ToDo Attach Sponsor to account
    }

    /// @notice insert address for later recall
    /// @param _accountKey public account key to set new balance
    /// @return true if balance is set, false otherwise
    function insertAccount(address _accountKey) public onlyOwnerOrRootAdmin(_accountKey) returns (bool) {
         if (!isInserted(_accountKey)) {
            accounts[_accountKey].insertionTime = block.timestamp;
            accounts[_accountKey].inserted = true;
            accounts[_accountKey].index = accountIndex.length;
            accountIndex.push(_accountKey);
            console.log("Returning TRUE");
            return true;
         }
            console.log("Returning FALSE");
            return false;
    }

    /// @notice retreives the array index of a specific address.
    /// @param _accountKey public account key to set new balance
     function getindex(address _accountKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (uint) {
        if (isInserted(_accountKey))
            return accounts[_accountKey].index;
        else
            return 0;
      }

    /// @notice retreives the array index of a specific address.
     function getRecordCount() public view returns (uint) {
        return accountIndex.length;
      }

    /// @notice retreives a specified account address from accountIndex.
    /// @param _idx index of a specific account in accountIndex
     function getAccount(uint _idx) public view returns (address) {
        return accountIndex[_idx];
      }

    /// @notice retreives the account balance of a specific address.
    /// @param _accountKey public account key to set new balance
    function getAccountRecord(address _accountKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (accountRec memory) {
        require (isInserted(_accountKey));
        return accounts[_accountKey];
    }

    /// @notice retreives the account balance of a specific address.
    function getSponsorRecords() public view returns (sponsorRec[] memory) {
        return getSponsorRecords(msg.sender);
    }
    /// @notice retreives the account balance of a specific address.
    /// @param _accountKey public account key to set new balance
    function getSponsorRecords(address _accountKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (sponsorRec[] memory) {
           sponsorRec[] memory sponsorAccountArray = accounts[_accountKey].sponsorAccounts;
        return sponsorAccountArray;
    }
}