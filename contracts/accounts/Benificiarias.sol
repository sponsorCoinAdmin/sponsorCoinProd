// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./Accounts.sol";

contract Benificiarias is Accounts {
        constructor() {
    }

    /// @notice Create Patron and Benificiary accounts if they do not exist
    /// @notice Relate Patron and Benificiary accounts for POS sharing
    /// @param _patronKey public patron key to get benificiary array
    /// @param _benificiaryKey new benificiary to add to account list
    function addPatronBenificiary(address _patronKey, address _benificiaryKey) 
        public onlyOwnerOrRootAdmin(_patronKey)
        nonRedundantBenificiary ( _patronKey,  _benificiaryKey) {
        BenificiaryStruct storage benificiaryRecord = getBenificiaryRecordByKeys(_patronKey, _benificiaryKey);
        if (!benificiaryRecord.inserted) {
            addAccountRecord(_patronKey);
            addAccountRecord(_benificiaryKey);
            AccountStruct storage patronAccount = accountMap[_patronKey];
            AccountStruct storage benificiaryAccount = accountMap[_benificiaryKey];
            benificiaryRecord.insertionTime = block.timestamp;
            benificiaryRecord.patronKey = _patronKey;
            benificiaryRecord.benificiaryKey = _benificiaryKey;
            benificiaryRecord.stakedSPCoins = 0; // Coins not owned but Benificiaryed
            benificiaryRecord.inserted = true;
            patronAccount.benificiaryAccountList.push(_benificiaryKey);
            benificiaryAccount.patronAccountList.push(_patronKey);
        }
    }

    /*
    /// @notice determines if agent address is inserted in account.benificiary.agent.map
    /// @param _patronKey public account key validate Insertion
    /// @param _benificiaryKey public benificiary account key validate Insertion
    /// @param _benificiaryRateKey public agent account key validate Insertion
    function isAgentRateInserted(address _patronKey,address _benificiaryKey, uint _benificiaryRateKey, address _agentKey) public onlyOwnerOrRootAdmin(_patronKey) view returns (bool) {
        return getAgentRecordByKeys(_patronKey, _benificiaryKey, _benificiaryRateKey, _agentKey).inserted;
    }
*/

    /// @notice determines if benificiary address is inserted in account.benificiary.map
    /// @param _patronKey public account key validate Insertion
    /// @param _benificiaryKey public benificiary account key validate Insertion
    function isBenificiaryInserted(address _patronKey, address _benificiaryKey) public onlyOwnerOrRootAdmin(_patronKey) view returns (bool) {
        return getBenificiaryRecordByKeys(_patronKey, _benificiaryKey).inserted;
    }
    function getBenificiaryRecordByKeys(address _patronKey, address _benificiaryKey) internal view onlyOwnerOrRootAdmin(_patronKey) returns (BenificiaryStruct storage) {
        AccountStruct storage accountRec = accountMap[_patronKey];
        BenificiaryStruct storage benificiaryRecord = accountRec.benificiaryMap[_benificiaryKey];
       return benificiaryRecord;
    }

    function serializeBenificiaryRecordStr(address _patronKey, address _benificiaryKey) public view returns (string memory) {
        BenificiaryStruct storage benificiaryRecord =  getBenificiaryRecordByKeys(_patronKey, _benificiaryKey);
        string memory benificiaryRecordStr = toString(benificiaryRecord.insertionTime);
        string memory stakedSPCoinsStr = toString(benificiaryRecord.stakedSPCoins);
        benificiaryRecordStr = concat(benificiaryRecordStr, ",", stakedSPCoinsStr);
        return benificiaryRecordStr;
    }

    //////////////////// NESTED AGENT METHODS /////////////////////////

    /// @notice retreives the benificiary array records from a specific account address.
    /// @param _patronKey patron Key to retrieve the benificiary list
    /// @param _benificiaryKey benificiary Key to retrieve the benificiary list
    function getbenificiaryRateList(address _patronKey, address _benificiaryKey) public view onlyOwnerOrRootAdmin(_benificiaryKey) returns (uint[] memory) {
        BenificiaryStruct storage benificiaryRecord = getBenificiaryRecordByKeys(_patronKey, _benificiaryKey);
        uint[] memory benificiaryRateList = benificiaryRecord.benificiaryRateList;
// console.log("AGENTS.SOL:addBenificiaryAgent: _patronKey, _benificiaryKey, _benificiaryRateKey, _benificiaryKey = " , _patronKey, _benificiaryKey, _benificiaryRateKey, _benificiaryKey);
// console.log("AGENTS.SOL:addBenificiaryAgent:benificiaryRecord.benificiaryKey = " , benificiaryRecord.benificiaryKey);
// console.log("AGENTS.SOL:getAgentRateKeys:benificiaryRateList.length = ",benificiaryRateList.length);
        return benificiaryRateList;
    }

    /*
    ///////////////////// DELETE BENIFICIARY METHODS ////////////////////////
    modifier benificiaryExists (address _patronKey, address _benificiaryKey) {
        require (isBenificiaryInserted(_patronKey, _benificiaryKey) , "_benificiaryKey not found)");
        _;
    }
*/
}
