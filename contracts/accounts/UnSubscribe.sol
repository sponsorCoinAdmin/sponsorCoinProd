// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./Transactions.sol";

contract UnSubscribe is Transactions {
    constructor() { }

    
    /// @notice Remove all benificiariaship relationships for Patron and Benificiary accounts
    /// @param _patronKey Patron key containing the Benificiary relationship
    /// @param _benificiaryKey Benificiary to be removed from the Benificiary relationship
    function deletePatronBenificiaryRecord(address _patronKey, address _benificiaryKey)  
        public onlyOwnerOrRootAdmin(_patronKey)
        accountExists(_patronKey)
        accountExists(_benificiaryKey)
        nonRedundantBenificiary ( _patronKey,  _benificiaryKey) {
    
        AccountStruct storage patronAccount = accountMap[_patronKey];
        if (deleteAccountRecordFromSearchKeys(_benificiaryKey, patronAccount.benificiaryAccountList)) {
            BenificiaryStruct storage benificiaryRecord = patronAccount.benificiaryMap[_benificiaryKey];
            uint256 totalSponsoed = benificiaryRecord.stakedSPCoins;
            AccountStruct storage benificiaryAccount = accountMap[benificiaryRecord.benificiaryKey];
            deleteAccountRecordFromSearchKeys(_benificiaryKey, benificiaryAccount.patronAccountList);
            deleteAccountRecordFromSearchKeys(_benificiaryKey, benificiaryAccount.agentAccountList);
            deleteBenificiaryRateRecords(benificiaryRecord);
 
            patronAccount.balanceOf += totalSponsoed;
            patronAccount.stakedSPCoins -= totalSponsoed;
            deleteAccountRecordInternal(benificiaryRecord.benificiaryKey);
        }
    }

    function deleteBenificiaryRateRecords(BenificiaryStruct storage _benificiaryRecord) internal {
        // Delete Agent Rate Keys
        uint256[] storage benificiaryRateList = _benificiaryRecord.benificiaryRateList;
        AccountStruct storage benificiaryAccount = accountMap[_benificiaryRecord.benificiaryKey];

        uint i = benificiaryRateList.length - 1;
        for (i; i >=0; i--) {
            // console.log("====deleteBenificiaryRateRecords: benificiaryRateList[", i, "] ", benificiaryRateList[i]);
            uint256 benificiaryRateKey = benificiaryRateList[i];
            BenificiaryRateStruct storage benificiaryRateRecord = _benificiaryRecord.benificiaryRateMap[benificiaryRateKey];

            deleteBenificiaryRateRecord(benificiaryAccount, benificiaryRateRecord);
            benificiaryRateList.pop();
            if (i == 0)
              break;
        }
    }

    // Delete benificiary rate list.
    function deleteBenificiaryRateRecord(AccountStruct storage benificiaryAccount, BenificiaryRateStruct storage benificiaryRateRecord) internal {
        address[] storage agentAccountList = benificiaryRateRecord.agentAccountList;
        uint i = agentAccountList.length - 1;
        for (i; i >= 0; i--) {
            // console.log("====deleteBenificiaryRateRecord: Found agentKey[", i, "] ", agentAccountList[i]);
            address agentKey = agentAccountList[i];
            AgentStruct storage agentRec = benificiaryRateRecord.agentMap[agentKey];
            AccountStruct storage agentAccount = accountMap[agentKey];

            // console.log("***** Deleting benificiaryAccount.accountKey ", benificiaryAccount.accountKey,
            //  "From agentRec.agentKey ", agentRec.agentKey);
            deleteAccountRecordFromSearchKeys(benificiaryAccount.accountKey, agentAccount.parentBenificiaryAccountList);

            deleteAgentRateRecords(agentRec);
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
        deleteAccountRecordInternal(agentRec.agentKey);
    }

    // Delete benificiary rate list.
    function deleteAgentTransactions(AgentRateStruct storage agentRateRecord) internal {
        TransactionStruct[] storage transactionList = agentRateRecord.transactionList;
        for (uint i=0; i< transactionList.length; i++) { 
            // console.log("====deleteAgentRateRecord: Deleting transactionList[", i, "].quantity ", transactionList[i].quantity);
            delete transactionList[i];
            transactionList.pop();
        }
        // delete agentRateRecord;
    }

 /////////////////// DELETE ACCOUNT METHODS ////////////////////////

    function deleteAccountRecordFromSearchKeys(address _accountKey, 
    address[] storage _accountKeyList) internal returns (bool) {
    bool deleted = false;
    uint i = getAccountListIndex (_accountKey, _accountKeyList);
    for (i; i<_accountKeyList.length; i++) { 
        if (_accountKeyList[i] == _accountKey) {
            console.log("==== Found _accountKeyList[", i, "] ", _accountKeyList[i]);
            console.log("==== Found accountMap[_accountKeyList[", i,  "]].accountKey ", accountMap[_accountKeyList[i]].accountKey);
            delete _accountKeyList[i];
            if (i > 0)
                _accountKeyList[i] = _accountKeyList[_accountKeyList.length - 1];
            deleted = true;
        }
    }
    _accountKeyList.pop();

    return deleted;
    }

    function deleteAccountRecordInternal(address _accountKey) internal
    accountExists(_accountKey) 
    onlyOwnerOrRootAdmin(_accountKey) {

        console.log("*** deleteAccountRecordInternal(", _accountKey,")");
        console.log("accountMap[",_accountKey,"].patronAccountList.length =", accountMap[_accountKey].patronAccountList.length);
        console.log("accountMap[",_accountKey,"].benificiaryAccountList.length =", accountMap[_accountKey].benificiaryAccountList.length);
        console.log("accountMap[",_accountKey,"].agentAccountList.length =", accountMap[_accountKey].agentAccountList.length);
        console.log("accountMap[",_accountKey,"].parentBenificiaryAccountList.length =", accountMap[_accountKey].parentBenificiaryAccountList.length);
        if(accountMap[_accountKey].patronAccountList.length == 0 &&
            accountMap[_accountKey].benificiaryAccountList.length == 0 &&
            accountMap[_accountKey].agentAccountList.length == 0 &&
            accountMap[_accountKey].parentBenificiaryAccountList.length == 0) {
            console.log("*** DELETING ACCOUNT ", _accountKey);
            if (deleteAccountRecordFromSearchKeys(_accountKey,  AccountList)) {
                delete accountMap[_accountKey];
            } 
        }
    }

/* */
   
    function deleteAccountRecord(address _accountKey) public
        accountExists(_accountKey) 
        onlyOwnerOrRootAdmin(_accountKey)
        patronDoesNotExist(_accountKey)
        parentbenificiaryDoesNotExist(_accountKey)
        benificiaryDoesNotExist(_accountKey) {
        if (deleteAccountRecordFromSearchKeys( _accountKey,  AccountList)) {
            delete accountMap[_accountKey];
        } 
    }

    modifier patronDoesNotExist(address _accountKey) {
        require (accountMap[_accountKey].patronAccountList.length == 0 &&
            accountMap[_accountKey].agentAccountList.length == 0, "Benificiary Account has a Patron, (Patron must Un-benificiary Benificiaryed Account)");
            _;
    }
    
    modifier parentbenificiaryDoesNotExist(address _accountKey) {
        require (accountMap[_accountKey].parentBenificiaryAccountList.length == 0, "Agent Account has a Parent Benificiary, (Patron must Un-benificiary Benificiaryed Account)");
        _;
    }

    modifier benificiaryDoesNotExist(address _patronKey) {
        require (getBenificiaryKeys(_patronKey).length == 0, "Patron Account has a Benificiary, (Patron must Un-benificiary Benificiaryed Account)");
        _;
    }
/*   
    modifier AgentDoesNotExist(address _accountKey) {
        require (accountMap[_accountKey](_accountKey).length == 0, "Benificiary Account has an Agent, (Patron must Un-benificiary Benificiaryed Account)");
        _;
    }
*/


}
