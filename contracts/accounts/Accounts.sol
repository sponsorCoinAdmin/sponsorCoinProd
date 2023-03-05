// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
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
    function getAccountSize() public view returns (uint256) {
        return accountIndex.length;
    }

    /// @notice retreives a specified account address from accountIndex.
    /// @param _idx index of a specific account in accountIndex
    function getAccountKey(uint256 _idx) public view returns (address) {
        return accountIndex[_idx];
    }

    /// @notice retreives the account record of a specific accountKey address.
    /// @param _accountKey public accountKey to set new balance
    function getAccountRecordord(address _accountKey)
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
        address sponsor = accountRec.accountPatreonKeys[patreonIdx];
        return sponsor;
    }

    /// @notice retreives the sponsor array record size of the Patreon list.
    /// @param _accountKey public account key to get Sponsor Record Length
    function getPatreonSize(address _accountKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (uint) {
        return getPatreonList(_accountKey).length;
    }

    /// @notice retreives the sponsor array records for the Patreon list
    /// @param _accountKey public account key to get Sponsor Record Length
    function getPatreonList(address _accountKey) internal onlyOwnerOrRootAdmin(_accountKey) view returns (address[] memory) {
        AccountStruct storage account = accountMap[_accountKey];
        address[] storage accountPatreonKeys = account.accountPatreonKeys;
        return accountPatreonKeys;
    }

     /////////////////////////// AGENT REQUESTS //////////////////////////////

    /// @notice get address for an account agent
    /// @param _accountKey public account key to get sponsor array
    /// @param _agentIdx new patreon to add to account list
    function getAccountAgentKeyByIndex(address _accountKey, uint _agentIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        AccountStruct storage accountRec = accountMap[_accountKey];
        address sponsor = accountRec.accountAgentKeys[_agentIdx];
        return sponsor;
    }

    /// @notice retreives the sponsor array record size of the Patreon list.
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAgentRecordSize(address _accountKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (uint) {
        return getAgentList(_accountKey).length;
    }

    /// @notice retreives the sponsor array records for the Patreon list
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAgentList(address _accountKey) internal onlyOwnerOrRootAdmin(_accountKey) view returns (address[] memory) {
        AccountStruct storage account = accountMap[_accountKey];
        address[] storage accountAgentKeys = account.accountAgentKeys;
        return accountAgentKeys;
    }

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
