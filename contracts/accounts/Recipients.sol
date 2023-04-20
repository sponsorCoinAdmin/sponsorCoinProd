// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./Accounts.sol";

contract Recipients is Accounts {
        constructor() {
    }

    /// @notice Create Sponsor and Recipient accounts if they do not exist
    /// @notice Relate Sponsor and Recipient accounts for POS sharing
    /// @param _recipientKey new recipient to add to account list
    function addRecipient(address _recipientKey) 
        public nonRedundantRecipient (_recipientKey) {
console.log(JUNK_COUNTER++,"addRecipient"); 
        RecipientStruct storage recipientRecord = getRecipientRecordByKeys(_recipientKey);
        console.log(JUNK_COUNTER++,"addRecipient 1"); 
        if (!recipientRecord.inserted) {
console.log(JUNK_COUNTER++,"addRecipient 2"); 
            addAccountRecord(msg.sender);
            addAccountRecord(_recipientKey);
console.log(JUNK_COUNTER++,"addRecipient 3"); 
            recipientRecord.insertionTime = block.timestamp;
            recipientRecord.sponsorKey = msg.sender;
            recipientRecord.recipientKey = _recipientKey;
            recipientRecord.stakedSPCoins = 0; // Coins not owned but Recipiented
            recipientRecord.inserted = true;
            accountMap[msg.sender].recipientAccountList.push(_recipientKey);
            accountMap[_recipientKey].sponsorAccountList.push(msg.sender);
console.log(JUNK_COUNTER++,"addRecipient 4"); 
        }
    }

    /*
    /// @notice determines if agent address is inserted in account.recipient.agent.map
    /// @param _sponsorKey public account key validate Insertion
    /// @param _recipientKey public recipient account key validate Insertion
    /// @param _recipientRateKey public agent account key validate Insertion
    function isAgentRateInserted(address _sponsorKey,address _recipientKey, uint _recipientRateKey, address _agentKey) 
    public onlyOwnerOrRootAdmin("isAgentRateInserted", _sponsorKey) view returns (bool) {
        return getAgentRecordByKeys(_recipientKey, _recipientRateKey, _agentKey).inserted;
    }
*/

    /// @notice determines if recipient address is inserted in account.recipient.map
    /// @param _recipientKey public recipient account key validate Insertion
    function isRecipientInserted(address _recipientKey) public view returns (bool) {
        return getRecipientRecordByKeys(_recipientKey).inserted;
    }

    function getRecipientRecordByKeys(address _recipientKey) internal view  returns (RecipientStruct storage) {
       return accountMap[msg.sender].recipientMap[_recipientKey];
    }

    function serializeRecipientRecordStr(address _recipientKey) public view returns (string memory) {
        RecipientStruct storage recipientRecord =  getRecipientRecordByKeys(_recipientKey);
        string memory recipientRecordStr = toString(recipientRecord.insertionTime);
        string memory stakedSPCoinsStr = toString(recipientRecord.stakedSPCoins);
        recipientRecordStr = concat(recipientRecordStr, ",", stakedSPCoinsStr);
        return recipientRecordStr;
    }

    //////////////////// NESTED AGENT METHODS /////////////////////////

    /// @notice retreives the recipient array records from a specific account address.
    /// @param _recipientKey recipient Key to retrieve the recipient list
    function getRecipientRateList(address _recipientKey)
     public view onlyOwnerOrRootAdmin(",getRecipientRateList", _recipientKey) returns (uint[] memory) {
        RecipientStruct storage recipientRecord = getRecipientRecordByKeys(_recipientKey);
        uint[] memory recipientRateList = recipientRecord.recipientRateList;
    // console.log("AGENTS.SOL:addAgent: _sponsorKey, _recipientKey, _recipientRateKey, _recipientKey = " , _sponsorKey, _recipientKey, _recipientRateKey, _recipientKey);
// console.log("AGENTS.SOL:addAgent:recipientRecord.recipientKey = " , recipientRecord.recipientKey);
// console.log("AGENTS.SOL:getAgentRateKeys:recipientRateList.length = ",recipientRateList.length);
        return recipientRateList;
    }

    /*
    ///////////////////// DELETE RECIPIENT METHODS ////////////////////////
    modifier recipientExists (address _sponsorKey, address _recipientKey) {
        require (isRecipientInserted(_recipientKey) , "_recipientKey not found)");
        _;
    }
*/
}
