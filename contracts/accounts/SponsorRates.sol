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
    SponsorStruct storage sponsorRec = getSponsorRecordByKeys(_patronKey, _sponsorKey);
    mapping(uint256 => SponsorRateStruct) storage sponsorRateMap = sponsorRec.sponsorRateMap;
    SponsorRateStruct storage sponsorRateRec = sponsorRateMap[_sponsorRateKey];

    if (!sponsorRateRec.inserted) {
        sponsorRateRec.sponsorRate = _sponsorRateKey;
        sponsorRateRec.inserted = true;
        sponsorRateRec.insertionTime = sponsorRateRec.lastUpdateTime = block.timestamp;
        sponsorRateRec.stakedTransactionsSponsored = 0;
        sponsorRec.sponsorRateKeys.push(_sponsorRateKey);
    } 
}

    function getSponsorRateRecordByKeys(address _patronKey, address _sponsorKey, uint _sponsorRateKey) internal view onlyOwnerOrRootAdmin(_patronKey) returns (SponsorRateStruct storage) {
        SponsorStruct storage sponsorRec = getSponsorRecordByKeys(_patronKey, _sponsorKey) ;
        return sponsorRec.sponsorRateMap[_sponsorRateKey];
    }

    function serializeSponsorRateRecordStr(address _patronKey, address _sponsorKey, uint256 _sponsorRateKey) public view returns (string memory) {
        SponsorRateStruct storage sponsorRateRec =  getSponsorRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey);
        string memory insertionTimeStr = toString(sponsorRateRec.insertionTime);
        string memory lastUpdateTimeStr = toString(sponsorRateRec.lastUpdateTime);
        string memory stakedAgentsSponsoredStr = toString(sponsorRateRec.stakedTransactionsSponsored);
        string memory strRateHeaderStr = concat(insertionTimeStr, ",", lastUpdateTimeStr, ",", stakedAgentsSponsoredStr);
        return strRateHeaderStr;
    }

}
