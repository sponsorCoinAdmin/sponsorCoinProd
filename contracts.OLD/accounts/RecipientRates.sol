// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "./Recipients.sol";

contract RecipientRates is Recipients {

    constructor() { }

function addRecipientRate(address _recipientKey, uint _recipientRateKey) 
    public nonRedundantRecipient (msg.sender, _recipientKey) {
        RecipientStruct storage recipientRecord = getRecipientRecord(msg.sender, _recipientKey);
console.log(JUNK_COUNTER++,"Recipients.sol:addRecipientRate", _recipientKey, _recipientRateKey); 

        RecipientRateStruct storage recipientRateRecord = getRecipientRateRecordByKeys(_recipientKey, _recipientRateKey);
        if (!recipientRateRecord.inserted) {
            // console.log(JUNK_COUNTER,"Recipients.sol:recipientRateRecord.inserted = ", recipientRecord.inserted); 
            recipientRateRecord.recipientRate = _recipientRateKey;
            recipientRateRecord.inserted = true;
            recipientRateRecord.insertionTime = recipientRateRecord.lastUpdateTime = block.timestamp;
            recipientRateRecord.stakedSPCoins = 0;
            recipientRecord.recipientRateList.push(_recipientRateKey);
// console.log(JUNK_COUNTER,"Recipients.sol:recipientRecord.recipientRateList.length = ", recipientRecord.recipientRateList.length); 
// console.log(JUNK_COUNTER,"Recipients.sol:recipientRecord.recipientRateList[0] = ", recipientRecord.recipientRateList[0]); 
// console.log(JUNK_COUNTER,"Recipients.sol:recipientRecord.recipientRateList[0] = ", recipientRecord.recipientRateList[0]); 
        } 
    }

    function getRecipientRateRecordByKeys(address _recipientKey, uint _recipientRateKey) internal returns (RecipientRateStruct storage) {
        RecipientStruct storage recipientRecord = getRecipientRecord(msg.sender, _recipientKey);
        return recipientRecord.recipientRateMap[_recipientRateKey];
    }

    function serializeRecipientRateRecordStr(address _recipientKey, uint256 _recipientRateKey) public returns (string memory) {
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
