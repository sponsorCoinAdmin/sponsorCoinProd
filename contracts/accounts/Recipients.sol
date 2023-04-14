// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./Accounts.sol";

contract Recipients is Accounts {
        constructor() {
    }

    /// @notice Create Sponsor and Recipient accounts if they do not exist
    /// @notice Relate Sponsor and Recipient accounts for POS sharing
    /// @param _sponsorKey public sponsor key to get recipient array
    /// @param _recipientKey new recipient to add to account list
    function addSponsorRecipient(address _sponsorKey, address _recipientKey) 
        public onlyOwnerOrRootAdmin(_sponsorKey)
        nonRedundantRecipient ( _sponsorKey,  _recipientKey) {
        RecipientStruct storage recipientRecord = getRecipientRecordByKeys(_sponsorKey, _recipientKey);
        if (!recipientRecord.inserted) {
            addAccountRecord(_sponsorKey);
            addAccountRecord(_recipientKey);
            AccountStruct storage sponsorAccount = accountMap[_sponsorKey];
            AccountStruct storage recipientAccount = accountMap[_recipientKey];
            recipientRecord.insertionTime = block.timestamp;
            recipientRecord.sponsorKey = _sponsorKey;
            recipientRecord.recipientKey = _recipientKey;
            recipientRecord.stakedSPCoins = 0; // Coins not owned but Recipiented
            recipientRecord.inserted = true;
            sponsorAccount.recipientAccountList.push(_recipientKey);
            recipientAccount.sponsorAccountList.push(_sponsorKey);
        }
    }

    /*
    /// @notice determines if agent address is inserted in account.recipient.agent.map
    /// @param _sponsorKey public account key validate Insertion
    /// @param _recipientKey public recipient account key validate Insertion
    /// @param _recipientRateKey public agent account key validate Insertion
    function isAgentRateInserted(address _sponsorKey,address _recipientKey, uint _recipientRateKey, address _agentKey) public onlyOwnerOrRootAdmin(_sponsorKey) view returns (bool) {
        return getAgentRecordByKeys(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey).inserted;
    }
*/

    /// @notice determines if recipient address is inserted in account.recipient.map
    /// @param _sponsorKey public account key validate Insertion
    /// @param _recipientKey public recipient account key validate Insertion
    function isRecipientInserted(address _sponsorKey, address _recipientKey) public onlyOwnerOrRootAdmin(_sponsorKey) view returns (bool) {
        return getRecipientRecordByKeys(_sponsorKey, _recipientKey).inserted;
    }
    function getRecipientRecordByKeys(address _sponsorKey, address _recipientKey) internal view onlyOwnerOrRootAdmin(_sponsorKey) returns (RecipientStruct storage) {
        AccountStruct storage accountRec = accountMap[_sponsorKey];
        RecipientStruct storage recipientRecord = accountRec.recipientMap[_recipientKey];
       return recipientRecord;
    }

    function serializeRecipientRecordStr(address _sponsorKey, address _recipientKey) public view returns (string memory) {
        RecipientStruct storage recipientRecord =  getRecipientRecordByKeys(_sponsorKey, _recipientKey);
        string memory recipientRecordStr = toString(recipientRecord.insertionTime);
        string memory stakedSPCoinsStr = toString(recipientRecord.stakedSPCoins);
        recipientRecordStr = concat(recipientRecordStr, ",", stakedSPCoinsStr);
        return recipientRecordStr;
    }

    //////////////////// NESTED AGENT METHODS /////////////////////////

    /// @notice retreives the recipient array records from a specific account address.
    /// @param _sponsorKey sponsor Key to retrieve the recipient list
    /// @param _recipientKey recipient Key to retrieve the recipient list
    function getrecipientRateList(address _sponsorKey, address _recipientKey) public view onlyOwnerOrRootAdmin(_recipientKey) returns (uint[] memory) {
        RecipientStruct storage recipientRecord = getRecipientRecordByKeys(_sponsorKey, _recipientKey);
        uint[] memory recipientRateList = recipientRecord.recipientRateList;
// console.log("AGENTS.SOL:addRecipientAgent: _sponsorKey, _recipientKey, _recipientRateKey, _recipientKey = " , _sponsorKey, _recipientKey, _recipientRateKey, _recipientKey);
// console.log("AGENTS.SOL:addRecipientAgent:recipientRecord.recipientKey = " , recipientRecord.recipientKey);
// console.log("AGENTS.SOL:getAgentRateKeys:recipientRateList.length = ",recipientRateList.length);
        return recipientRateList;
    }

    /*
    ///////////////////// DELETE RECIPIENT METHODS ////////////////////////
    modifier recipientExists (address _sponsorKey, address _recipientKey) {
        require (isRecipientInserted(_sponsorKey, _recipientKey) , "_recipientKey not found)");
        _;
    }
*/
}
