// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "./Benificiarias.sol";

contract BenificiaryRates is Benificiarias {

    constructor() { }

function addBenificiaryRate(address _patronKey, address _benificiaryKey, uint _benificiaryRateKey) 
    public onlyOwnerOrRootAdmin(_patronKey)
    nonRedundantBenificiary ( _patronKey,  _benificiaryKey) {
        addPatronBenificiary(_patronKey, _benificiaryKey);

        BenificiaryRateStruct storage benificiaryRateRecord = getBenificiaryRateRecordByKeys(_patronKey, _benificiaryKey, _benificiaryRateKey);
        if (!benificiaryRateRecord.inserted) {
            BenificiaryStruct storage benificiaryRecord = getBenificiaryRecordByKeys(_patronKey, _benificiaryKey);
            benificiaryRateRecord.benificiaryRate = _benificiaryRateKey;
            benificiaryRateRecord.inserted = true;
            benificiaryRateRecord.insertionTime = benificiaryRateRecord.lastUpdateTime = block.timestamp;
            benificiaryRateRecord.stakedSPCoins = 0;
            benificiaryRecord.benificiaryRateList.push(_benificiaryRateKey);
        } 
    }

    function getBenificiaryRateRecordByKeys(address _patronKey, address _benificiaryKey, uint _benificiaryRateKey) internal view onlyOwnerOrRootAdmin(_patronKey) returns (BenificiaryRateStruct storage) {
        BenificiaryStruct storage benificiaryRecord = getBenificiaryRecordByKeys(_patronKey, _benificiaryKey) ;
        return benificiaryRecord.benificiaryRateMap[_benificiaryRateKey];
    }

    function serializebenificiaryRateRecordStr(address _patronKey, address _benificiaryKey, uint256 _benificiaryRateKey) public view returns (string memory) {
        BenificiaryRateStruct storage benificiaryRateRecord =  getBenificiaryRateRecordByKeys(_patronKey, _benificiaryKey, _benificiaryRateKey);
        string memory benificiaryRateRecordStr = toString(benificiaryRateRecord.insertionTime);
        string memory lastUpdateTimeStr = toString(benificiaryRateRecord.lastUpdateTime);
        string memory stakedSPCoinsStr = toString(benificiaryRateRecord.stakedSPCoins);
        benificiaryRateRecordStr = concat(benificiaryRateRecordStr, ",", lastUpdateTimeStr, ",", stakedSPCoinsStr);
        return benificiaryRateRecordStr;
    }
}
