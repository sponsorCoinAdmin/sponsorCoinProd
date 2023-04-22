// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "./Recipient.sol";

contract RecipientRates is Recipient {

    constructor() { }

    /// @notice insert recipients Agent
    /// @param _recipientKey public account key to get recipient array
    /// @param _recipientRateKey public account key to get recipient Rate for a given recipient
    function getRecipientRateRecord(address _sponsorKey, address _recipientKey, uint _recipientRateKey) 
    internal nonRedundantRecipient (_sponsorKey, _recipientKey)
    returns (RecipientRateStruct storage) {
        RecipientStruct storage recipientRecord = getRecipientRecord(_sponsorKey, _recipientKey);
// console.log(JUNK_COUNTER++,"Recipient.sol:getRecipientRateRecord", _recipientKey, _recipientRateKey); 

        RecipientRateStruct storage recipientRateRecord = getRecipientRateRecordByKeys(_recipientKey, _recipientRateKey);
        if (!recipientRateRecord.inserted) {
            // console.log(JUNK_COUNTER,"Recipient.sol:recipientRateRecord.inserted = ", recipientRecord.inserted); 
            recipientRateRecord.recipientRate = _recipientRateKey;
            recipientRateRecord.inserted = true;
            recipientRateRecord.insertionTime = recipientRateRecord.lastUpdateTime = block.timestamp;
            recipientRateRecord.stakedSPCoins = 0;
            recipientRecord.recipientRateList.push(_recipientRateKey);
        }
        return recipientRateRecord; 
    }

    function getRecipientRateRecordByKeys(address _recipientKey, uint _recipientRateKey) internal view  returns (RecipientRateStruct storage) {
        RecipientStruct storage recipientRecord = getRecipientRecordByKeys(msg.sender, _recipientKey) ;
        return recipientRecord.recipientRateMap[_recipientRateKey];
    }

    function serializeRecipientRateRecordStr(address _recipientKey, uint256 _recipientRateKey) public view returns (string memory) {
        // console.log("ZZZZ serializeRecipientRateRecordStr recipientRateRecordStr ", _recipientKey, _recipientRateKey);
        RecipientRateStruct storage recipientRateRecord =  getRecipientRateRecordByKeys(_recipientKey, _recipientRateKey);
        string memory recipientRateRecordStr = toString(recipientRateRecord.insertionTime);
        string memory lastUpdateTimeStr = toString(recipientRateRecord.lastUpdateTime);
        string memory stakedSPCoinsStr = toString(recipientRateRecord.stakedSPCoins);
        recipientRateRecordStr = concat(recipientRateRecordStr, ",", lastUpdateTimeStr, ",", stakedSPCoinsStr);
        // console.log("ZZZZ serializeRecipientRateRecordStr recipientRateRecordStr ", recipientRateRecordStr);
        return recipientRateRecordStr;
    }
}
