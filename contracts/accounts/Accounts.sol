// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "../utils/StructSerialization.sol";

contract Accounts is StructSerialization {
    constructor() {}

    /// @notice insert block chain network address for spCoin Management
    /// @param _accountKey public accountKey to set new balance
    function addAccountRecord(address _accountKey)
        public onlyOwnerOrRootAdmin(_accountKey) {
        if (!isAccountInserted(_accountKey)) {
            AccountStruct storage accountRec = accountMap[_accountKey];
            accountRec.accountKey = _accountKey;
            accountRec.insertionTime = block.timestamp;
            accountRec.stakedSPCoins = 0;
            accountRec.inserted = true;
            AccountList.push(_accountKey);
        }
    }

    /// @notice determines if address Record is inserted in accountKey array
    /// @param _accountKey public accountKey validate Insertion
    function isAccountInserted(address _accountKey)
        public view onlyOwnerOrRootAdmin(_accountKey) returns (bool) {
        if (accountMap[_accountKey].inserted) 
            return true;
        else
            return false;
    }

    /// @notice retreives the number of accounts inserted.
    function getAccountListize() public view returns (uint) {
        return AccountList.length;
    }

    /// @notice retreives array list AccountList.
    function getAccountList() public view returns (address[] memory) {
        return AccountList;
    }

    ////////////////////// PATRON REQUESTS //////////////////////////////

    /*
    /// @notice retreives the sponsor array records for the Patron list
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAccountPatronKeys(address _accountKey) public view 
        onlyOwnerOrRootAdmin(_accountKey) returns (address[] memory) {
        AccountStruct storage account = accountMap[_accountKey];
        address[] storage patronAccountList = account.patronAccountList;
        return patronAccountList;
    }

    /////////////////////////// SPONSOR REQUESTS //////////////////////////////

    /// @notice retreives the sponsor array records for the Patron list
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAccountParentSponsorKeys(address _accountKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (address[] memory) {
        AccountStruct storage account = accountMap[_accountKey];
        address[] storage parentSponsorAccountList = account.parentSponsorAccountList;
        return parentSponsorAccountList;
    }
*/
    /////////////////////////// AGENT REQUESTS //////////////////////////////
 
    /// @notice retreives the sponsors of a specific address.
    /// @param _patronKey public account key to set new balance
    function getSponsorKeys(address _patronKey) public onlyOwnerOrRootAdmin(_patronKey) view returns (address[] memory) {
        AccountStruct storage patronAccount = accountMap[_patronKey];
        address[] storage sponsorKeys = patronAccount.sponsorAccountList;
        return sponsorKeys;
    }

    
    function getAccountListIndex (address _accountKey, 
        address[] storage _accountKeyList) internal view
        accountExists(_accountKey) returns (uint) {
        uint i = 0;
        for (i; i < _accountKeyList.length; i++) {
            if (_accountKeyList[i] == _accountKey) {
                break;
            }
        }
        return i; 
    }

    modifier accountExists (address _accountKey) {
        require (isAccountInserted(_accountKey) , "Account does not exists");
        _;
    }
    /////////////////// ACCOUNT SERIALIZATION REQUESTS ////////////////////////

    /// @notice retreives the account record of a specific accountKey address.
    /// @param _accountKey public accountKey to set new balance
    function getSerializedAccountRecord(address _accountKey)
        public view onlyOwnerOrRootAdmin(_accountKey)
        returns (string memory)
    {
        require(isAccountInserted(_accountKey));
        return serializeAccount(accountMap[_accountKey]);
    }
}
