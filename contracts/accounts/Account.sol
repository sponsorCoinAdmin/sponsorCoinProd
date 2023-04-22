// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "../utils/StructSerialization.sol";

contract Account is StructSerialization {
    constructor() {}

    /// @notice insert block chain network address for spCoin Management
    /// @param _accountKey public accountKey to set new balance
    function addAccountRecord(string memory accountType, address _accountKey)
        internal {
        if (!isAccountInserted(_accountKey)) {
            // console.log("addAccountRecord(", accountType, _accountKey, ")");
// console.log(JUNK_COUNTER++, "addAccountRecord(", accountType, _accountKey, ")"); 
            AccountStruct storage accountRec = accountMap[_accountKey];
            accountRec.accountKey = _accountKey;
            accountRec.insertionTime = block.timestamp;
            accountRec.decimals = decimals;
            accountRec.stakedSPCoins = 0;
            accountRec.inserted = true;
            AccountList.push(_accountKey);
        }
    }

    function getAccountRecord(string memory accountType, address account)
        internal returns (AccountStruct storage accountRecord) {
            addAccountRecord(accountType, account);
            // console.log(JUNK_COUNTER++, "getAccountRecord", account);
            return accountMap[account];
    }

    /// @notice determines if address Record is inserted in accountKey array
    /// @param _accountKey public accountKey validate Insertion
    function isAccountInserted(address _accountKey)
        public view returns (bool) {
        if (accountMap[_accountKey].inserted) 
            return true;
        else
            return false;
    }

    /// @notice retreives array list AccountList.
    function getAccountList() public view returns (address[] memory) {
        return AccountList;
    }

    /////////////////////////// AGENT REQUESTS //////////////////////////////
 
    /// @notice retreives the recipients of a specific address.
    /// @param _sponsorKey public account key to set new balance
    function getRecipientKeys(address _sponsorKey) 
    public view returns (address[] memory) {
        return accountMap[_sponsorKey].recipientAccountList;
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
        public view returns (string memory) {
        require(isAccountInserted(_accountKey));
        return serializeAccount(accountMap[_accountKey]);
    }
}
