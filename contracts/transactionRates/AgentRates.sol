// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "../accounts/Agents.sol";

contract Rates is Agents{

    constructor() { }

    /// @notice insert sponsors Agent
    /// @param _patreonKey public Sponsor Coin Account Key
    /// @param _sponsorKey public account key to get sponsor array
    /// @param _agentKey new sponsor to add to account list 
    function addAgentRate(address _patreonKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey, uint _agentRateKey)
            public onlyOwnerOrRootAdmin(msg.sender) {

        addSponsorAgent(_patreonKey, _sponsorKey, _sponsorRateKey, _agentKey);

        AgentStruct storage agentRec = getAgentRecordByKeys(_patreonKey, _sponsorKey, _agentKey);
        mapping(uint256 => AgentRateStruct) storage agentRateMap = agentRec.agentRateMap;
        AgentRateStruct storage agentRateRec = agentRateMap[_agentRateKey];
        if (!agentRateRec.inserted) {
            agentRateRec.agentRate = _agentRateKey;
            agentRateRec.inserted = true;
            agentRateRec.insertionTime = agentRateRec.lastUpdateTime = block.timestamp;
            agentRateRec.totalTransactionsSponsored = 0;
            agentRec.agentRateKeys.push(_agentRateKey);
        }
    }

    /*
    /// @notice determines if address Record is inserted in accountKey array
    /// @param _agentRec agent record containing agentRateMap records
    /// @param _agentRateKey key for a specific agentRateMap record
    function isRateInserted(AgentStruct storage _agentRec, uint _agentRateKey) internal view returns (bool) {
        mapping(uint256 => AgentRateStruct) storage agentRateMap = _agentRec.agentRateMap;
        if (agentRateMap[_agentRateKey].inserted)
            return true;
        else 
            return false;
    }
*/

    function getAgentRateRecordByKeys(address _patreonKey, address _sponsorKey, address _agentKey, uint _agentRateKey) internal view onlyOwnerOrRootAdmin(_patreonKey) returns (AgentRateStruct storage) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_patreonKey, _sponsorKey, _agentKey) ;
        return agentRec.agentRateMap[_agentRateKey];
    }

     function serializeAgentRateRecordStr(address _patreonKey, address _sponsorKey, address _agentKey, uint256 _agentRateKey) public view returns (string memory) {
        AgentRateStruct storage agentRateRec =  getAgentRateRecordByKeys(_patreonKey, _sponsorKey, _agentKey, _agentRateKey);
        string memory insertionTimeStr = toString(agentRateRec.insertionTime);
        string memory lastUpdateTimeStr = toString(agentRateRec.lastUpdateTime);
        string memory totalAgentsSponsoredStr = toString(agentRateRec.totalTransactionsSponsored);
        string memory strRateHeaderStr = concat(insertionTimeStr, ",", lastUpdateTimeStr, ",", totalAgentsSponsoredStr);
        return strRateHeaderStr;
    }

    function getRateTransactionList(address _patreonKey, address _sponsorKey, address _agentKey, uint256 _agentRateKey) public view returns (string memory) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_patreonKey, _sponsorKey, _agentKey);
        string memory strTransactionList = "";
        AgentRateStruct storage agentRateRec = agentRec.agentRateMap[_agentRateKey];
        // console.log ("agentRateRec.transactionList[0].quantity = ", agentRateRec.transactionList[0].quantity);
        TransactionStruct[] memory transactionList = agentRateRec.transactionList;
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
}
