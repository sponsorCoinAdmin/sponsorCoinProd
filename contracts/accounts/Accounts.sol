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
            accountKeys.push(_accountKey);
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
    function getAccountKeySize() public view returns (uint) {
        return accountKeys.length;
    }

    /// @notice retreives array list accountKeys.
    function getAccountKeys() public view returns (address[] memory) {
        return accountKeys;
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
        address[] storage parentSponsorAccountKeys = account.parentSponsorAccountKeys;
        return parentSponsorAccountKeys;
    }
*/
    /////////////////////////// AGENT REQUESTS //////////////////////////////
 
    /// @notice retreives the sponsors of a specific address.
    /// @param _patronKey public account key to set new balance
    function getSponsorKeys(address _patronKey) public onlyOwnerOrRootAdmin(_patronKey) view returns (address[] memory) {
        AccountStruct storage patronAccount = accountMap[_patronKey];
        address[] storage sponsorKeys = patronAccount.sponsorAccountKeys;
        return sponsorKeys;
    }

     /////////////////// DELETE ACCOUNT METHODS ////////////////////////
   
    function deleteAccountRecord(address _accountKey) public
        accountExists(_accountKey) 
        onlyOwnerOrRootAdmin(_accountKey)
        patronDoesNotExist(_accountKey)
        parentsponsorDoesNotExist(_accountKey)
//      AgentDoesNotExist(_accountKey)
        sponsorDoesNotExist(_accountKey) {
        if (deleteAccountRecordFromSearchKeys( _accountKey,  accountKeys)) {
            delete accountMap[_accountKey];
        } 
    }

    function deleteAccountRecordFromSearchKeys(address _accountKey, 
        address[] storage _accountKeyList) internal returns (bool) {
      // console.log("deleteAccountRecordFromSearchKeys(", _accountKey);
        bool deleted = false;
        uint i = getAccountListIndex (_accountKey, _accountKeyList);
        for (i; i<_accountKeyList.length; i++) { 
            if (_accountKeyList[i] == _accountKey) {
                // console.log("==== Found _accountKeyList[", i, "] ", _accountKeyList[i]);
                // console.log("==== Found accountMap[_accountKeyList[", i,  "]].accountKey ", accountMap[_accountKeyList[i]].accountKey);
                delete _accountKeyList[i];
                while ( i < _accountKeyList.length - 1) { 
                    _accountKeyList[i] = _accountKeyList[i + 1];
                    i++;
                }
                deleted = true;
            }
        }
        _accountKeyList.pop();
        return deleted;
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

    modifier patronDoesNotExist(address _accountKey) {
        require (accountMap[_accountKey].patronAccountList.length == 0 &&
            accountMap[_accountKey].agentAccountKeys.length == 0, "Sponsor Account has a Patron, (Patron must Un-sponsor Sponsored Account)");
            _;
    }
    
    modifier parentsponsorDoesNotExist(address _accountKey) {
        require (accountMap[_accountKey].parentSponsorAccountKeys.length == 0, "Agent Account has a Parent Sponsor, (Patron must Un-sponsor Sponsored Account)");
        _;
    }

    modifier sponsorDoesNotExist(address _patronKey) {
        require (getSponsorKeys(_patronKey).length == 0, "Patron Account has a Sponsor, (Patron must Un-sponsor Sponsored Account)");
        _;
    }
    
    /*
    modifier AgentDoesNotExist(address _accountKey) {
        require (accountMap[_accountKey](_accountKey).length == 0, "Sponsor Account has an Agent, (Patron must Un-sponsor Sponsored Account)");
        _;
    }
    */
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
