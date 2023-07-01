// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./AgentRates.sol";
import "../rewardsManagement/RewardsManager.sol";

contract Transactions is RewardsManager {
    constructor() { }

    function addSponsorship(address _recipientKey, 
                                 uint _recipientRateKey,
                                 address _agentKey,
                                 uint _agentRateKey,
                                 string memory _strWholeAmount,
                                 string memory _strDecimalAmount ) public 
    {
        uint256 transactionTimeStamp = block.timestamp;
        addBackDatedSponsorship( _recipientKey, 
                                    _recipientRateKey,
                                    _agentKey,
                                    _agentRateKey,
                                    _strWholeAmount,
                                    _strDecimalAmount,
                                    transactionTimeStamp );
    }

    function addBackDatedSponsorship(address _recipientKey, 
                                 uint _recipientRateKey,
                                 address _agentKey,
                                 uint _agentRateKey,
                                 string memory _strWholeAmount,
                                 string memory _strDecimalAmount,
                                 uint _transactionTimeStamp) public {
        // console.log("balanceOf[", msg.sender, "] = ",balanceOf[msg.sender]);
        uint256 sponsorAmount;
        bool result;
        (sponsorAmount, result) = decimalStringToUint(_strWholeAmount, _strDecimalAmount, decimals);

        require(result, concat("Unparsable Sponsor Amount ", _strWholeAmount));
        // string memory errString =
        require(balanceOf[msg.sender] >= sponsorAmount, 
            concat("Insufficient Balance balanceOf[",toString(msg.sender),"] >= ", 
            toString(sponsorAmount)));

        addBackDatedSponsorship2( _recipientKey, 
                                    _recipientRateKey,
                                    _agentKey,
                                    _agentRateKey,
                                    sponsorAmount,
                                    _transactionTimeStamp );
    }

    function addBackDatedSponsorship2(address _recipientKey, 
                                 uint _recipientRateKey,
                                 address _agentKey,
                                 uint _agentRateKey,
                                 uint _sponsorAmount,
                                 uint _transactionTimeStamp)
    // ToDo Replace this Removed to Save Memory
    // onlyOwnerOrRootAdmin("addBackDatedSponsorship", msg.sender)
    internal 
    // validateSufficientAccountBalance(_sponsorAmount)
    {
        // string memory parms; // = concat("msg.sender     ", toString(msg.sender));
        // parms = concat(parms, "addBackDatedSponsorship(");
        // parms = concat(parms, "\naddSponsorship(");
        // parms = concat(parms, "_recipientKey        = ", toString(_recipientKey), ",");
        // parms = concat(parms, "_recipientRateKey    = ", toString(_recipientRateKey), ",");
        // parms = concat(parms, "_agentKey            = ", toString(_agentKey), ",");
        // parms = concat(parms, "_agentRateKey        = ", toString(_agentRateKey), ",");
        // parms = concat(parms, "strWholeAmount       = ", _strWholeAmount, ",");
        // parms = concat(parms, "_strDecimalAmount    = ", _strDecimalAmount, ",");
        // parms = concat(parms, "_transactionTimeStamp            = ", toString(_transactionTimeStamp), ")");
        // console.log("parms");

        // console.log("msg.sender     ", msg.sender);
        // console.log("addBackDatedSponsorship(");
        // console.log("_recipientKey         = ", _recipientKey, ",");
        // console.log("_recipientRateKey     = ", _recipientRateKey, ",");
        // console.log("_agentKey             = ", _agentKey, ",");
        // console.log("_agentRateKey         = ", _agentRateKey, ",");
        // console.log("strWholeAmount        = ", _strWholeAmount, ",");
        // console.log("_strDecimalAmount     = ", _strDecimalAmount, ",");
        // console.log("_transactionTimeStamp = ", _transactionTimeStamp, ")");
        // uint256 blockTimeStamp = block.timestamp;
        // console.log("block.timestamp       = ", blockTimeStamp);

        
         // getRecipientRateRecord(msg.sender, _recipientKey, _recipientRateKey);
        // StakingTransactionStruct memory transRec = StakingTransactionStruct(
        //    {insertionTime: _transactionTimeStamp, quantity: _sponsorAmount}
        // );

        StakingTransactionStruct memory transRec;
        transRec.insertionTime = _transactionTimeStamp;
        transRec.stakingRewards = _sponsorAmount;
        totalStakedSPCoins += _sponsorAmount;

        //////////////////////////////////////

        // console.log(JUNK_COUNTER++, "**** Transaction.sol:ADDING RATE REC = ",_agentRateKey, "ADDING TRANSACTION = ",_transAmount);
        if(_agentKey == burnAddress) {
            RecipientRateStruct storage recipientRateRecord = getRecipientRateRecord(msg.sender, _recipientKey, _recipientRateKey);
            updateRecipientRateSponsorship(_recipientKey, _recipientRateKey, _sponsorAmount, _transactionTimeStamp);
            recipientRateRecord.transactionList.push(transRec);    
        }
        else { 
            AgentRateStruct storage agentRateRecord = getAgentRateRecord(msg.sender, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
            updateAgentRateSponsorship(_recipientKey, _recipientRateKey, _agentKey, _agentRateKey, _sponsorAmount, _transactionTimeStamp);
            agentRateRecord.transactionList.push(transRec);
        }

        // console.log("BEFORE balanceOf     =", balanceOf[msg.sender]);
        // console.log("BEFORE _sponsorAmount ",_sponsorAmount);
        balanceOf[msg.sender] -= _sponsorAmount;
        // console.log("AFTER balanceOf     =", balanceOf[msg.sender]);
        // console.log("AFTER _sponsorAmount ",_sponsorAmount);
    }
    
    function updateAgentRateSponsorship(address _recipientKey,
    uint _recipientRateKey, address _agentKey, uint _agentRateKey, uint256 _transAmount, uint _transactionTimeStamp)
       internal returns (AgentRateStruct storage) {
        AgentStruct storage agentRecord = updateAgentSponsorship(_recipientKey, _recipientRateKey, _agentKey, _transAmount, _transactionTimeStamp);
        AgentRateStruct storage agentRateRecord = agentRecord.agentRateMap[_agentRateKey];
        uint lastUpdateTime = agentRateRecord.lastUpdateTime;
        if ( lastUpdateTime != _transactionTimeStamp) {
            agentRateRecord.lastUpdateTime = _transactionTimeStamp;
            uint agentRewards = calculateStakingRewards( _transAmount, lastUpdateTime, _transactionTimeStamp, _recipientRateKey );
            // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA _transAmount                   = ", _transAmount);
            // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA agentRateRecord.lastUpdateTime = ", lastUpdateTime);
            // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA _transactionTimeStamp          = ", _transactionTimeStamp);
            // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA _recipientRateKey              = ", _recipientRateKey);
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA Agent Calculated Rewards       = ", agentRewards);
        }
        agentRateRecord.stakedSPCoins += _transAmount;
        return agentRateRecord;
    }

    function updateAgentSponsorship(address _recipientKey, uint _recipientRateKey, address _agentKey, uint256 _transAmount, uint _transactionTimeStamp)
       internal returns (AgentStruct storage) {
        RecipientRateStruct storage recipientRateRecord = updateRecipientRateSponsorship(_recipientKey, _recipientRateKey, _transAmount, _transactionTimeStamp);
        AgentStruct storage agentRecord = recipientRateRecord.agentMap[_agentKey];
        agentRecord.stakedSPCoins += _transAmount;
        return agentRecord;
    }

    function updateRecipientRateSponsorship(address _recipientKey, uint _recipientRateKey, uint256 _transAmount, uint _transactionTimeStamp)
       internal returns (RecipientRateStruct storage) {
        RecipientStruct storage recipientRecord = updateRecipientSponsorship(_recipientKey, _transAmount);
        RecipientRateStruct storage recipientRateRecord = recipientRecord.recipientRateMap[_recipientRateKey];
        uint lastUpdateTime = recipientRateRecord.lastUpdateTime;
            console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRR _transAmount                   = ", _transAmount);
            console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRR agentRateRecord.lastUpdateTime = ", lastUpdateTime);
            console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRR _transactionTimeStamp          = ", _transactionTimeStamp);
            console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRR _recipientRateKey              = ", _recipientRateKey);
        if ( recipientRateRecord.inserted && lastUpdateTime < _transactionTimeStamp) {
            uint recipientRewards = calculateStakingRewards( recipientRateRecord.stakedSPCoins, lastUpdateTime, _transactionTimeStamp, _recipientRateKey );
            console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRR Recipient Calculated Rewards   = ", recipientRewards);
            recipientRateRecord.lastUpdateTime = _transactionTimeStamp;

            addBackDatedSponsorship2(
                                    _recipientKey, 
                                    _recipientRateKey,
                                    burnAddress,
                                    0,
                                    recipientRewards,
                                    _transactionTimeStamp); 

        } else recipientRateRecord.inserted = true;
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

    function getRecipientRateTransactionList(address _sponsorKey, address _recipientKey, uint _recipientRateKey)
    public view returns (string memory) {
        RecipientStruct storage recipientRec = getRecipientRecordByKeys(_sponsorKey, _recipientKey);
        string memory strTransactionList = "";
        RecipientRateStruct storage recipientRateRecord = recipientRec.recipientRateMap[_recipientRateKey];
        // console.log ("recipientRateRecord.transactionList[0].quantity = ", recipientRateRecord.transactionList[0].quantity);
        StakingTransactionStruct[] memory transactionList = recipientRateRecord.transactionList;
        strTransactionList = concat(strTransactionList, getRateTransactionStr(transactionList)); 
        // console.log("RRRR strTransactionList = ", strTransactionList); 
        return strTransactionList;
    }

    function getSerializedRateTransactionList(address _sponsorKey, address _recipientKey, uint _recipientRateKey, address _agentKey, uint256 _agentRateKey)
    public view returns (string memory) {
        AgentStruct storage agentRec = getAgentRecordByKeys(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey);
        string memory strTransactionList = "";
        AgentRateStruct storage agentRateRecord= agentRec.agentRateMap[_agentRateKey];
        // console.log ("agentRateRecord.transactionList[0].quantity = ", agentRateRecord.transactionList[0].quantity);
        StakingTransactionStruct[] memory transactionList = agentRateRecord.transactionList;
        strTransactionList = concat(strTransactionList, getRateTransactionStr(transactionList)); 
        // console.log("RRRR strTransactionList = ", strTransactionList); 
        return strTransactionList;
    }

    function getRateTransactionStr(StakingTransactionStruct[] memory transactionList)
    public pure returns (string memory) {
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
