// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
/// @title ERC20 Contract
import "./DataTypes.sol";

contract Accounts is DataTypes {
    constructor() {}

    /// @notice determines if address is inserted in accountKey array
    /// @param _accountKey public accountKey validate Insertion
    function isAccountInserted(address _accountKey)
        public view onlyOwnerOrRootAdmin(_accountKey) returns (bool)
    {
        if (accountMap[_accountKey].inserted) return true;
        else return false;
    }

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

    function sayHelloWorld2() public pure returns (string memory) {
        return "Hello World 2";
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
        internal
        view
        onlyOwnerOrRootAdmin(_accountKey)
        returns (AccountStruct storage)
    {
        require(isAccountInserted(_accountKey));
        return accountMap[_accountKey];
    }

    /// @notice retreives the account record of a specific accountKey address.
    /// @param _accountKey public accountKey to set new balance
    function getSerializedAccountRec(address _accountKey)
        public
        view
        onlyOwnerOrRootAdmin(_accountKey)
        returns (string memory)
    {
        require(isAccountInserted(_accountKey));
        return serialize(accountMap[_accountKey]);
    }

    function serialize(AccountStruct storage accountRec)
        private
        view
        returns (string memory)
    {
        // ToDo Remove Next Line and Serialize the AccountRec
        string memory index = concat("index: ", toString(accountRec.index));
        string memory addr = concat(
            "accountKey: ",
            toString(accountRec.accountKey)
        );
        string memory insertionTime = concat(
            "insertionTime: ",
            toString(accountRec.insertionTime)
        );
        string memory verified = concat(
            "verified: ",
            toString(accountRec.verified)
        );
        string memory agentsSponsorKeys = toString(accountRec.agentsSponsorKeys);
        string memory beneficiaryKeys = toString(accountRec.beneficiaryKeys);
        string memory delimiter = "\\,";
        string memory seralized = concat(index, delimiter, addr, delimiter, insertionTime);
        seralized = concat(seralized, ",", verified);
        seralized = string(
            abi.encodePacked(index, "\\,\n",
                addr, "\\,\n", insertionTime, "\\,\n", verified ));
        seralized = concat(seralized, delimiter, "agentsSponsorKeys:", agentsSponsorKeys );
        seralized = concat(seralized, delimiter, "beneficiaryKeys:", beneficiaryKeys );


        // console.log("accountRec.accountKey:", accountRec.accountKey);
        // console.log( "toString(accountRec.accountKey)", toString(accountRec.accountKey));

        return seralized;
        // return  "QWERTYUIOP";
    }
}
