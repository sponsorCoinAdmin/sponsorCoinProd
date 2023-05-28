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
            accountRec.creationTime = block.timestamp;
            accountRec.decimals = decimals;
            accountRec.stakedSPCoins = 0;
            accountRec.inserted = true;
            masterAccountList.push(_accountKey);
        }
    }

    function getAccountRecord(string memory accountType, address account)
        internal returns (AccountStruct storage accountRecord) {
            addAccountRecord(accountType, account);
            return accountMap[account];
    }

    function recipientHasSponsor(address _sponsorAccount, address _recipientAccount )
        internal view returns ( bool ) {
            bool sponsorFound = false;
            AccountStruct storage recipientAccount = accountMap[_recipientAccount];

            address[] storage sponsorAccountList = recipientAccount.sponsorAccountList;

            for (uint idx = 0; idx < sponsorAccountList.length; idx++) {
            if ( _sponsorAccount == sponsorAccountList[idx] )
                sponsorFound = true;
            }
            return sponsorFound;
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /// @notice determines if address Record is inserted in accountKey array
    /// @param _accountKey public accountKey validate Insertion
    function isAccountInserted(address _accountKey)
        public view returns (bool) {
        if (accountMap[_accountKey].inserted) 
            return true;
        else
            return false;
    }

    /// @notice retreives array list masterAccountList.
    function getAccountList() public view returns (address[] memory) {
        return masterAccountList;
    }

    /////////////////////////// AGENT REQUESTS //////////////////////////////
 
    /// @notice retreives the recipients of a specific address.
    /// @param _sponsorKey public account key to set new balance
    function getAccountRecipientList(address _sponsorKey) 
    public view returns (address[] memory) {
        return accountMap[_sponsorKey].recipientAccountList;
    }

    function getAccountListIndex (address _accountKey, 
        address[] storage _accountKeyList) internal view returns (uint) {
        uint i = 0;
        for (i; i < _accountKeyList.length; i++) {
            if (_accountKeyList[i] == _accountKey) {
                break;
            }
        }
        return i; 
    }

    modifier accountExists (address _accountKey) {
        require (isAccountInserted(_accountKey) , concat("Account ", toString(_accountKey), " not found"));
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