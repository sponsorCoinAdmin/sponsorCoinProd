// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "./Recipients.sol";

contract RecipientRates is Recipients {

    constructor() { }

function addRecipientRate(address _recipientKey, uint _recipientRateKey) 
    public nonRedundantRecipient (_recipientKey) {
console.log(JUNK_COUNTER++,"addRecipientRate", _recipientKey, _recipientRateKey); 
        addRecipient(_recipientKey);
console.log(JUNK_COUNTER++,"addRecipientRate 1"); 

        RecipientRateStruct storage recipientRateRecord = getRecipientRateRecordByKeys(_recipientKey, _recipientRateKey);
console.log(JUNK_COUNTER++,"addRecipientRate 2"); 
        if (!recipientRateRecord.inserted) {
console.log(JUNK_COUNTER++,"addRecipientRate 3"); 
            RecipientStruct storage recipientRecord = getRecipientRecordByKeys(_recipientKey);
            recipientRateRecord.recipientRate = _recipientRateKey;
            recipientRateRecord.inserted = true;
            recipientRateRecord.insertionTime = recipientRateRecord.lastUpdateTime = block.timestamp;
            recipientRateRecord.stakedSPCoins = 0;
            recipientRecord.recipientRateList.push(_recipientRateKey);
console.log(JUNK_COUNTER++,"addRecipientRate 4"); 
        } 
    }

    function getRecipientRateRecordByKeys(address _recipientKey, uint _recipientRateKey) internal view  returns (RecipientRateStruct storage) {
        RecipientStruct storage recipientRecord = getRecipientRecordByKeys(_recipientKey) ;
        return recipientRecord.recipientRateMap[_recipientRateKey];
    }

    function serializeRecipientRateRecordStr(address _recipientKey, uint256 _recipientRateKey) public view returns (string memory) {
        RecipientRateStruct storage recipientRateRecord =  getRecipientRateRecordByKeys(_recipientKey, _recipientRateKey);
        string memory recipientRateRecordStr = toString(recipientRateRecord.insertionTime);
        string memory lastUpdateTimeStr = toString(recipientRateRecord.lastUpdateTime);
        string memory stakedSPCoinsStr = toString(recipientRateRecord.stakedSPCoins);
        recipientRateRecordStr = concat(recipientRateRecordStr, ",", lastUpdateTimeStr, ",", stakedSPCoinsStr);
        return recipientRateRecordStr;
    }
}
