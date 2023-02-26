// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
/// @title ERC20 Contract
import "./DataTypes.sol";

contract Accounts is DataTypes {
    constructor(){
    }

    /// @notice determines if address is inserted in account array
    /// @param _accountKey public account key validate Insertion
    function isAccountInserted(address _accountKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (bool) {
        if (accountMap[_accountKey].inserted)
            return true;
        else
            return false;
    }

    /// @notice insert address for later recall
    /// @param _accountKey public account key to set new balance
    /// @return true if balance is set, false otherwise
    function insertAccount(address _accountKey) public onlyOwnerOrRootAdmin(_accountKey) returns (string memory) {
        if (!isAccountInserted(_accountKey)) {
            AccountStruct storage accountRec = accountMap[_accountKey];
            accountRec.index = accountIndex.length;
            accountRec.account = _accountKey;
            accountRec.insertionTime = block.timestamp;
            accountRec.inserted = true;
            accountIndex.push(_accountKey);
            console.log("Account.sol: Inserting Account: " , _accountKey);
            string memory seralizedRec  = serialize(accountRec);
            console.log("Account.sol: seralizedRec = " , seralizedRec);
            return seralizedRec;
         }
            return "";
    }

    function serialize(AccountStruct storage accountRec) private returns (string memory) {
        // ToDo Remove Next Line and Serialize the AccountRec
        accountRec.inserted = true;
        return  "Accounts.sol, ToDo serialize accountRec Class Here";
    }
 
    /// @notice retreives the array index of a specific address.
    /// @param _accountKey public account key to set new balance
    function getAccountIndex(address _accountKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (uint) {
        if (isAccountInserted(_accountKey))
            return accountMap[_accountKey].index;
        else
            return 0;
    }

    /// @notice retreives the number of accounts inserted.
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
    function getAccountRecord(address _accountKey) internal onlyOwnerOrRootAdmin(_accountKey) view returns (AccountStruct storage) {
        require (isAccountInserted(_accountKey));
        return accountMap[_accountKey];
    }


}
