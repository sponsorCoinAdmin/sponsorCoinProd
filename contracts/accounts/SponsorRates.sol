// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "./Sponsors.sol";

contract SponsorRates is Sponsors {

    constructor() { }

function addSponsorRate(address _patreonKey, address _sponsorKey, uint _sponsorRateKey) 
    public onlyOwnerOrRootAdmin(_patreonKey)
    nonRedundantSponsor ( _patreonKey,  _sponsorKey) {
    addPatronSponsor(_patreonKey, _sponsorKey);
    SponsorStruct storage sponsorRec = getSponsorRecordByKeys(_patreonKey, _sponsorKey);
    mapping(uint256 => SponsorRateStruct) storage sponsorRateMap = sponsorRec.sponsorRateMap;
    SponsorRateStruct storage sponsorRateRec = sponsorRateMap[_sponsorRateKey];

    if (!sponsorRateRec.inserted) {
        sponsorRateRec.sponsorRate = _sponsorRateKey;
        sponsorRateRec.inserted = true;
        sponsorRateRec.insertionTime = sponsorRateRec.lastUpdateTime = block.timestamp;
        sponsorRateRec.totalTransactionsSponsored = 0;
        sponsorRec.sponsorRateKeys.push(_sponsorRateKey);
    } 
}

function getSponsorRateRecordByKeys(address _patreonKey, address _sponsorKey, uint _sponsorRateKey) internal view onlyOwnerOrRootAdmin(_patreonKey) returns (SponsorRateStruct storage) {
        SponsorStruct storage sponsorRec = getSponsorRecordByKeys(_patreonKey, _sponsorKey) ;
        return sponsorRec.sponsorRateMap[_sponsorRateKey];
     }

     function serializeSponsorRateRecordStr(address _patreonKey, address _sponsorKey, uint256 _sponsorRateKey) public view returns (string memory) {
        SponsorRateStruct storage sponsorRateRec =  getSponsorRateRecordByKeys(_patreonKey, _sponsorKey, _sponsorRateKey);
        string memory insertionTimeStr = toString(sponsorRateRec.insertionTime);
        string memory lastUpdateTimeStr = toString(sponsorRateRec.lastUpdateTime);
        string memory totalAgentsSponsoredStr = toString(sponsorRateRec.totalTransactionsSponsored);
        string memory strRateHeaderStr = concat(insertionTimeStr, ",", lastUpdateTimeStr, ",", totalAgentsSponsoredStr);
        return strRateHeaderStr;
    }

}
