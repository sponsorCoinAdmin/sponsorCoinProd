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
            accountRec.index = accountIndex.length;
            accountRec.accountKey = _accountKey;
            accountRec.insertionTime = block.timestamp;
            accountRec.inserted = true;
            accountIndex.push(_accountKey);
        }
    }

    /// @notice determines if address is inserted in accountKey array
    /// @param _accountKey public accountKey validate Insertion
    function isAccountInserted(address _accountKey)
        public view onlyOwnerOrRootAdmin(_accountKey) returns (bool)
    {
        if (accountMap[_accountKey].inserted) return true;
        else return false;
    }

    /// @notice retreives the array index of a specific address.
    /// @param _accountKey public accountKey to set new balance
    function getAccountIndex(address _accountKey)
        public
        view
        onlyOwnerOrRootAdmin(_accountKey)
        returns (uint256)
    {
        if (isAccountInserted(_accountKey))
            return accountMap[_accountKey].index;
        else return 0;
    }

    /// @notice retreives the number of accounts inserted.
    function getAccountSize() public view returns (uint) {
        return accountIndex.length;
    }

    /// @notice retreives a specified account address from accountIndex.
    /// @param _idx index of a specific account in accountIndex
    function getAccountKey(uint256 _idx) public view returns (address) {
        return accountIndex[_idx];
    }

    /// @notice retreives the account record of a specific accountKey address.
    /// @param _accountKey public accountKey to set new balance
    function getAccountRecord(address _accountKey)
        internal view onlyOwnerOrRootAdmin(_accountKey)
        returns (AccountStruct storage)
    {
        require(isAccountInserted(_accountKey));
        return accountMap[_accountKey];
    }

    ////////////////////// BENEFICIARY REQUESTS //////////////////////////////

    /// @notice get address for an account patreon
    /// @param _accountKey public account key to get sponsor array
    /// @param patreonIdx new patreon to add to account list
    function getAccountPatreonKeyByIndex(address _accountKey, uint patreonIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        AccountStruct storage accountRec = accountMap[_accountKey];
        address accountSponsorKey = accountRec.accountParentPatreonKeys[patreonIdx];
        return accountSponsorKey;
    }

    /// @notice retreives the sponsor array record size of the Patreon list.
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAccountParentPatreonSize(address _accountKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (uint) {
        return getAccountParentPatreonKeys(_accountKey).length;
    }

    /// @notice retreives the sponsor array records for the Patreon list
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAccountParentPatreonKeys(address _accountKey) internal onlyOwnerOrRootAdmin(_accountKey) view returns (address[] memory) {
        AccountStruct storage account = accountMap[_accountKey];
        address[] storage accountParentPatreonKeys = account.accountParentPatreonKeys;
        return accountParentPatreonKeys;
    }

    /// @notice get address for an account patreon
    /// @param _accountKey public account key to get sponsor array
    /// @param sponsorIdx new parent sponsor to add to account list

    function getAccountAgentSponsorByIdx(address _accountKey, uint sponsorIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        AccountStruct storage accountRec = accountMap[_accountKey];
        address accountAgentSponsorKey = accountRec.accountParentSponsorKeys[sponsorIdx];
        return accountAgentSponsorKey;
    }

    /// @notice retreives the sponsor array record size of the Patreon list.
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAccountParentSponsorSize(address _accountKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (uint) {
        return getAccountParentSponsorKeys(_accountKey).length;
    }
    
    /// @notice retreives the sponsor array records for the Patreon list
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAccountParentSponsorKeys(address _accountKey) internal onlyOwnerOrRootAdmin(_accountKey) view returns (address[] memory) {
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
        address accountAgentKey = accountRec.accountChildAgentKeys[_agentIdx];
        return accountAgentKey;
    }

    /// @notice retreives the sponsor array record size of the Patreon list.
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAccountChildAgentSize(address _accountKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (uint) {
        return getChildAgentKeys(_accountKey).length;
    }

    /// @notice retreives the sponsor array records for the Patreon list
    /// @param _accountKey public account key to get Sponsor Record Length
    function getChildAgentKeys(address _accountKey) internal onlyOwnerOrRootAdmin(_accountKey) view returns (address[] memory) {
        AccountStruct storage account = accountMap[_accountKey];
        address[] storage accountChildAgentKeys = account.accountChildAgentKeys;
        return accountChildAgentKeys;
    }

    
    /// @notice given a patreon key get the size of the child sponsor account keys.
    /// @param _patreonKey public account key to get Sponsor Record Length
    function getChildSponsorSize(address _patreonKey) public view onlyOwnerOrRootAdmin(_patreonKey) returns (uint) {
        return getChildSponsorKeys(_patreonKey).length;
    }

    /// @notice retreives the sponsors of a specific address.
    /// @param _patreonKey public account key to set new balance
    function getChildSponsorKeys(address _patreonKey) internal onlyOwnerOrRootAdmin(_patreonKey) view returns (address[] memory) {
        AccountStruct storage account = accountMap[_patreonKey];
        address[] storage accountChildSponsorKeys = account.accountChildSponsorKeys;
        return accountChildSponsorKeys;
    }

     /////////////////// DELETE ACCOUNT METHODS ////////////////////////
   
    function deleteAccount(address _accountKey) public
    {
        deleteAccountMapArray( _accountKey,  accountIndex, accountMap); 
    }


    function deleteAccountMapArray(address _accountKey, 
        address[] storage accountIndex, 
        mapping(address => AccountStruct) storage accountMap) internal
        onlyOwnerOrRootAdmin(_accountKey)
        parentPatreonDoesNotExist(_accountKey)
        parentSponsorDoesNotExist(_accountKey)
        childSponsorDoesNotExist(_accountKey)
//          childAgentDoesNotExist(_accountKey)
        accountExists(_accountKey) 
      
        {

        for (uint i=0; i<accountIndex.length; i++) {
            if (accountIndex[i] == _accountKey) {
                // console.log("Found ", _accountKey, "at index", i);
                // console.log("Found accountMap[accountIndex[", i,  "]].accountKey ", accountMap[accountIndex[i]].accountKey);
                delete accountMap[accountIndex[i]];
                delete accountIndex[i];
                while ( i < accountIndex.length - 1) { 
                    accountIndex[i] = accountIndex[i + 1];
                    i++;
                }
            }
        }
        accountIndex.pop();
    } 


    modifier accountExists (address _accountKey) {
        require (isAccountInserted(_accountKey) , "Account does not exists");
        _;
    }

    modifier parentPatreonDoesNotExist(address _accountKey) {
        require (getAccountParentPatreonSize(_accountKey) == 0 &&
                 getAccountChildAgentSize(_accountKey) == 0, "Sponsor Account has a Patreon, (Patreon must Un-sponsor Sponsored Account)");
        _;
    }
    
    modifier parentSponsorDoesNotExist(address _accountKey) {
        require (getAccountParentSponsorSize(_accountKey) == 0, "Agent Account has a Parent Sponsor, (Patreon must Un-sponsor Sponsored Account)");
        _;
    }

    modifier childSponsorDoesNotExist(address _accountKey) {
        require (getChildSponsorSize(_accountKey) == 0, "Patreon Account has a Sponsor, (Patreon must Un-sponsor Sponsored Account)");
        _;
    }
    
    /*
    modifier childAgentDoesNotExist(address _accountKey) {
        require (getAccountChildAgentSize(_accountKey) == 0, "Sponsor Account has an Agent, (Patreon must Un-sponsor Sponsored Account)");
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
