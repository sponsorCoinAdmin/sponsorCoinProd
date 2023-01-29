// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
/// @title ERC20 Contract

    contract MapManager{

    // Robin Added New
    address[] public accountKeys;
    mapping(address => uint)  indexOf;
    mapping(address => bool)  inserted;

    struct account {
        uint256 balance;
        address sponsor;
        address agent;
        uint sponsoredTime;
    }

    // Keep track balances and allowances approved
    mapping(address => account)  accounts;

    constructor(){
    }

    /// @notice set amount of tokens for a specified address
    /// @param _accountKey public account key to set new balance
    /// @param _newBalance amount value to set for new balance of account identified by accountKey
    /// @return true if balance is set, false otherwise
    function setBalance(address _accountKey, uint _newBalance ) internal returns (bool) {
         accounts[_accountKey].balance = _newBalance;
         accounts[_accountKey].sponsoredTime = block.timestamp;
         if (!inserted[_accountKey]) {
            inserted[_accountKey] = true;
            accountKeys.push(_accountKey);
            indexOf[_accountKey] = accountKeys.length;

            return true;
         }
         else
            return false;
     }

    /// @notice determines if address is inserted in account array
    /// @param _accountKey public account key to set new balance
    function isInserted(address _accountKey) public view returns (bool) {
        if (!inserted[_accountKey])
            return false;
        else
            return true;
      }

    /// @notice retreives the array index of a specific address.
    /// @param _accountKey public account key to set new balance
     function getIndexOf(address _accountKey) public view returns (uint) {
        if (isInserted(_accountKey))
            return indexOf[_accountKey];
        else
            return 0;
      }

    /// @notice retreives the account balance of a specific address.
    /// @param _accountKey public account key to set new balance
    function getAccount(address _accountKey) public view returns (account memory) {
        require (isInserted(_accountKey));
        return accounts[_accountKey];
    }
}