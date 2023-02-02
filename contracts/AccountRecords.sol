// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
/// @title ERC20 Contract
import "./KYC.sol";

contract AccountRecords is KYC, Sponsor{

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
    function isInserted(address _accountKey) public view returns (bool) {
        if (accounts[_accountKey].inserted)
            return true;
        else
            return false;
    }

    /// @notice insert address for later recall
    /// @param _accountKey public account key to set new balance
    /// @return true if balance is set, false otherwise
    function insertAccount(address _accountKey) public returns (bool) {
         if (!isInserted(_accountKey)) {
            accounts[_accountKey].insertionTime = block.timestamp;
            accounts[_accountKey].inserted = true;
            accounts[_accountKey].index = accountIndex.length;
            accountIndex.push(_accountKey);
            return true;
         }
         else
            return false;
    }

    /// @notice retreives the array index of a specific address.
    /// @param _accountKey public account key to set new balance
     function getindex(address _accountKey) public view returns (uint) {
        if (isInserted(_accountKey))
            return accounts[_accountKey].index;
        else
            return 0;
      }

    /// @notice retreives the array index of a specific address.
     function getRecCount() public view returns (uint) {
        return accountIndex.length;
      }

    /// @notice retreives the account balance of a specific address.
    /// @param _accountKey public account key to set new balance
    function getActRec(address _accountKey) public view returns (accountRec memory) {
        require (isInserted(_accountKey));
        return accounts[_accountKey];
    }
}