// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./Transactions.sol";

contract UnSubscribe is Transactions {
    constructor() { }

    
    /// @notice Remove all sponsorship relationships for Patron and Sponsor accounts
    /// @param _patronKey Patron key containing the Sponsor relationship
    /// @param _sponsorKey Sponsor to be removed from the Sponsor relationship
    function deletePatronSponsorRecord(address _patronKey, address _sponsorKey)  
        public onlyOwnerOrRootAdmin(_patronKey)
        accountExists(_patronKey)
        accountExists(_sponsorKey)
        nonRedundantSponsor ( _patronKey,  _sponsorKey) {
    
        AccountStruct storage patronAccount = accountMap[_patronKey];
        if (deleteAccountRecordFromSearchKeys(_sponsorKey, patronAccount.sponsorAccountList)) {
            SponsorStruct storage sponsorRecord = patronAccount.sponsorMap[_sponsorKey];
            uint256 totalSponsoed = sponsorRecord.stakedSPCoins;
            AccountStruct storage sponsorAccount = accountMap[sponsorRecord.sponsorAccountKey];
            deleteAccountRecordFromSearchKeys(_sponsorKey, sponsorAccount.patronAccountList);
            deleteAccountRecordFromSearchKeys(_sponsorKey, sponsorAccount.agentAccountList);
            deleteSponsorRateRecords(sponsorRecord);
 
            patronAccount.balanceOf += totalSponsoed;
            patronAccount.stakedSPCoins -= totalSponsoed;
            deleteAccountRecordInternal(sponsorRecord.sponsorAccountKey);
        }
    }

    function deleteSponsorRateRecords(SponsorStruct storage _sponsorRecord) internal {
        // Delete Agent Rate Keys
        uint256[] storage sponsorRateKeys = _sponsorRecord.sponsorRateKeys;
        AccountStruct storage sponsorAccount = accountMap[_sponsorRecord.sponsorAccountKey];

        uint i = sponsorRateKeys.length - 1;
        for (i; i >=0; i--) {
            // console.log("====deleteSponsorRateRecords: sponsorRateKeys[", i, "] ", sponsorRateKeys[i]);
            uint256 sponsorRateKey = sponsorRateKeys[i];
            SponsorRateStruct storage sponsorRateRecord = _sponsorRecord.sponsorRateMap[sponsorRateKey];

            deleteSponsorRateRecord(sponsorAccount, sponsorRateRecord);
            sponsorRateKeys.pop();
            if (i == 0)
              break;
        }
    }

    // Delete sponsor rate list.
    function deleteSponsorRateRecord(AccountStruct storage sponsorAccount, SponsorRateStruct storage sponsorRateRecord) internal {
        address[] storage agentAccountList = sponsorRateRecord.agentAccountList;
        uint i = agentAccountList.length - 1;
        for (i; i >= 0; i--) {
            // console.log("====deleteSponsorRateRecord: Found agentAccountKey[", i, "] ", agentAccountList[i]);
            address agentAccountKey = agentAccountList[i];
            AgentStruct storage agentRec = sponsorRateRecord.agentMap[agentAccountKey];
            AccountStruct storage agentAccount = accountMap[agentAccountKey];

            // console.log("***** Deleting sponsorAccount.accountKey ", sponsorAccount.accountKey,
            //  "From agentRec.agentAccountKey ", agentRec.agentAccountKey);
            deleteAccountRecordFromSearchKeys(sponsorAccount.accountKey, agentAccount.parentSponsorAccountList);

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
        deleteAccountRecordInternal(agentRec.agentAccountKey);
    }

    // Delete sponsor rate list.
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
            // console.log("==== Found _accountKeyList[", i, "] ", _accountKeyList[i]);
            // console.log("==== Found accountMap[_accountKeyList[", i,  "]].accountKey ", accountMap[_accountKeyList[i]].accountKey);
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

        if(accountMap[_accountKey].patronAccountList.length == 0 &&
            accountMap[_accountKey].sponsorAccountList.length == 0 &&
            accountMap[_accountKey].agentAccountList.length == 0 &&
            accountMap[_accountKey].parentSponsorAccountList.length == 0) {
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
        parentsponsorDoesNotExist(_accountKey)
        sponsorDoesNotExist(_accountKey) {
        if (deleteAccountRecordFromSearchKeys( _accountKey,  AccountList)) {
            delete accountMap[_accountKey];
        } 
    }

    modifier patronDoesNotExist(address _accountKey) {
        require (accountMap[_accountKey].patronAccountList.length == 0 &&
            accountMap[_accountKey].agentAccountList.length == 0, "Sponsor Account has a Patron, (Patron must Un-sponsor Sponsored Account)");
            _;
    }
    
    modifier parentsponsorDoesNotExist(address _accountKey) {
        require (accountMap[_accountKey].parentSponsorAccountList.length == 0, "Agent Account has a Parent Sponsor, (Patron must Un-sponsor Sponsored Account)");
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


}
