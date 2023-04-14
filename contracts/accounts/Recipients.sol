// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./Accounts.sol";

contract Recipients is Accounts {
        constructor() {
    }

    /// @notice Create Patron and Recipient accounts if they do not exist
    /// @notice Relate Patron and Recipient accounts for POS sharing
    /// @param _patronKey public patron key to get recipient array
    /// @param _recipientKey new recipient to add to account list
    function addPatronRecipient(address _patronKey, address _recipientKey) 
        public onlyOwnerOrRootAdmin(_patronKey)
        nonRedundantRecipient ( _patronKey,  _recipientKey) {
        RecipientStruct storage recipientRecord = getRecipientRecordByKeys(_patronKey, _recipientKey);
        if (!recipientRecord.inserted) {
            addAccountRecord(_patronKey);
            addAccountRecord(_recipientKey);
            AccountStruct storage patronAccount = accountMap[_patronKey];
            AccountStruct storage recipientAccount = accountMap[_recipientKey];
            recipientRecord.insertionTime = block.timestamp;
            recipientRecord.patronKey = _patronKey;
            recipientRecord.recipientKey = _recipientKey;
            recipientRecord.stakedSPCoins = 0; // Coins not owned but Recipiented
            recipientRecord.inserted = true;
            patronAccount.recipientAccountList.push(_recipientKey);
            recipientAccount.patronAccountList.push(_patronKey);
        }
    }

    /*
    /// @notice determines if agent address is inserted in account.recipient.agent.map
    /// @param _patronKey public account key validate Insertion
    /// @param _recipientKey public recipient account key validate Insertion
    /// @param _recipientRateKey public agent account key validate Insertion
    function isAgentRateInserted(address _patronKey,address _recipientKey, uint _recipientRateKey, address _agentKey) public onlyOwnerOrRootAdmin(_patronKey) view returns (bool) {
        return getAgentRecordByKeys(_patronKey, _recipientKey, _recipientRateKey, _agentKey).inserted;
    }
*/

    /// @notice determines if recipient address is inserted in account.recipient.map
    /// @param _patronKey public account key validate Insertion
    /// @param _recipientKey public recipient account key validate Insertion
    function isRecipientInserted(address _patronKey, address _recipientKey) public onlyOwnerOrRootAdmin(_patronKey) view returns (bool) {
        return getRecipientRecordByKeys(_patronKey, _recipientKey).inserted;
    }
    function getRecipientRecordByKeys(address _patronKey, address _recipientKey) internal view onlyOwnerOrRootAdmin(_patronKey) returns (RecipientStruct storage) {
        AccountStruct storage accountRec = accountMap[_patronKey];
        RecipientStruct storage recipientRecord = accountRec.recipientMap[_recipientKey];
       return recipientRecord;
    }

    function serializeRecipientRecordStr(address _patronKey, address _recipientKey) public view returns (string memory) {
        RecipientStruct storage recipientRecord =  getRecipientRecordByKeys(_patronKey, _recipientKey);
        string memory recipientRecordStr = toString(recipientRecord.insertionTime);
        string memory stakedSPCoinsStr = toString(recipientRecord.stakedSPCoins);
        recipientRecordStr = concat(recipientRecordStr, ",", stakedSPCoinsStr);
        return recipientRecordStr;
    }

    //////////////////// NESTED AGENT METHODS /////////////////////////

    /// @notice retreives the recipient array records from a specific account address.
    /// @param _patronKey patron Key to retrieve the recipient list
    /// @param _recipientKey recipient Key to retrieve the recipient list
    function getrecipientRateList(address _patronKey, address _recipientKey) public view onlyOwnerOrRootAdmin(_recipientKey) returns (uint[] memory) {
        RecipientStruct storage recipientRecord = getRecipientRecordByKeys(_patronKey, _recipientKey);
        uint[] memory recipientRateList = recipientRecord.recipientRateList;
// console.log("AGENTS.SOL:addRecipientAgent: _patronKey, _recipientKey, _recipientRateKey, _recipientKey = " , _patronKey, _recipientKey, _recipientRateKey, _recipientKey);
// console.log("AGENTS.SOL:addRecipientAgent:recipientRecord.recipientKey = " , recipientRecord.recipientKey);
// console.log("AGENTS.SOL:getAgentRateKeys:recipientRateList.length = ",recipientRateList.length);
        return recipientRateList;
    }

    /*
    ///////////////////// DELETE RECIPIENT METHODS ////////////////////////
    modifier recipientExists (address _patronKey, address _recipientKey) {
        require (isRecipientInserted(_patronKey, _recipientKey) , "_recipientKey not found)");
        _;
    }
*/
}
