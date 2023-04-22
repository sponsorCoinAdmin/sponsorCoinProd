// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./Sponsor.sol";

contract Recipients is Sponsor {

    constructor() { }

    /// @notice Create Sponsor and Recipient accounts if they do not exist
    /// @notice Relate Sponsor and Recipient accounts for POS sharing
    /// @param _recipientKey new recipient to add to account list
    function addRecipient(address _recipientKey) 
    public nonRedundantRecipient (msg.sender, _recipientKey) {
        getRecipientRecord(msg.sender, _recipientKey);
        // console.log(JUNK_COUNTER++, "addRecipient", _recipientKey); 
    }

    function getRecipientRecord(address sponsor, address _recipientKey)
    internal nonRedundantRecipient (msg.sender, _recipientKey)
    returns (RecipientStruct storage) {
        AccountStruct storage sponsorRecord = getSponsorAccountRecord(sponsor);
        // console.log("getRecipientRecord(",sponsor , _recipientKey,")"); 

        RecipientStruct storage recipientRecord = accountMap[sponsor].recipientMap[_recipientKey];
        if (!recipientRecord.inserted) {
            addAccountRecord("Recipient", _recipientKey);
            recipientRecord.insertionTime = block.timestamp;
            recipientRecord.sponsorKey = msg.sender;
            recipientRecord.recipientKey = _recipientKey;
            recipientRecord.stakedSPCoins = 0; // Coins not owned but Recipiented
            recipientRecord.inserted = true;
            sponsorRecord.recipientAccountList.push(_recipientKey);
            accountMap[_recipientKey].sponsorAccountList.push(msg.sender);
        }
        return recipientRecord;
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

    function getRecipientRecordByKeys(address sponsor, address _recipientKey) internal view  returns (RecipientStruct storage) {
    ///////////////// **** WORKING HERE ****
        // console.log("XXXX-- Recipients.sol:sponsor = ",sponsor);
        // console.log("XXXX-- Recipients.sol:getRecipientRecordByKeys(",_recipientKey,")");
        RecipientStruct storage recipientRecord = accountMap[sponsor].recipientMap[_recipientKey];
        // console.log("XXXX-- recipientRecord.recipientKey = ", recipientRecord.recipientKey);
        return recipientRecord;
        // return accountMap[sponsor].recipientMap[_recipientKey];
    }

    function serializeRecipientRecordStr(address _recipientKey) public view returns (string memory) {
        RecipientStruct storage recipientRecord =  getRecipientRecordByKeys(msg.sender, _recipientKey);
        string memory recipientRecordStr = toString(recipientRecord.insertionTime);
        string memory stakedSPCoinsStr = toString(recipientRecord.stakedSPCoins);
        recipientRecordStr = concat(recipientRecordStr, ",", stakedSPCoinsStr);
        return recipientRecordStr;
    }

    //////////////////// NESTED AGENT METHODS /////////////////////////

    /// @notice retreives the recipient array records from a specific account address.
    /// @param _recipientKey recipient Key to retrieve the recipient list
    function getRecipientRateList(address _recipientKey)
     public view  returns (uint[] memory) {
        // console.log("Recipients.sol:getRecipientRateList (", _recipientKey, ")");
        RecipientStruct storage recipientRecord = getRecipientRecordByKeys(msg.sender, _recipientKey);
        uint[] memory recipientRateList = recipientRecord.recipientRateList;
        // console.log("Recipients.sol:getRecipientRateList recipientRateList.length = ", recipientRateList.length);
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
