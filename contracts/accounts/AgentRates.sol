// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./Agents.sol";

contract AgentRates is Agents {

    constructor() { }

    /// @notice insert recipients Agent
    /// @param _recipientKey public account key to get recipient array
    /// @param _recipientRateKey public account key to get recipient Rate for a given recipient
    /// @param _agentKey new recipient to add to account list 
    function addAgentRateRecord(address _recipientKey, uint _recipientRateKey, address _agentKey, uint _agentRateKey) public 
    {
        getAgentRateRecord(msg.sender, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
        // console.log(JUNK_COUNTER++,"addAgentRateRecord"); 
    }

    function getAgentRateRecord(address _sponsor, address _recipientKey, uint _recipientRateKey, address _agentKey, uint _agentRateKey)
     internal returns (AgentRateStruct storage) 
    {
        AgentStruct storage agentRecord = getAgentRecord(_sponsor, _recipientKey, _recipientRateKey, _agentKey);
        // console.log(JUNK_COUNTER++,"getAgentRateRecord"); 
        AgentRateStruct storage agentRateRecord= getAgentRateRecordByKeys(_recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
        if (!agentRateRecord.inserted) {
            agentRateRecord.agentRate = _agentRateKey;
            agentRateRecord.inserted = true;
            agentRateRecord.insertionTime = agentRateRecord.lastUpdateTime = block.timestamp;
            agentRateRecord.stakedSPCoins = 0;
            agentRecord.agentRateKeys.push(_agentRateKey);
        }
        return agentRateRecord;
    }

    function getAgentRateRecordByKeys(address _recipientKey, uint _recipientRateKey, address _agentKey, uint _agentRateKey) internal view returns (AgentRateStruct storage) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_recipientKey, _recipientRateKey, _agentKey) ;
        return agentRec.agentRateMap[_agentRateKey];
    }

     function serializeAgentRateRecordStr(address _recipientKey, uint _recipientRateKey, address _agentKey, uint256 _agentRateKey) public view returns (string memory) {
        AgentRateStruct storage agentRateRecord =  getAgentRateRecordByKeys(_recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
        string memory insertionTimeStr = toString(agentRateRecord.insertionTime);
        string memory lastUpdateTimeStr = toString(agentRateRecord.lastUpdateTime);
        string memory stakedSPCoinsStr = toString(agentRateRecord.stakedSPCoins);
        string memory strRateHeaderStr = concat(insertionTimeStr, ",", lastUpdateTimeStr, ",", stakedSPCoinsStr);
        return strRateHeaderStr;
    }

    function getRateTransactionList(address _recipientKey, uint _recipientRateKey, address _agentKey, uint256 _agentRateKey) public view returns (string memory) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_recipientKey, _recipientRateKey, _agentKey);
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
