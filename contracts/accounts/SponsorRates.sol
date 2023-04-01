// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "./Sponsors.sol";

contract SponsorRates is Sponsors {

    constructor() { }

function addSponsorRate(address _patreonKey, address _sponsorKey, uint _sponsorRateKey) 
    public onlyOwnerOrRootAdmin(_patreonKey)
    nonRedundantSponsor ( _patreonKey,  _sponsorKey) {
    addPatreonSponsor(_patreonKey, _sponsorKey);
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

    /// @notice determines if address Record is inserted in accountKey array
    /// @param _sponsorRec sponsor record containing sponsorRateMap records
    /// @param _sponsorRateKey key for a specific sponsorRateMap record
    function isRateInserted(SponsorStruct storage _sponsorRec, uint _sponsorRateKey) internal view returns (bool) {
        mapping(uint256 => SponsorRateStruct) storage sponsorRateMap = _sponsorRec.sponsorRateMap;
        if (sponsorRateMap[_sponsorRateKey].inserted)
            return true;
        else 
            return false;
    }

 /*
   function getRateRecordByKeys(address _patreonKey, address _sponsorKey, address _agentKey, uint _sponsorRateKey) internal view onlyOwnerOrRootAdmin(_patreonKey) returns (SponsorRateStruct storage) {
        SponsorStruct storage sponsorRec = getSponsorRecordByKeys(_patreonKey, _sponsorKey) ;
        return sponsorRec.sponsorRateMap[_sponsorRateKey];
     }

     function serializeSponsorRates(address _patreonKey, address _sponsorKey, address _sponsorKey, uint256 _sponsorRateKey) public view returns (string memory) {
        SponsorRateStruct storage sponsorRateRec =  getRateRecordByKeys(_patreonKey, _sponsorKey, _sponsorKey, _sponsorRateKey);
        string memory insertionTimeStr = toString(sponsorRateRec.insertionTime);
        string memory lastUpdateTimeStr = toString(sponsorRateRec.lastUpdateTime);
        string memory totalSponsorsSponsoredStr = toString(sponsorRateRec.totalTransactionsSponsored);
        string memory strRateHeaderStr = concat(insertionTimeStr, ",", lastUpdateTimeStr, ",", totalSponsorsSponsoredStr);
        return strRateHeaderStr;
    }

    function getRateTransactionList(address _patreonKey, address _sponsorKey, address _sponsorKey, uint256 _sponsorRateKey) public view returns (string memory) {
        SponsorStruct storage sponsorRec = getSponsorRecordByKeys(_patreonKey, _sponsorKey, _sponsorKey);
        string memory strTransactionList = "";
        SponsorRateStruct storage sponsorRateRec = sponsorRec.sponsorRateMap[_sponsorRateKey];
        // console.log ("sponsorRateRec.transactionList[0].quantity = ", sponsorRateRec.transactionList[0].quantity);
        TransactionStruct[] memory transactionList = sponsorRateRec.transactionList;
        strTransactionList = concat(strTransactionList, getRateTransactionStr(transactionList)); 
        // console.log("RRRR strTransactionList = ", strTransactionList); 
        return strTransactionList;
    }

    function getRateTransactionStr(TransactionStruct[] memory transactionList) public pure returns (string memory) {
        string memory strTransactionList = "";
        for (uint idx; idx < transactionList.length; idx++) {

            strTransactionList = concat(strTransactionList,
            toString(transactionList[idx].insertionTime), ",",
            toString(transactionList[idx].quantity));
            if (idx < transactionList.length - 1) {
                strTransactionList = concat(strTransactionList, "\n");
            }
        }
        return strTransactionList;
    }
    */
}
