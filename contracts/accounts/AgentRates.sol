// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./Agents.sol";

contract AgentRates is Agents {

    constructor() { }

    /// @notice insert sponsors Agent
    /// @param _patronKey public Sponsor Coin Account Key
    /// @param _sponsorKey public account key to get sponsor array
    /// @param _sponsorRateKey public account key to get sponsor Rate for a given sponsor
    /// @param _agentKey new sponsor to add to account list 
    function addAgentRateRecord(address _patronKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey, uint _agentRateKey)
            public onlyOwnerOrRootAdmin(msg.sender) {

        addSponsorAgent(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey);
        AgentRateStruct storage agentRateRecord= getAgentRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey);
        if (!agentRateRecord.inserted) {
            AgentStruct storage agentRecord = getAgentRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey);
            agentRateRecord.agentRate = _agentRateKey;
            agentRateRecord.inserted = true;
            agentRateRecord.insertionTime = agentRateRecord.lastUpdateTime = block.timestamp;
            agentRateRecord.stakedSPCoins = 0;
            agentRecord.agentRateKeys.push(_agentRateKey);
        }
    }

    function getAgentRateRecordByKeys(address _patronKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey, uint _agentRateKey) internal view onlyOwnerOrRootAdmin(_patronKey) returns (AgentRateStruct storage) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey) ;
        return agentRec.agentRateMap[_agentRateKey];
    }

     function serializeAgentRateRecordStr(address _patronKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey, uint256 _agentRateKey) public view returns (string memory) {
        AgentRateStruct storage agentRateRecord=  getAgentRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey);
        string memory insertionTimeStr = toString(agentRateRecord.insertionTime);
        string memory lastUpdateTimeStr = toString(agentRateRecord.lastUpdateTime);
        string memory stakedSPCoinsStr = toString(agentRateRecord.stakedSPCoins);
        string memory strRateHeaderStr = concat(insertionTimeStr, ",", lastUpdateTimeStr, ",", stakedSPCoinsStr);
        return strRateHeaderStr;
    }

    function getRateTransactionList(address _patronKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey, uint256 _agentRateKey) public view returns (string memory) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey);
        string memory strTransactionList = "";
        AgentRateStruct storage agentRateRecord= agentRec.agentRateMap[_agentRateKey];
        // console.log ("agentRateRecord.transactionList[0].quantity = ", agentRateRecord.transactionList[0].quantity);
        TransactionStruct[] memory transactionList = agentRateRecord.transactionList;
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
