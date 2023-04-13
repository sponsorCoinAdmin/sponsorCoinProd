// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "./Sponsors.sol";

contract SponsorRates is Sponsors {

    constructor() { }

function addSponsorRate(address _patronKey, address _sponsorKey, uint _sponsorRateKey) 
    public onlyOwnerOrRootAdmin(_patronKey)
    nonRedundantSponsor ( _patronKey,  _sponsorKey) {
        addPatronSponsor(_patronKey, _sponsorKey);

        SponsorRateStruct storage sponsorRateRecord = getSponsorRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey);
        if (!sponsorRateRecord.inserted) {
            SponsorStruct storage sponsorRecord = getSponsorRecordByKeys(_patronKey, _sponsorKey);
            sponsorRateRecord.sponsorRate = _sponsorRateKey;
            sponsorRateRecord.inserted = true;
            sponsorRateRecord.insertionTime = sponsorRateRecord.lastUpdateTime = block.timestamp;
            sponsorRateRecord.stakedSPCoins = 0;
            sponsorRecord.sponsorRateKeys.push(_sponsorRateKey);
        } 
    }

    function getSponsorRateRecordByKeys(address _patronKey, address _sponsorKey, uint _sponsorRateKey) internal view onlyOwnerOrRootAdmin(_patronKey) returns (SponsorRateStruct storage) {
        SponsorStruct storage sponsorRecord = getSponsorRecordByKeys(_patronKey, _sponsorKey) ;
        return sponsorRecord.sponsorRateMap[_sponsorRateKey];
    }

    function serializesponsorRateRecordStr(address _patronKey, address _sponsorKey, uint256 _sponsorRateKey) public view returns (string memory) {
        SponsorRateStruct storage sponsorRateRecord =  getSponsorRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey);
        string memory sponsorRateRecordStr = toString(sponsorRateRecord.insertionTime);
        string memory lastUpdateTimeStr = toString(sponsorRateRecord.lastUpdateTime);
        string memory stakedSPCoinsStr = toString(sponsorRateRecord.stakedSPCoins);
        sponsorRateRecordStr = concat(sponsorRateRecordStr, ",", lastUpdateTimeStr, ",", stakedSPCoinsStr);
        return sponsorRateRecordStr;
    }
}
