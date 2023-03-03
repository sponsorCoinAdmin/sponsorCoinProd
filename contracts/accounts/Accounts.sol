// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
/// @title ERC20 Contract
import "./DataTypes.sol";

contract Accounts is DataTypes {
    constructor() {}

    /// @notice insert block chain network address for spCoin Management
    /// @param _accountKey public accountKey to set new balance
    function addNetworkAccount(address _accountKey)
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
    function getNetworkAccountCount() public view returns (uint256) {
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

    /// @notice get address for an account contributor
    /// @param _accountKey public account key to get sponsor array
    /// @param contributorIdx new contributor to add to account list
    function getBeneficiaryKeyAddress(address _accountKey, uint contributorIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        AccountStruct storage accountRec = accountMap[_accountKey];
        address sponsor = accountRec.contributorAccountKeys[contributorIdx];
        return sponsor;
    }

    /// @notice retreives the sponsor array record size of the Beneficiary list.
    /// @param _accountKey public account key to get Sponsor Record Length
    function getBeneficiaryRecordCount(address _accountKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (uint) {
        return getBeneficiaryList(_accountKey).length;
    }

    /// @notice retreives the sponsor array records for the Beneficiary list
    /// @param _accountKey public account key to get Sponsor Record Length
    function getBeneficiaryList(address _accountKey) internal onlyOwnerOrRootAdmin(_accountKey) view returns (address[] memory) {
        AccountStruct storage account = accountMap[_accountKey];
        address[] storage contributorAccountKeys = account.contributorAccountKeys;
        return contributorAccountKeys;
    }

     /////////////////////////// AGENT REQUESTS //////////////////////////////

    /// @notice get address for an account agent
    /// @param _accountKey public account key to get sponsor array
    /// @param _agentIdx new contributor to add to account list
    function getAgentKeyAddress(address _accountKey, uint _agentIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        AccountStruct storage accountRec = accountMap[_accountKey];
        address sponsor = accountRec.agentKeys[_agentIdx];
        return sponsor;
    }

    /// @notice retreives the sponsor array record size of the Beneficiary list.
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAgentRecordCount(address _accountKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (uint) {
        return getAgentList(_accountKey).length;
    }

    /// @notice retreives the sponsor array records for the Beneficiary list
    /// @param _accountKey public account key to get Sponsor Record Length
    function getAgentList(address _accountKey) internal onlyOwnerOrRootAdmin(_accountKey) view returns (address[] memory) {
        AccountStruct storage account = accountMap[_accountKey];
        address[] storage agentKeys = account.agentKeys;
        return agentKeys;
    }

     /////////////////// ACCOUNT SERIALIZATION REQUESTS ////////////////////////

     /// @notice retreives the account record of a specific accountKey address.
    /// @param _accountKey public accountKey to set new balance
    function getSerializedAccountRec(address _accountKey)
        public view onlyOwnerOrRootAdmin(_accountKey)
        returns (string memory)
    {
        require(isAccountInserted(_accountKey));
        return serialize(accountMap[_accountKey]);
    }

    function serialize(AccountStruct storage _accountRec)
        private view returns (string memory)
    {
        // ToDo Remove Next Line and Serialize the AccountRec
        string memory index = concat("index: ", toString(_accountRec.index));
        string memory addr = concat(
            "accountKey: ",
            toString(_accountRec.accountKey)
        );
        string memory insertionTime = concat(
            "insertionTime: ",
            toString(_accountRec.insertionTime)
        );
        string memory verified = concat(
            "verified: ",
            toString(_accountRec.verified)
        );
        string memory agentKeys = toString(_accountRec.agentKeys);
        string memory contributorAccountKeys = toString(_accountRec.contributorAccountKeys);
        string memory delimiter = "\\,";
        string memory seralized = concat(index, delimiter, addr, delimiter, insertionTime);
        seralized = concat(seralized, ",", verified);
        seralized = string(
            abi.encodePacked(index, "\\,\n",
                addr, "\\,\n", insertionTime, "\\,\n", verified ));
        seralized = concat(seralized, delimiter, "agentKeys:", agentKeys );
        seralized = concat(seralized, delimiter, "contributorAccountKeys:", contributorAccountKeys );
        seralized = concat(seralized, delimiter, "agentKeys:", agentKeys );

        // console.log("_accountRec.accountKey:", _accountRec.accountKey);
        // console.log( "toString(_accountRec.accountKey)", toString(_accountRec.accountKey));

        return seralized;
    }
}
