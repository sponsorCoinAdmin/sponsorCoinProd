// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
/// @title ERC20 Contract

contract MapManager{

    address[] public accountIndex;
    mapping(uint => address)  addressOf;

   // Keep track of account insertions
   struct account {
        uint insertionTime;
        uint indexOf;
        bool inserted;
    }
    mapping(address => account)  accounts;

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

    /// @notice set amount of tokens for a specified address
    /// @param _accountKey public account key to set new balance
    /// @return true if balance is set, false otherwise
    function insertAccount(address _accountKey) public returns (bool) {
         if (!isInserted(_accountKey)) {
            uint index = accountIndex.length;
            accounts[_accountKey].insertionTime = block.timestamp;
            accounts[_accountKey].inserted = true;
            accountIndex.push(_accountKey);
            accounts[_accountKey].indexOf = index;
            addressOf[index] = _accountKey;
            return true;
         }
         else
            return false;
    }

    /// @notice retreives the array index of a specific address.
    /// @param _accountKey public account key to set new balance
     function getIndexOf(address _accountKey) public view returns (uint) {
        if (isInserted(_accountKey))
            return accounts[_accountKey].indexOf;
        else
            return 0;
      }

    /// @notice retreives the array index of a specific address.
     function getRecCount() public view returns (uint) {
        return accountIndex.length;
      }

    /// @notice retreives the account balance of a specific address.
    /// @param _accountKey public account key to set new balance
    function getAccount(address _accountKey) public view returns (account memory) {
        require (isInserted(_accountKey));
        return accounts[_accountKey];
    }
}