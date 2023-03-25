// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "../accounts/Agents.sol";

contract Rates is Agents{

    constructor() {
    }

    /// @notice insert sponsors Agent
    /// @param _patreonKey public Sponsor Coin Account Key
    /// @param _sponsorKey public account key to get sponsor array
    /// @param _agentKey new sponsor to add to account list
    
    function addAgentRate(address _patreonKey, address _sponsorKey, address _agentKey, uint _rateKey)
            public onlyOwnerOrRootAdmin(msg.sender) {

        addSponsorAgent(_patreonKey, _sponsorKey, _agentKey);

        AgentStruct storage agentRec = getAgentRecordByKeys(_patreonKey, _sponsorKey, _agentKey);
        mapping(uint256 => RateStruct) storage rateMap = agentRec.rateMap;
        RateStruct storage rateRec = rateMap[_rateKey];
        if (!rateRec.inserted) {
            rateRec.inserted = true;
            rateRec.insertionTime = rateRec.lastUpdateTime = block.timestamp;
            agentRec.rateKeys.push(_rateKey);
        }
        else {
            rateRec.lastUpdateTime = block.timestamp;
        }
    }

    /// @notice determines if address Record is inserted in accountKey array
    /// @param _agentRec agent record containing rateMap records
    /// @param _rateKey key for a specific rateMap record
    function isRateInserted(AgentStruct storage _agentRec, uint _rateKey) internal view returns (bool) {
        mapping(uint256 => RateStruct) storage rateMap = _agentRec.rateMap;
        if (rateMap[_rateKey].inserted)
            return true;
        else 
            return false;
    }

    function getRateRecordByKeys(address _patreonKey, address _sponsorKey, address _agentKey, uint _rate) internal view onlyOwnerOrRootAdmin(_patreonKey) returns (RateStruct storage) {
        AgentStruct storage agentStruct = getAgentRecordByKeys(_patreonKey, _sponsorKey, _agentKey) ;
        RateStruct storage rateRec = agentStruct.rateMap[_rate];
        return rateRec;
     }
/*
     function getRateTransactions(address _patreonKey, address _sponsorKey, address _agentKey, uint _rate) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (string[] memory) {
        // RateStruct storage rateRec = getRateRecordByKeys(_patreonKey, _sponsorKey, _agentKey, _rate);
        // TransactionStruct[] memory transactionRecs = rateRec.transactionList;
        string[] memory transactionList;
        // ToDo: Loop through TransactionStruct and get actual Transactions
        transactionList[0] = "1, Todo: TransactionTime 1 = ??? TransactAmount = ???";
        transactionList[1] = "1, Todo: TransactionTime 1 = ??? TransactAmount = ???";
        transactionList[2] = "1, Todo: TransactionTime 1 = ??? TransactAmount = ???";
        transactionList[3] = "1, Todo: TransactionTime 1 = ??? TransactAmount = ???";
        transactionList[4] = "1, Todo: TransactionTime 1 = ??? TransactAmount = ???";
        transactionList[5] = "1, Todo: TransactionTime 1 = ??? TransactAmount = ???";
 
        return transactionList;
    }
*/
    function getRateTransactions() public view returns (string[] memory) {
        // RateStruct storage rateRec = getRateRecordByKeys(_patreonKey, _sponsorKey, _agentKey, _rate);
        // TransactionStruct[] memory transactionRecs = rateRec.transactionList;
        string[] memory transactionList;
        // ToDo: Loop through TransactionStruct and get actual Transactions
        transactionList[0] = "1, Todo: TransactionTime 1 = ??? TransactAmount = ???";
        transactionList[1] = "1, Todo: TransactionTime 1 = ??? TransactAmount = ???";
        transactionList[2] = "1, Todo: TransactionTime 1 = ??? TransactAmount = ???";
        transactionList[3] = "1, Todo: TransactionTime 1 = ??? TransactAmount = ???";
        transactionList[4] = "1, Todo: TransactionTime 1 = ??? TransactAmount = ???";
        transactionList[5] = "1, Todo: TransactionTime 1 = ??? TransactAmount = ???";
 
        return transactionList;
    }

    function JUNK(address _patreonKey, address _sponsorKey, address _agentKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (uint[] memory) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_patreonKey, _sponsorKey, _agentKey);
        uint[] memory agentRateKeys = agentRec.rateKeys;
// console.log("AGENTS.SOL:addSponsorAgent: _patreonKey, _sponsorKey, _agentKey = " , _patreonKey, _sponsorKey, _agentKey);
// console.log("AGENTS.SOL:addSponsorAgent:agentRec.agentAccountKey = " , agentRec.agentAccountKey);
// console.log("AGENTS.SOL:getAgentRateKeys:agentRateKeys.length = ",agentRateKeys.length);
        return agentRateKeys;
    }

}
