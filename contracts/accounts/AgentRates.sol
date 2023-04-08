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
        AgentRateStruct storage agentRateRec = getAgentRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey);
        if (!agentRateRec.inserted) {
            AgentStruct storage agentRec = getAgentRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey);
            agentRateRec.agentRate = _agentRateKey;
            agentRateRec.inserted = true;
            agentRateRec.insertionTime = agentRateRec.lastUpdateTime = block.timestamp;
            agentRateRec.stakedSPCoins = 0;
            agentRec.agentRateKeys.push(_agentRateKey);
        }
    }

    function getAgentRateRecordByKeys(address _patronKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey, uint _agentRateKey) internal view onlyOwnerOrRootAdmin(_patronKey) returns (AgentRateStruct storage) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey) ;
        return agentRec.agentRateMap[_agentRateKey];
    }

     function serializeAgentRateRecordStr(address _patronKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey, uint256 _agentRateKey) public view returns (string memory) {
        AgentRateStruct storage agentRateRec =  getAgentRateRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey, _agentRateKey);
        string memory insertionTimeStr = toString(agentRateRec.insertionTime);
        string memory lastUpdateTimeStr = toString(agentRateRec.lastUpdateTime);
        string memory stakedSPCoinsStr = toString(agentRateRec.stakedSPCoins);
        string memory strRateHeaderStr = concat(insertionTimeStr, ",", lastUpdateTimeStr, ",", stakedSPCoinsStr);
        return strRateHeaderStr;
    }

    function getRateTransactionList(address _patronKey, address _sponsorKey, uint _sponsorRateKey, address _agentKey, uint256 _agentRateKey) public view returns (string memory) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_patronKey, _sponsorKey, _sponsorRateKey, _agentKey);
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
