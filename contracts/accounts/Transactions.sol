// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./AgentRates.sol";

contract Transactions is AgentRates {
    constructor() { }

    function addSponsorship(address _recipientKey, 
                                 uint _recipientRateKey,
                                 address _agentKey,
                                 uint _agentRateKey,
                                 string memory _strWholeAmount,
                                 string memory _strDecimalAmount)
                                // uint256 _sponsorAmount)
    public onlyOwnerOrRootAdmin("addSponsorship", msg.sender)
    // validateSufficientAccountBalance(sponsorAmount)
    {
        // console.log("msg.sender     ", msg.sender);
        // console.log("addSponsorship(", _recipientKey, ",");
        // console.log("               ", _recipientRateKey, ",");
        // console.log("               ", _agentKey, ",");
        // console.log("               ", _agentRateKey, ",");
        // console.log("               ", _strWholeAmount, ",");
        // console.log("               ", _strDecimalAmount, ")");
        
        // console.log("balanceOf[", msg.sender, "] = ",balanceOf[msg.sender]);
        uint256 sponsorAmount;
        bool result;
        (sponsorAmount, result) = decimalStringToUint(_strWholeAmount, _strDecimalAmount, decimals);

        require(result,concat("Unparsable Sponsor Amount ", _strWholeAmount));
        // string memory errString =
        require(balanceOf[msg.sender] >= sponsorAmount, 
            concat("Insufficient Balance balanceOf[",toString(msg.sender),"] >= ", 
            toString(sponsorAmount)));

        getRecipientRateRecord(msg.sender, _recipientKey, _recipientRateKey);

        uint256 transactionTimeStamp = block.timestamp;
        // StakingTransactionStruct memory transRec = StakingTransactionStruct(
        //    {insertionTime: transactionTimeStamp, quantity: sponsorAmount}
        // );

        StakingTransactionStruct memory transRec;
        transRec.insertionTime = transactionTimeStamp;
        transRec.stakingRewards = sponsorAmount; 


        //////////////////////////////////////

        // console.log(JUNK_COUNTER++, "**** Transaction.sol:ADDING RATE REC = ",_agentRateKey, "ADDING TRANSACTION = ",_transAmount);
        if(_agentKey == burnAddress) {
            RecipientRateStruct storage recipientRateRecord = getRecipientRateRecord(msg.sender, _recipientKey, _recipientRateKey);
            updateRecipientRateSponsorship(_recipientKey, _recipientRateKey, sponsorAmount);
            recipientRateRecord.lastUpdateTime = transactionTimeStamp;
            recipientRateRecord.transactionList.push(transRec);    
        }
        else { 
            AgentRateStruct storage agentRateRecord = getAgentRateRecord(msg.sender, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
            updateAgentRateSponsorship(_recipientKey, _recipientRateKey, _agentKey, _agentRateKey, sponsorAmount);
            agentRateRecord.lastUpdateTime = transactionTimeStamp;
            agentRateRecord.transactionList.push(transRec);
        }

        // console.log("BEFORE balanceOf     =", balanceOf[msg.sender]);
        // console.log("BEFORE sponsorAmount ",sponsorAmount);
        balanceOf[msg.sender] -= sponsorAmount;
        // console.log("AFTER balanceOf     =", balanceOf[msg.sender]);
        // console.log("AFTER sponsorAmount ",sponsorAmount);
    }
    
    function updateAgentRateSponsorship(address _recipientKey, uint _recipientRateKey, address _agentKey, uint _agentRateKey, uint256 _transAmount)
       internal returns (AgentRateStruct storage) {
        AgentStruct storage agentRecord = updateAgentSponsorship(_recipientKey, _recipientRateKey, _agentKey, _transAmount);
        AgentRateStruct storage agentRateRecord= agentRecord.agentRateMap[_agentRateKey];
        agentRateRecord.stakedSPCoins += _transAmount;
        return agentRateRecord;
    }

    function updateAgentSponsorship(address _recipientKey, uint _recipientRateKey, address _agentKey, uint256 _transAmount)
       internal returns (AgentStruct storage) {
        RecipientRateStruct storage recipientRateRecord = updateRecipientRateSponsorship(_recipientKey, _recipientRateKey, _transAmount);
        AgentStruct storage agentRecord = recipientRateRecord.agentMap[_agentKey];
        agentRecord.stakedSPCoins += _transAmount;
        return agentRecord;
    }

    function updateRecipientRateSponsorship(address _recipientKey, uint _recipientRateKey, uint256 _transAmount)
       internal returns (RecipientRateStruct storage) {
        RecipientStruct storage recipientRecord = updateRecipientSponsorship(_recipientKey, _transAmount);
        RecipientRateStruct storage recipientRateRecord = recipientRecord.recipientRateMap[_recipientRateKey];
        recipientRateRecord.stakedSPCoins += _transAmount;
        return recipientRateRecord;
    }

    function updateRecipientSponsorship(address _recipientKey, uint256 _transAmount)
       internal returns (RecipientStruct storage) {
        AccountStruct storage sponsorRec = updateSponsorTransaction(_transAmount);
        RecipientStruct storage recipientRecord = sponsorRec.recipientMap[_recipientKey];
        recipientRecord.stakedSPCoins += _transAmount;
        return recipientRecord;
    }

    function updateSponsorTransaction(uint256 _transAmount)
       internal returns (AccountStruct storage) {
        AccountStruct storage sponsorRec = accountMap[msg.sender];
        sponsorRec.stakedSPCoins += _transAmount;
        return sponsorRec;
    }

    function getRecipientRateTransactionList(address _sponsorKey, address _recipientKey, uint _recipientRateKey) public view returns (string memory) {
        RecipientStruct storage recipientRec = getRecipientRecordByKeys(_sponsorKey, _recipientKey);
        string memory strTransactionList = "";
        RecipientRateStruct storage recipientRateRecord = recipientRec.recipientRateMap[_recipientRateKey];
        // console.log ("recipientRateRecord.transactionList[0].quantity = ", recipientRateRecord.transactionList[0].quantity);
        StakingTransactionStruct[] memory transactionList = recipientRateRecord.transactionList;
        strTransactionList = concat(strTransactionList, getRateTransactionStr(transactionList)); 
        // console.log("RRRR strTransactionList = ", strTransactionList); 
        return strTransactionList;
    }

    function getSerializedRateTransactionList(address _sponsorKey, address _recipientKey, uint _recipientRateKey, address _agentKey, uint256 _agentRateKey) public view returns (string memory) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey);
        string memory strTransactionList = "";
        AgentRateStruct storage agentRateRecord= agentRec.agentRateMap[_agentRateKey];
        // console.log ("agentRateRecord.transactionList[0].quantity = ", agentRateRecord.transactionList[0].quantity);
        StakingTransactionStruct[] memory transactionList = agentRateRecord.transactionList;
        strTransactionList = concat(strTransactionList, getRateTransactionStr(transactionList)); 
        // console.log("RRRR strTransactionList = ", strTransactionList); 
        return strTransactionList;
    }

    function getRateTransactionStr(StakingTransactionStruct[] memory transactionList) public pure returns (string memory) {
        string memory strTransactionList = "";
        for (uint idx; idx < transactionList.length; idx++) {

            strTransactionList = concat(strTransactionList,
            toString(transactionList[idx].insertionTime), ",",
            toString(transactionList[idx].stakingRewards));
            if (idx < transactionList.length - 1) {
                strTransactionList = concat(strTransactionList, "\n");
            }
        }
        return strTransactionList;
    }
}
