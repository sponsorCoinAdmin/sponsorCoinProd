// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "../accounts/UnSubscribe.sol";
import "../accounts/Transactions.sol";

contract StakingManager is UnSubscribe{
    constructor(){
    }

//////////////// INSERT STAKING REWARDS /////////////////////////////////////////////////////////////////////

    function depositRecipientStakingRewards(address _sourceKey, address _recipientKey, uint _rate, uint _amount )
        public returns ( uint ) {
        require (_amount > 0, "AMOUNT BALANCE MUST BE LARGER THAN 0");
        string memory errMsg = concat("SPONSOR ACCOUNT ",  toString(_sourceKey), " NOT FOUND FOR RECIPIENT ACCOUNT ",  toString(_recipientKey));
        require (recipientHasSponsor( _sourceKey, _recipientKey ), errMsg);
        console.log("SOL=>1.0 depositRecipientStakingRewards("); 
        console.log("SOL=>1.1 _sourceKey   = ", _sourceKey);
        console.log("SOL=>1.3 _recipientKey = ", _recipientKey);
        console.log("SOL=>1.4 _rate         = ", _rate);
        console.log("SOL=>1.5 _amount       = ", _amount, ")" );
        totalSupply += _amount;

        // console.log("SOL=>4 FETCHING recipientAccount = accountMap[", _recipientKey, "]");
        AccountStruct storage recipientAccount = accountMap[_recipientKey];
        // console.log("recipientAccount.sponsorAccountList.length =", recipientAccount.sponsorAccountList.length);
        // console.log("recipientAccount.sponsorAccountList[0] =", recipientAccount.sponsorAccountList[0]);

        RewardsStruct storage rewardsRecord = recipientAccount.rewardsMap["ALL_REWARDS"];
        rewardsRecord.totalStakingRewards += _amount;
        rewardsRecord.totalRecipientRewards += _amount;
        mapping(address => RewardAccountStruct) storage recipientRewardsMap = rewardsRecord.recipientRewardsMap;

        RewardAccountStruct storage recipientAccountRecord = recipientRewardsMap[_sourceKey];
        recipientAccountRecord.stakingRewards += _amount;

        uint256[] storage rewardRateList = recipientAccountRecord.rewardRateList;
        RewardRateStruct storage rewardRateRecord = recipientAccountRecord.rewardRateMap[_rate];
        if (rewardRateRecord.rate != _rate) {
            rewardRateList.push(_rate);
            rewardRateRecord.rate = _rate;
        }
        rewardRateRecord.stakingRewards += _amount;
        
        RewardsTransactionStruct[] storage rewardTransactionList = rewardRateRecord.rewardTransactionList;

        depositRewardTransaction( rewardTransactionList, _amount );

    // TESTING REMOVE LATER
        console.log("=========================================================================================================================");
        getRewardAccounts(_recipientKey, RECIPIENT);
        console.log("=========================================================================================================================");
        //END TESTION
        return recipientAccountRecord.stakingRewards;
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function depositAgentStakingRewards(address _sourceKey, address _agentKey, uint _rate, uint _amount )
        public returns ( uint ) {
        require (_amount > 0, "AMOUNT BALANCE MUST BE LARGER THAN 0");
        string memory errMsg = concat("RECIPIENT ACCOUNT ",  toString(_sourceKey), " NOT FOUND FOR AGENT ACCOUNT ",  toString(_agentKey));
        require (agentHasRecipient( _sourceKey, _agentKey ), errMsg);
        console.log("SOL=>2.0 depositAgentStakingRewards("); 
        console.log("SOL=>2.1 _sourceKey = ", _sourceKey);
        console.log("SOL=>2.2 _agentKey  = ", _agentKey);
        console.log("SOL=>2.3 _rate      = ", _rate);
        console.log("SOL=>2.4 _amount    = ", _amount);
        totalSupply += _amount;

        // console.log("SOL=>4 FETCHING agentAccount = accountMap[", _agentKey, "]");
        AccountStruct storage agentAccount = accountMap[_agentKey];
        // console.log("agentAccount.recipientAccountList.length =", agentAccount.recipientAccountList.length);
        // console.log("agentAccount.recipientAccountList[0] =", agentAccount.recipientAccountList[0]);

        RewardsStruct storage rewardsRecord = agentAccount.rewardsMap["ALL_REWARDS"];
        rewardsRecord.totalStakingRewards += _amount;
        rewardsRecord.totalAgentRewards += _amount;
        mapping(address => RewardAccountStruct) storage agentRewardsMap = rewardsRecord.agentRewardsMap;

        RewardAccountStruct storage rewardAccountRecord = agentRewardsMap[_sourceKey];
        rewardAccountRecord.stakingRewards += _amount;

        uint256[] storage rewardRateList = rewardAccountRecord.rewardRateList;
        RewardRateStruct storage rewardRateRecord = rewardAccountRecord.rewardRateMap[_rate];
        if (rewardRateRecord.rate != _rate) {
            rewardRateList.push(_rate);
            rewardRateRecord.rate = _rate;
        }
        console.log("SOL=>2.5 rewardRateList.length = ",rewardRateList.length);
        console.log("SOL=>2.6 rewardRateRecord.rate = ",rewardRateRecord.rate);
        rewardRateRecord.stakingRewards += _amount;
        RewardsTransactionStruct[] storage rewardTransactionList = rewardRateRecord.rewardTransactionList;
        depositRewardTransaction( rewardTransactionList, _amount );
        console.log("SOL=>2.7 rewardTransactionList[0].stakingRewards = ", rewardTransactionList[0].stakingRewards);

        // TESTING REMOVE LATER
        console.log("=========================================================================================================================");
        getRewardAccounts(_agentKey, AGENT);
        console.log("=========================================================================================================================");
        //END TESTION

        return rewardAccountRecord.stakingRewards;
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function getRewardAccounts(address _agentKey, uint _rewardType)
        public view returns (string memory memoryRewards) {
        console.log("--------------------------------------------------------------------------------------------------------------------------");
        console.log("SOL=>17 getRewardAccounts(", _agentKey, ", ", getAccountType(_rewardType));
        
        memoryRewards = "";
        AccountStruct storage agentAccount = accountMap[_agentKey];
        address[] storage accountSearchList;
        if ( _rewardType == RECIPIENT )
           accountSearchList = agentAccount.sponsorAccountList;
        else if ( _rewardType == AGENT )
                 accountSearchList = agentAccount.agentsParentRecipientAccountList;
             else return memoryRewards;

            // console.log("SOL=>16 accountSearchList.length = ", accountSearchList.length);
            // Check the Recipient's Sponsor List
        console.log("SOL=>17.1 accountSearchList.length = ", accountSearchList.length);
        for (uint idx = 0; idx < accountSearchList.length; idx++) {
            address recipientKey = accountSearchList[idx];
        console.log("SOL=>17.2 recipientKey =", recipientKey);
         if ( _rewardType == RECIPIENT )
           memoryRewards = concat(memoryRewards, "SPONSOR_ACCOUNT:", toString(recipientKey));
        else if ( _rewardType == AGENT )
           memoryRewards = concat(memoryRewards, "RECIPIENT_ACCOUNT:", toString(recipientKey));
        console.log("SOL=>17.3 memoryRewards =", recipientKey);

            ///////////////// **** START REPLACE LATER **** ///////////////////////////

            RewardsStruct storage rewardsRecord = agentAccount.rewardsMap["ALL_REWARDS"];
            RewardAccountStruct storage recipientAccountRecord;
            if ( _rewardType == RECIPIENT ) {
                mapping(address => RewardAccountStruct) storage recipientRewardsMap = rewardsRecord.recipientRewardsMap;
                recipientAccountRecord = recipientRewardsMap[recipientKey];
                memoryRewards = concat(memoryRewards, getRewardRateRecords(recipientAccountRecord));
            }
            else if ( _rewardType == AGENT ) {
                mapping(address => RewardAccountStruct) storage recipientRewardsMap = rewardsRecord.agentRewardsMap;
                recipientAccountRecord = recipientRewardsMap[recipientKey];
                memoryRewards = concat(memoryRewards, getRewardRateRecords(recipientAccountRecord));
            }

            // console.log("SOL=>17 recipientKey[", idx,"] = ", accountSearchList[idx]);
            console.log("SOL=>17.4 memoryRewards =", recipientKey);
        }
        console.log("SOL=>17.5 RETURNING MEMORY REWARDS =", memoryRewards);
        console.log("--------------------------------------------------------------------------------------------------------------------------");
        return memoryRewards;
    }

    function getRewardRateRecords(RewardAccountStruct storage _rewardAccountRecord)
        internal  view returns (string memory memoryRewards) {
 console.log("SOL=>18 getRewardRateRecords(RewardAccountStruct storage _rewardAccountRecord)");
        
        uint256[] storage rewardRateList = _rewardAccountRecord.rewardRateList;
 console.log("SOL=>18.1 BEFORE memoryRewards", memoryRewards);
 console.log("*** ISSUE HERE SOL=>18.2 rewardRateList.length", rewardRateList.length);

        for (uint rateIdx = 0; rateIdx < rewardRateList.length; rateIdx++) {
            uint rate = rewardRateList[rateIdx];
console.log("SOL=>18.3 rate", rate);

            RewardRateStruct storage rewardRateRecord = _rewardAccountRecord.rewardRateMap[rate];
            RewardsTransactionStruct[] storage rewardTransactionList = rewardRateRecord.rewardTransactionList;

            memoryRewards = concat(memoryRewards, ",", toString(_rewardAccountRecord.stakingRewards));
                // console.log("SOL=> _rewardAccountRecord.rewardTransactionList.length         = ", _rewardAccountRecord.rewardTransactionList.length);
                // console.log("SOL=> _rewardAccountRecord.rewardTransactionList.stakingRewards = ", _rewardAccountRecord.stakingRewards);
            memoryRewards = concat(memoryRewards, "\nRATE:", toString(rate));
            memoryRewards = concat(memoryRewards, ",", toString(rewardRateRecord.stakingRewards));

console.log("SOL=>18.4 rewardTransactionList.length", rewardTransactionList.length);
            if (rewardTransactionList.length != 0) {
                string memory stringRewards = serializeRewardsTransactionList(rewardTransactionList);
console.log("SOL=>18.5 stringRewards", stringRewards);
                memoryRewards = concat(memoryRewards, "\n" , stringRewards);
            }
        }
        // console.log("SOL=>21 AFTER memoryRewards", memoryRewards);
        // console.log("*** END SOL ******************************************************************************");
console.log("SOL=>18.6 stringRewards", memoryRewards);
        return memoryRewards;
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
















    function depositRewardTransaction(  RewardsTransactionStruct[] storage rewardTransactionList,
                                        uint _amount )  internal {
        // console.log("SOL=>9 depositRewardTransaction("); 
        // console.log("SOL=>10 stakingAccountRecord.stakingRewards = ", stakingAccountRecord.stakingRewards);
        // console.log("SOL=>12               _amount               = ", _amount, ")" );
        // console.log("SOL=>13 BEFORE rewardTransactionList.length = ", rewardTransactionList.length);

        RewardsTransactionStruct memory  rewardsTransactionRecord;
        rewardsTransactionRecord.stakingRewards = _amount;
        rewardsTransactionRecord.updateTime = block.timestamp;
        rewardTransactionList.push(rewardsTransactionRecord);
        // console.log("SOL=>14 AFTER rewardTransactionList.length = ", rewardTransactionList.length);
    }

//////////////// RETREIVE STAKING REWARDS /////////////////////////////////////////////////////////////////////

        

    function serializeRewardsTransactionList(RewardsTransactionStruct[] storage _rewardTransactionList)
        internal  view returns (string memory memoryRewards) {
        for (uint idx = 0; idx < _rewardTransactionList.length; idx++) {
            RewardsTransactionStruct storage rewardTransaction = _rewardTransactionList[idx];
            // console.log("SOL6=> rewardTransaction.updateTime     = ", rewardTransaction.updateTime);
            // console.log("SOL7=> rewardTransaction.stakingRewards = ", rewardTransaction.stakingRewards);

            memoryRewards = concat(memoryRewards, toString(rewardTransaction.updateTime));
            memoryRewards = concat(memoryRewards, ",", toString(rewardTransaction.stakingRewards));
            if (idx < _rewardTransactionList.length - 1) {
                memoryRewards = concat(memoryRewards , "\n" );
            }
           // console.log("SOL=>21 getRewardAccounts:Transaction =", memoryRewards);
           // console.log("rewardsRecordList", memoryRewards);
           // console.log("*** END SOL ******************************************************************************");
        }
        return memoryRewards;
    }

    function getSerializedAccountRewards(address _accountKey)
        public view returns (string memory) {
        require(isAccountInserted(_accountKey));
        return serializeRewards(accountMap[_accountKey]);
    }
}
