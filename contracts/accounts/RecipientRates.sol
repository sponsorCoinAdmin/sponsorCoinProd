// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "./Recipients.sol";

contract RecipientRates is Recipients {

    constructor() { }

function addRecipientRate(address _recipientKey, uint _recipientRateKey) 
    public nonRedundantRecipient (msg.sender, _recipientKey) {
console.log(JUNK_COUNTER++,"Recipients.sol:addRecipientRate", _recipientKey, _recipientRateKey); 
        addRecipient(_recipientKey);

        RecipientRateStruct storage recipientRateRecord = getRecipientRateRecordByKeys(_recipientKey, _recipientRateKey);
        if (!recipientRateRecord.inserted) {
            RecipientStruct storage recipientRecord = getRecipientRecordByKeys(msg.sender, _recipientKey);
            console.log(JUNK_COUNTER,"Recipients.sol:recipientRateRecord.inserted = ", recipientRecord.inserted); 
            recipientRateRecord.recipientRate = _recipientRateKey;
            recipientRateRecord.inserted = true;
            recipientRateRecord.insertionTime = recipientRateRecord.lastUpdateTime = block.timestamp;
            recipientRateRecord.stakedSPCoins = 0;
            recipientRecord.recipientRateList.push(_recipientRateKey);
        } 
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
