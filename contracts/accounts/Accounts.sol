// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
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
            accountRec.index = accountKeys.length;
            accountRec.accountKey = _accountKey;
            accountRec.insertionTime = block.timestamp;
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

    /// @notice retreives the array index of a specific address.
    /// @param _accountKey public accountKey to set new balance
    function getAccountIndex(address _accountKey)
        public
        view
        onlyOwnerOrRootAdmin(_accountKey)
        returns (uint256) {
        if (isAccountInserted(_accountKey))
            return accountMap[_accountKey].index;
        else return 0;
    }

    /// @notice retreives the number of accounts inserted.
    function getAccountKeySize() public view returns (uint) {
        return accountKeys.length;
    }

    /// @notice retreives array list accountKeys.
    function getAccountKeys() public view returns (address[] memory) {
        return accountKeys;
    }

    /// @notice retreives the account record of a specific accountKey address.
    /// @param _accountKey public accountKey to set new balance
    function getAccountSerializedRecord(address _accountKey)
        internal view onlyOwnerOrRootAdmin(_accountKey)
        returns (AccountStruct storage) {
        require(isAccountInserted(_accountKey));
        return accountMap[_accountKey];
    }

    ////////////////////// PATREON REQUESTS //////////////////////////////

    /// @notice get address for an account patreon
    /// @param _accountKey public account key to get sponsor array
    /// @param patreonIdx new patreon to add to account list
    function getAccountPatreonKeyByIndex(address _accountKey, uint patreonIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        AccountStruct storage accountRec = accountMap[_accountKey];
        address accountSponsorKey = accountRec.accountPatreonKeys[patreonIdx];
        return accountSponsorKey;
    }

    /// @notice retreives the sponsor array record size of the Patreon list.
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAccountPatreonKeySize(address _accountKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (uint) {
        return getAccountPatreonKeys(_accountKey).length;
    }

    /// @notice retreives the sponsor array records for the Patreon list
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAccountPatreonKeys(address _accountKey) public view 
        onlyOwnerOrRootAdmin(_accountKey) returns (address[] memory) {
        AccountStruct storage account = accountMap[_accountKey];
        address[] storage accountPatreonKeys = account.accountPatreonKeys;
        return accountPatreonKeys;
    }

    /////////////////////////// SPONSOR REQUESTS //////////////////////////////

    /// @notice retreives the sponsor array record size of the Patreon list.
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAccountParentSponsorKeySize(address _accountKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (uint) {
        return getAccountParentSponsorKeys(_accountKey).length;
    }
    
    /// @notice retreives the sponsor array records for the Patreon list
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAccountParentSponsorKeys(address _accountKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (address[] memory) {
        AccountStruct storage account = accountMap[_accountKey];
        address[] storage accountParentSponsorKeys = account.accountParentSponsorKeys;
        return accountParentSponsorKeys;
    }

    /////////////////////////// AGENT REQUESTS //////////////////////////////

    /// @notice get address for an account agent
    /// @param _accountKey public account key to get sponsor array
    /// @param _agentIdx new patreon to add to account list
    function getAccountAgentKeyByIndex(address _accountKey, uint _agentIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        AccountStruct storage accountRec = accountMap[_accountKey];
        address accountAgentKey = accountRec.accountAgentKeys[_agentIdx];
        return accountAgentKey;
    }

    /// @notice retreives the sponsor array record size of the Patreon list.
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAccountAgentKeySize(address _accountKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (uint) {
        return getAccountAgentKeys(_accountKey).length;
    }

    /// @notice retreives the sponsor array records for the Patreon list
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAccountAgentKeys(address _accountKey) public view 
    onlyOwnerOrRootAdmin(_accountKey) 
    returns (address[] memory) {
        AccountStruct storage account = accountMap[_accountKey];
        address[] storage accountAgentKeys = account.accountAgentKeys;
        return accountAgentKeys;
    }
    
    /// @notice given a patreon key get the size of the child sponsor account keys.
    /// @param _patreonKey public account key to get Sponsor Record Length
    function getAccountSponsorKeySize(address _patreonKey) public view onlyOwnerOrRootAdmin(_patreonKey) returns (uint) {
        return getSponsorKeys(_patreonKey).length;
    }

    /// @notice retreives the sponsors of a specific address.
    /// @param _patreonKey public account key to set new balance
    function getSponsorKeys(address _patreonKey) public onlyOwnerOrRootAdmin(_patreonKey) view returns (address[] memory) {
        AccountStruct storage account = accountMap[_patreonKey];
        address[] storage accountSponsorKeys = account.accountSponsorKeys;
        return accountSponsorKeys;
    }

     /////////////////// DELETE ACCOUNT METHODS ////////////////////////
   
    function deleteAccountRecord(address _accountKey) public
        accountExists(_accountKey) 
        onlyOwnerOrRootAdmin(_accountKey)
        PatreonDoesNotExist(_accountKey)
        parentSponsorDoesNotExist(_accountKey)
//      AgentDoesNotExist(_accountKey)
        SponsorDoesNotExist(_accountKey) {
        if (deleteAccountRecordFromSearchKeys( _accountKey,  accountKeys)) {
            delete accountMap[_accountKey];
        } 
    }

    function deleteAccountRecordFromSearchKeys(address _accountKey, 
        address[] storage _accountKeys) internal returns (bool) {
      // console.log("deleteAccountRecordFromSearchKeys(", _accountKey);
        bool deleted = false;
        uint i = getAccountListIndex (_accountKey, _accountKeys);
        for (i; i<_accountKeys.length; i++) { 
            if (_accountKeys[i] == _accountKey) {
                // console.log("==== Found _accountKeys[", i, "] ", _accountKeys[i]);
                // console.log("==== Found accountMap[_accountKeys[", i,  "]].accountKey ", accountMap[_accountKeys[i]].accountKey);
                delete _accountKeys[i];
                while ( i < _accountKeys.length - 1) { 
                    _accountKeys[i] = _accountKeys[i + 1];
                    i++;
                }
                deleted = true;
            }
        }
        _accountKeys.pop();
        return deleted;
    }

    function getAccountListIndex (address _accountKey, 
        address[] storage _accountKeys) internal view
        accountExists(_accountKey) returns (uint) {
        uint i = 0;
        for (i; i < _accountKeys.length; i++) {
            if (_accountKeys[i] == _accountKey) {
                break;
            }
        }
        return i; 
    }

    modifier accountExists (address _accountKey) {
        require (isAccountInserted(_accountKey) , "Account does not exists");
        _;
    }

    modifier PatreonDoesNotExist(address _accountKey) {
        require (getAccountPatreonKeySize(_accountKey) == 0 &&
                 getAccountAgentKeySize(_accountKey) == 0, "Sponsor Account has a Patreon, (Patreon must Un-sponsor Sponsored Account)");
        _;
    }
    
    modifier parentSponsorDoesNotExist(address _accountKey) {
        require (getAccountParentSponsorKeySize(_accountKey) == 0, "Agent Account has a Parent Sponsor, (Patreon must Un-sponsor Sponsored Account)");
        _;
    }

    modifier SponsorDoesNotExist(address _accountKey) {
        require (getAccountSponsorKeySize(_accountKey) == 0, "Patreon Account has a Sponsor, (Patreon must Un-sponsor Sponsored Account)");
        _;
    }
    
    /*
    modifier AgentDoesNotExist(address _accountKey) {
        require (getAccountAgentKeySize(_accountKey) == 0, "Sponsor Account has an Agent, (Patreon must Un-sponsor Sponsored Account)");
        _;
    }
    */
    /////////////////// ACCOUNT SERIALIZATION REQUESTS ////////////////////////

    /// @notice retreives the account record of a specific accountKey address.
    /// @param _accountKey public accountKey to set new balance
    function getSerializedAccountRec(address _accountKey)
        public view onlyOwnerOrRootAdmin(_accountKey)
        returns (string memory)
    {
        require(isAccountInserted(_accountKey));
        return serializeAccount(accountMap[_accountKey]);
    }
}
