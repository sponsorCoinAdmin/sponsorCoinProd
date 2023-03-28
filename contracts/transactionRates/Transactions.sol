// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "./Rates.sol";

contract Transactions is Rates{
    constructor() {
    }

    function addAgentRateTransaction(address _patreonKey, address _sponsorKey, address _agentKey, uint _rateKey, uint256 _transAmount)
    public onlyOwnerOrRootAdmin(msg.sender) {
        // console.log("ADDING RATE REC = ",_rateKey, "ADDING TRANSACTION = ",_transAmount);
        addAgentRate(_patreonKey, _sponsorKey, _agentKey, _rateKey);
        RateStruct storage rateRec = getRateRecordByKeys(_patreonKey, _sponsorKey, _agentKey, _rateKey);

        // console.log("rateRec.inserted", rateRec.inserted);  

        uint256 transactionTimeStamp = block.timestamp;
        TransactionStruct memory transRec = TransactionStruct(
            {insertionTime: transactionTimeStamp, quantity: _transAmount});
        TransactionStruct[] storage transactionList = rateRec.transactionList;
        transactionList.push(transRec);
    } 

    function getRateTransactions_JUNK(address _patreonKey, address _sponsorKey, address _agentKey) public view returns (string memory) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_patreonKey, _sponsorKey, _agentKey);
        uint256[] memory agentRateKeys = agentRec.rateKeys;
        string memory strTransactionList = "";
        for (uint idx; idx < agentRateKeys.length; idx++) {
            RateStruct storage rateRec = agentRec.rateMap[agentRateKeys[idx]];
            console.log ("*******JUNK rateRec.transactionList[0].quantity = ", rateRec.transactionList[0].quantity);
            TransactionStruct[] memory transactionList = rateRec.transactionList;
            strTransactionList = getRateTransactionStr_JUNK(transactionList);
            if (idx < agentRateKeys.length - 1) {
                strTransactionList = concat(strTransactionList, "\n");
            }
        }
        return strTransactionList;
    }

    function getRateTransactionStr_JUNK(TransactionStruct[] memory transactionList) public view returns (string memory) {
        string memory strTransactionList = "";
        // console.log("JJJJ transactionList.length = ", transactionList.length);
        for (uint idx; idx < transactionList.length; idx++) {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            console.log(transactionList[idx].insertionTime);
            console.log(transactionList[idx].quantity);
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

            strTransactionList = concat(strTransactionList,
            toString(transactionList[idx].insertionTime), ",",
            toString(transactionList[idx].quantity));
            if (idx < transactionList.length - 1) {
                strTransactionList = concat(strTransactionList, "\n");
            }
        }
        return strTransactionList;
    }

    /*
    function updateRateRecord(RateStruct storage _rateRec, 
        TransactionStruct memory _transRec) internal onlyRootAdmin() {
            console.log("BEFORE _rateRec lastUpdateTime = ", _rateRec.lastUpdateTime);
            console.log("BEFORE _rateRec quantity       = ", _rateRec.totalQuantity);
            _rateRec.transactionList.push(_transRec);
            _rateRec.lastUpdateTime = _transRec.insertionTime;
            _rateRec.totalQuantity += _transRec.quantity;
            _rateRec.transactionList.push(_transRec); 
            console.log("AFTER _transRec insertionTime = ", _transRec.insertionTime);
            console.log("AFTER _transRec quantity      = ", _transRec.quantity);
            console.log("AFTER _rateRec lastUpdateTime = ", _rateRec.lastUpdateTime);
            console.log("AFTER _rateRec totalQuantity  = ", _rateRec.totalQuantity);
        }
*/
    
}
