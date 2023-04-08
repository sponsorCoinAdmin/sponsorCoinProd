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

        SponsorRateStruct storage sponsorRateRec = getSponsorRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey);
        if (!sponsorRateRec.inserted) {
            SponsorStruct storage sponsorRec = getSponsorRecordByKeys(_patronKey, _sponsorKey);
            sponsorRateRec.sponsorRate = _sponsorRateKey;
            sponsorRateRec.inserted = true;
            sponsorRateRec.insertionTime = sponsorRateRec.lastUpdateTime = block.timestamp;
            sponsorRateRec.stakedSPCoins = 0;
            sponsorRec.sponsorRateKeys.push(_sponsorRateKey);
        } 
    }

    function getSponsorRateRecordByKeys(address _patronKey, address _sponsorKey, uint _sponsorRateKey) internal view onlyOwnerOrRootAdmin(_patronKey) returns (SponsorRateStruct storage) {
        SponsorStruct storage sponsorRec = getSponsorRecordByKeys(_patronKey, _sponsorKey) ;
        return sponsorRec.sponsorRateMap[_sponsorRateKey];
    }

    function serializeSponsorRateRecordStr(address _patronKey, address _sponsorKey, uint256 _sponsorRateKey) public view returns (string memory) {
        SponsorRateStruct storage sponsorRateRec =  getSponsorRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey);
        string memory sponsorRateRecordStr = toString(sponsorRateRec.insertionTime);
        string memory lastUpdateTimeStr = toString(sponsorRateRec.lastUpdateTime);
        string memory stakedSPCoinsStr = toString(sponsorRateRec.stakedSPCoins);
        sponsorRateRecordStr = concat(sponsorRateRecordStr, ",", lastUpdateTimeStr, ",", stakedSPCoinsStr);
        return sponsorRateRecordStr;
    }
}
