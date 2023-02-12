// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
/// @title ERC20 Contract
import "../utils/KYC.sol";

contract Accounts is KYC {

   address burnAddress = 0x0000000000000000000000000000000000000000;
   // Keep track of account insertions
   address[] public accountIndex;
//    address[] public sponsorIndex;
//    address[] public agentIndex;
   uint public lastStakingUpdateTime = block.timestamp;

   struct accountRec {
       addressRec[] sponsors;
       addressRec[] agents;
       address parentAccount;
       rateRec[] rateEntries;
       uint index;
       uint insertionTime;
       bool inserted;
       KYC kyc ;
       bool verified;
    }
    struct rateRec {
       uint[] rate;
       uint insertionTime;
       uint lastUpdateTime;
       uint256 quantity;
    }
    struct addressRec {
       address[] child;
       address addr;
       rateRec next;
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
    function insertAccount(address _accountKey) public onlyOwnerOrRootAdmin(_accountKey) returns (bool) {
         if (!isInserted(_accountKey)) {
            accounts[_accountKey].insertionTime = block.timestamp;
            accounts[_accountKey].inserted = true;
            accounts[_accountKey].index = accountIndex.length;
            accounts[_accountKey].parentAccount = burnAddress;
            accountIndex.push(_accountKey);
            // console.log("Returning TRUE");
            return true;
         }
            // console.log("Returning FALSE");
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
     function getAccountRecordCount() public view returns (uint) {
        return accountIndex.length;
      }

    /// @notice retreives a specified account address from accountIndex.
    /// @param _idx index of a specific account in accountIndex
     function getAccount(uint _idx) public view returns (address) {
        return accountIndex[_idx];
      }

    /// @notice retreives the account record of a specific account address.
    /// @param _accountKey public account key to set new balance
    function getAccountRecord(address _accountKey) internal onlyOwnerOrRootAdmin(_accountKey) view returns (accountRec storage) {
        require (isInserted(_accountKey));
        return accounts[_accountKey];
    }

}
