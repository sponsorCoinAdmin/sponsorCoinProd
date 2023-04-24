// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./Transactions.sol";

contract UnSubscribe is Transactions {
    constructor() { }
    
    /// @notice Remove all recipientship relationships for Sponsor and Recipient accounts
    /// @param _recipientKey Recipient to be removed from the Recipient relationship
    function deleteRecipientRecord(address _recipientKey)  
        public onlyOwnerOrRootAdmin("deleteRecipientRecord", msg.sender)
        accountExists(msg.sender)
        accountExists(_recipientKey)
        nonRedundantRecipient (msg.sender, _recipientKey) {
console.log("UN-SPONSOR FROM ACCOUNT", msg.sender, "FOR RECIPIANT",_recipientKey); 
 
        // Clean up Sponsor References and Balances
        // Move Recipient's steaked Coins back to Sponsors BalanceOf
        AccountStruct storage sponsorAccount = accountMap[msg.sender];
        // Remove Sponsors reference to Recipient in recipientAccountList
        if (deleteAccountRecordFromSearchKeys(_recipientKey, sponsorAccount.recipientAccountList)) {

            RecipientStruct storage recipientRecord = sponsorAccount.recipientMap[_recipientKey];
            uint256 totalSponsored = recipientRecord.stakedSPCoins;
            balanceOf[sponsorAccount.accountKey] += totalSponsored;
            sponsorAccount.stakedSPCoins -= totalSponsored;

            //Clean up Recipient's References
            deleteRecipientsReferences(recipientRecord);
         }
    }

    function deleteRecipientsReferences(RecipientStruct storage recipientRecord)  
    internal {
        AccountStruct storage recipientAccount = accountMap[recipientRecord.recipientKey];
        // console.log("*** deleteRecipientsReferences ***"); 
        // console.log("*** sponsorKey = ",recipientRecord.sponsorKey, "recipientKey = ", recipientRecord.recipientKey); 
        // console.log("*** recipientAccount.sponsorAccountList.length = ",recipientAccount.sponsorAccountList.length); 
        // for (uint i = 0; i < recipientAccount.sponsorAccountList.length ; i++)
        // console.log("*** BEFORE DELETE recipientAccount.sponsorAccountList[", i, "] = ",recipientAccount.sponsorAccountList[i]); 

        // Remove Recipients reference to the former Sponsor
        deleteAccountRecordFromSearchKeys(recipientRecord.sponsorKey, recipientAccount.sponsorAccountList);
        // deleteAccountRecordFromSearchKeys(_recipientKey, recipientAccount.agentAccountList);
        // for (uint i = 0; i < recipientAccount.sponsorAccountList.length ; i++)
        // console.log("*** AFTER DELETE recipientAccount.sponsorAccountList[", i, "] = ",recipientAccount.sponsorAccountList[i]); 
        deleteRecipientRateRecords(recipientRecord);
    
        deleteAccountRecordInternal(recipientRecord.recipientKey);
        deleteAccountRecordInternal(msg.sender);
    }

    function deleteRecipientRateRecords(RecipientStruct storage _recipientRecord) internal {
        // Delete Agent Rate Keys
        uint256[] storage recipientRateRecordList = _recipientRecord.recipientRateRecordList;
        AccountStruct storage recipientAccount = accountMap[_recipientRecord.recipientKey];

        uint i = recipientRateRecordList.length - 1;
        for (i; i >= 0; i--) {
            // console.log("====deleteRecipientRateRecords: recipientRateRecordList[", i, "] ", recipientRateRecordList[i]);
            uint256 recipientRateKey = recipientRateRecordList[i];
            RecipientRateStruct storage recipientRateRecord = _recipientRecord.recipientRateMap[recipientRateKey];

            deleteAgentRecords(recipientAccount, recipientRateRecord);
            recipientRateRecordList.pop();
            if (i == 0)
              break;
        }
    }

    // Delete recipient rate list.
    function deleteAgentRecords(AccountStruct storage recipientAccount, RecipientRateStruct storage recipientRateRecord) internal {
        address[] storage agentAccountList = recipientRateRecord.agentAccountList;
        uint i = agentAccountList.length - 1;
        for (i; i >= 0; i--) {
            // console.log("====deleteAgentRecord: Found agentKey[", i, "] ", agentAccountList[i]);
            address agentKey = agentAccountList[i];
            AccountStruct storage agentAccount = accountMap[agentKey];
            AgentStruct storage agentRec = recipientRateRecord.agentMap[agentKey];

            // console.log("***deleteAgentRecord:agentAccount.parentRecipientAccountList.length =", agentAccount.parentRecipientAccountList.length);

            // console.log(JUNK_COUNTER++,"Deleting recipientAccount.accountKey ", recipientAccount.accountKey,
            //  "From agentRec.agentKey ", agentRec.agentKey);
            deleteAccountRecordFromSearchKeys(recipientAccount.accountKey, accountMap[agentKey].parentRecipientAccountList);

            deleteAccountRecordInternal(agentRec.agentKey);
            agentAccountList.pop();
            if (i == 0)
              break;
        }
    }

    function deleteAgentRateRecords (AgentStruct storage agentRec) internal {
        uint256[] storage agentRateKeys = agentRec.agentRateKeys;
        // console.log("### BEFORE Delete agentRec.agentRateKeys.length = ", agentRec.agentRateKeys.length);
        uint i = agentRateKeys.length - 1;
        for (i; i >= 0; i--) {
            // console.log("====deleteAgentRateRecords: Found agentRateKeys[", i, "] ", agentRateKeys[i]);
            uint256 agentRateKey = agentRateKeys[i];
            AgentRateStruct storage agentRateRecord = agentRec.agentRateMap[agentRateKey];
            deleteAgentTransactions(agentRateRecord);

            agentRateKeys.pop();
            if (i == 0)
              break;
        }
        // delete the Agent Account Record if no References
        deleteAccountRecord(agentRec.agentKey);
    }

    // Delete recipient rate list.
    function deleteAgentTransactions(AgentRateStruct storage agentRateRecord) internal {
        TransactionStruct[] storage transactionList = agentRateRecord.transactionList;
        for (uint i= 0; i< transactionList.length; i++) { 
            // console.log("====deleteAgentRateRecord: Deleting transactionList[", i, "].quantity ", transactionList[i].quantity);
            delete transactionList[i];
            transactionList.pop();
        }
        // delete agentRateRecord;
    }

 /////////////////// DELETE ACCOUNT METHODS ////////////////////////

    function deleteAccountRecordFromSearchKeys(address _accountKey, 
    address[] storage _accountKeyList) internal returns (bool) {
        // console.log("************************************************************");
        // dumpAccounts("BEFORE", _accountKey, _accountKeyList);
        bool deleted = false;
        uint i = getAccountListIndex (_accountKey, _accountKeyList);
        for (i; i<_accountKeyList.length; i++) { 
            if (_accountKeyList[i] == _accountKey) {
                // console.log("==== Found _accountKeyList[", i, "] ", _accountKeyList[i]);
                // console.log("==== Found accountMap[_accountKeyList[", i,  "]].accountKey ", accountMap[_accountKeyList[i]].accountKey);
                delete _accountKeyList[i];
                if (_accountKeyList.length > 0)
                    _accountKeyList[i] = _accountKeyList[_accountKeyList.length - 1];
// ToDo                    deleteAccountRecordInternal();

                deleted = true;
                break;
            }
        }
        // dumpAccounts("AFTER", _accountKey, _accountKeyList);
        _accountKeyList.pop();
        // console.log("************************************************************");
        return deleted;
    }

    function deleteAccountRecordInternal(address _accountKey) 
    public returns (bool){

        // console.log("*** deleteAccountRecordInternal(", _accountKey,")");
        // console.log("accountMap[",_accountKey,"].sponsorAccountList.length =", accountMap[_accountKey].sponsorAccountList.length);
        // console.log("accountMap[",_accountKey,"].recipientAccountList.length =", accountMap[_accountKey].recipientAccountList.length);
        // console.log("accountMap[",_accountKey,"].agentAccountList.length =", accountMap[_accountKey].agentAccountList.length);
        // console.log("accountMap[",_accountKey,"].parentRecipientAccountList.length =", accountMap[_accountKey].parentRecipientAccountList.length);
        // console.log("****balanceOf[",accountMap[_accountKey].accountKey,"] =", balanceOf[accountMap[_accountKey].accountKey]);

        if(accountMap[_accountKey].sponsorAccountList.length == 0 &&
            accountMap[_accountKey].recipientAccountList.length == 0 &&
            accountMap[_accountKey].agentAccountList.length == 0 &&
            accountMap[_accountKey].parentRecipientAccountList.length == 0 &&
            balanceOf[accountMap[_accountKey].accountKey] == 0) {
            // console.log("*** DELETING ACCOUNT ", _accountKey);
            if (deleteAccountRecordFromSearchKeys(_accountKey,  AccountList)) {
                delete accountMap[_accountKey];
                return true;
            } 
        }
        return false;
    }

/* */
   
    function deleteAccountRecord(address _accountKey) public
        accountExists(_accountKey) 
        onlyOwnerOrRootAdmin("deleteAccountRecord", _accountKey)
        sponsorDoesNotExist(_accountKey)
        parentRecipientDoesNotExist(_accountKey)
        recipientDoesNotExist(_accountKey) 
        balanceOfIsEmpty(_accountKey) {
        if (deleteAccountRecordFromSearchKeys( _accountKey,  AccountList)) {
            delete accountMap[_accountKey];
        } 
    }

    modifier sponsorDoesNotExist(address _accountKey) {
        require (accountMap[_accountKey].sponsorAccountList.length == 0 &&
            accountMap[_accountKey].agentAccountList.length == 0, "Recipient Account has a Sponsor, (Sponsor must Un-recipient Recipiented Account)");
            _;
    }
    
    modifier balanceOfIsEmpty(address _accountKey) {
        require (balanceOf[accountMap[_accountKey].accountKey] == 0, "Agent Account has a Parent Recipient, (Sponsor must Un-recipient Recipiented Account)");
        _;
    }

    modifier parentRecipientDoesNotExist(address _accountKey) {
        require (accountMap[_accountKey].parentRecipientAccountList.length == 0, "Agent Account has a Parent Recipient, (Sponsor must Un-recipient Recipiented Account)");
        _;
    }

    modifier recipientDoesNotExist(address _sponsorKey) {
        require (getRecipientKeys(_sponsorKey).length == 0, "Sponsor Account has a Recipient, (Sponsor must Un-recipient Recipiented Account)");
        _;
    }
/*   
    modifier AgentDoesNotExist(address _accountKey) {
        require (accountMap[_accountKey](_accountKey).length == 0, "Recipient Account has an Agent, (Sponsor must Un-recipient Recipiented Account)");
        _;
    }
*/


}
