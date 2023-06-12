// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "../accounts/UnSubscribe.sol";
import "../accounts/Transactions.sol";

contract StakingManager is UnSubscribe{
    constructor(){
    }


        function depositStakingRewards( uint _accountType, address _sourceKey, address _accountKey, uint _rate, uint _amount)
        public returns ( uint ) {
        if (_accountType == SPONSOR) { 
            // _sourceKey = SPONSOR
            _rate = annualInflation;
            string memory errMsg = concat("RECIPIENT ACCOUNT ",  toString(_sourceKey), " NOT FOUND FOR SPONSOR ACCOUNT ",  toString(_accountKey));
            require (recipientHasSponsor( _sourceKey, _accountKey ), errMsg);
        }
        if (_accountType == RECIPIENT) { 
            // _sourceKey = SPONSOR
            string memory errMsg = concat("SPONSOR ACCOUNT ",  toString(_sourceKey), " NOT FOUND FOR RECIPIENT ACCOUNT ",  toString(_accountKey));
            require (recipientHasSponsor( _sourceKey, _accountKey ), errMsg);
        }
        else if (_accountType == AGENT) {
            // _sourceKey = AGENT
            string memory errMsg = concat("RECIPIENT ACCOUNT ",  toString(_sourceKey), " NOT FOUND FOR AGENT ACCOUNT ",  toString(_accountKey));
            require (agentHasRecipient( _sourceKey, _accountKey ), errMsg);
        }       
        return depositAccountStakingRewards( _sourceKey, _accountKey, _rate, _amount, _accountType );
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   function depositAccountStakingRewards(address _sourceKey, address _accountKey, uint _rate, uint _amount, uint _accountType)
        internal returns ( uint ) {
        require (_amount > 0, "AMOUNT BALANCE MUST BE LARGER THAN 0");
        // console.log("SOL=>2.0 depositAgentStakingRewards("); 
        // console.log("SOL=>2.1 _sourceKey = ", _sourceKey);
        // console.log("SOL=>2.2 _accountKey  = ", _accountKey);
        // console.log("SOL=>2.3 _rate      = ", _rate);
        // console.log("SOL=>2.4 _amount    = ", _amount);
        totalSupply += _amount;

        // console.log("SOL=>4 FETCHING account = accountMap[", _accountKey, "]");
        AccountStruct storage account = accountMap[_accountKey];
        // console.log("account.recipientAccountList.length =", account.recipientAccountList.length);
        // console.log("account.recipientAccountList[0] =", account.recipientAccountList[0]);

        RewardsStruct storage rewardsRecord = account.rewardsMap["ALL_REWARDS"];
        rewardsRecord.totalStakingRewards += _amount;
        rewardsRecord.totalAgentRewards += _amount;
        // mapping(address => RewardAccountStruct) storage agentRewardsMap = rewardsRecord.agentRewardsMap;

        RewardAccountStruct storage rewardAccountRecord;

        if (_accountType == SPONSOR) {
            rewardAccountRecord = rewardsRecord.sponsorRewardsMap[_sourceKey];
        } else if (_accountType == RECIPIENT) {
            rewardAccountRecord = rewardsRecord.recipientRewardsMap[_sourceKey];
        } else { // ACCOUNT_TYPE is AGENT
            rewardAccountRecord = rewardsRecord.agentRewardsMap[_sourceKey];
        }

        rewardAccountRecord.stakingRewards += _amount;

        uint256[] storage rewardRateList = rewardAccountRecord.rewardRateList;
        RewardRateStruct storage rewardRateRecord = rewardAccountRecord.rewardRateMap[_rate];
        if (rewardRateRecord.rate != _rate) {
            rewardRateList.push(_rate);
            rewardRateRecord.rate = _rate;
        }
        // console.log("SOL=>2.5 rewardRateList.length = ",rewardRateList.length);
        // console.log("SOL=>2.6 rewardRateRecord.rate = ",rewardRateRecord.rate);
        rewardRateRecord.stakingRewards += _amount;
        console.log("rewardRateRecord.stakingRewards = ", rewardRateRecord.stakingRewards);
        RewardsTransactionStruct[] storage rewardTransactionList = rewardRateRecord.rewardTransactionList;
        depositRewardTransaction( rewardTransactionList, _amount );
        // console.log("SOL=>2.7 rewardTransactionList[0].stakingRewards = ", rewardTransactionList[0].stakingRewards);

        // TESTING REMOVE LATER
        // console.log("=========================================================================================================================");
        // getRewardAccounts(_accountKey, AGENT);
        // console.log("=========================================================================================================================");
        //END TESTION

        return rewardAccountRecord.stakingRewards;
    }

//////////////// INSERT STAKING REWARDS /////////////////////////////////////////////////////////////////////

    function depositRecipientStakingRewards(address _sourceKey, address _accountKey, uint _rate, uint _amount )
        public returns ( uint ) {
        string memory errMsg = concat("SPONSOR ACCOUNT ",  toString(_sourceKey), " NOT FOUND FOR RECIPIENT ACCOUNT ",  toString(_accountKey));
        require (recipientHasSponsor( _sourceKey, _accountKey ), errMsg);
       return depositAccountStakingRewardsOLD( _sourceKey, _accountKey, _rate, _amount, RECIPIENT );
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function depositAgentStakingRewards(address _sourceKey, address _accountKey, uint _rate, uint _amount )
        public returns ( uint ) {
        string memory errMsg = concat("RECIPIENT ACCOUNT ",  toString(_sourceKey), " NOT FOUND FOR AGENT ACCOUNT ",  toString(_accountKey));
        require (agentHasRecipient( _sourceKey, _accountKey ), errMsg);
        return depositAccountStakingRewardsOLD( _sourceKey, _accountKey, _rate, _amount, AGENT );
    }

   function depositAccountStakingRewardsOLD(address _sourceKey, address _accountKey, uint _rate, uint _amount, uint _accountType)
        internal returns ( uint ) {
        require (_amount > 0, "AMOUNT BALANCE MUST BE LARGER THAN 0");
        // console.log("SOL=>2.0 depositAgentStakingRewards("); 
        // console.log("SOL=>2.1 _sourceKey = ", _sourceKey);
        // console.log("SOL=>2.2 _accountKey  = ", _accountKey);
        // console.log("SOL=>2.3 _rate      = ", _rate);
        // console.log("SOL=>2.4 _amount    = ", _amount);
        totalSupply += _amount;

        // console.log("SOL=>4 FETCHING account = accountMap[", _accountKey, "]");
        AccountStruct storage account = accountMap[_accountKey];
        // console.log("account.recipientAccountList.length =", account.recipientAccountList.length);
        // console.log("account.recipientAccountList[0] =", account.recipientAccountList[0]);

        RewardsStruct storage rewardsRecord = account.rewardsMap["ALL_REWARDS"];
        rewardsRecord.totalStakingRewards += _amount;
        rewardsRecord.totalAgentRewards += _amount;
        // mapping(address => RewardAccountStruct) storage agentRewardsMap = rewardsRecord.agentRewardsMap;

        RewardAccountStruct storage rewardAccountRecord;

        if (_accountType == SPONSOR) {
            rewardAccountRecord = rewardsRecord.sponsorRewardsMap[_sourceKey];
        } else if (_accountType == RECIPIENT) {
            rewardAccountRecord = rewardsRecord.recipientRewardsMap[_sourceKey];
        } else { // ACCOUNT_TYPE is AGENT
            rewardAccountRecord = rewardsRecord.agentRewardsMap[_sourceKey];
        }

        rewardAccountRecord.stakingRewards += _amount;

        uint256[] storage rewardRateList = rewardAccountRecord.rewardRateList;
        RewardRateStruct storage rewardRateRecord = rewardAccountRecord.rewardRateMap[_rate];
        if (rewardRateRecord.rate != _rate) {
            rewardRateList.push(_rate);
            rewardRateRecord.rate = _rate;
        }
        // console.log("SOL=>2.5 rewardRateList.length = ",rewardRateList.length);
        // console.log("SOL=>2.6 rewardRateRecord.rate = ",rewardRateRecord.rate);
        rewardRateRecord.stakingRewards += _amount;
        RewardsTransactionStruct[] storage rewardTransactionList = rewardRateRecord.rewardTransactionList;
        depositRewardTransaction( rewardTransactionList, _amount );
        // console.log("SOL=>2.7 rewardTransactionList[0].stakingRewards = ", rewardTransactionList[0].stakingRewards);

        // TESTING REMOVE LATER
        // console.log("=========================================================================================================================");
        // getRewardAccounts(_accountKey, AGENT);
        // console.log("=========================================================================================================================");
        //END TESTION

        return rewardAccountRecord.stakingRewards;
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function getRewardAccounts(address _accountKey, uint _rewardType)
        public view returns (string memory memoryRewards) {
        // console.log("--------------------------------------------------------------------------------------------------------------------------");
        // console.log("SOL=>17 getRewardAccounts(", _accountKey, ", ", getAccountType(_rewardType));
        
        memoryRewards = "";
        AccountStruct storage account = accountMap[_accountKey];
        address[] storage accountSearchList;
        string memory ACCOUNT_TYPE_DELIMITER = "";
        if ( _rewardType == RECIPIENT ) {
           accountSearchList = account.sponsorAccountList;
           ACCOUNT_TYPE_DELIMITER = "SPONSOR_ACCOUNT:";
        }
        else if ( _rewardType == AGENT ) {
            accountSearchList = account.agentsParentRecipientAccountList;
            ACCOUNT_TYPE_DELIMITER = "RECIPIENT_ACCOUNT:";
        }
        else return memoryRewards;

            // console.log("SOL=>16 accountSearchList.length = ", accountSearchList.length);
            // Check the Recipient's Sponsor List
        // console.log("SOL=>17.1 accountSearchList.length = ", accountSearchList.length);
        for (uint idx = 0; idx < accountSearchList.length; idx++) {
            address accountKey = accountSearchList[idx];
        // console.log("SOL=>17.2 accountKey =", accountKey);
           memoryRewards = concat(memoryRewards, ACCOUNT_TYPE_DELIMITER, toString(accountKey));
        // console.log("SOL=>17.3 memoryRewards =", accountKey);

            ///////////////// **** START REPLACE LATER **** ///////////////////////////

            RewardsStruct storage rewardsRecord = account.rewardsMap["ALL_REWARDS"];
            RewardAccountStruct storage accountReward;
            // if ( _rewardType == SPONSOR ) {
            //     accountReward = rewardsRecord.sponsorRewardsMap[accountKey];
            // }
            // else 
            if ( _rewardType == RECIPIENT ) {
                accountReward = rewardsRecord.recipientRewardsMap[accountKey];
            }
            else {  //ACCOUNT is AGENT
                accountReward = rewardsRecord.agentRewardsMap[accountKey];
            }
            memoryRewards = concat(memoryRewards, getRewardRateRecords(accountReward));

            // console.log("SOL=>17 accountKey[", idx,"] = ", accountSearchList[idx]);
            // console.log("SOL=>17.4 memoryRewards =", accountKey);
        }
        // console.log("SOL=>17.5 RETURNING MEMORY REWARDS =", memoryRewards);
        // console.log("--------------------------------------------------------------------------------------------------------------------------");
        return memoryRewards;
    }

    function getRewardRateRecords(RewardAccountStruct storage _rewardAccountRecord)
        internal  view returns (string memory memoryRewards) {
//   console.log("SOL=>18 getRewardRateRecords(RewardAccountStruct storage _rewardAccountRecord)");
        
        uint256[] storage rewardRateList = _rewardAccountRecord.rewardRateList;
//   console.log("SOL=>18.1 BEFORE memoryRewards", memoryRewards);
//   console.log("*** ISSUE HERE SOL=>18.2 rewardRateList.length", rewardRateList.length);

        for (uint rateIdx = 0; rateIdx < rewardRateList.length; rateIdx++) {
            uint rate = rewardRateList[rateIdx];
//   console.log("SOL=>18.3 rate", rate);

            RewardRateStruct storage rewardRateRecord = _rewardAccountRecord.rewardRateMap[rate];
            RewardsTransactionStruct[] storage rewardTransactionList = rewardRateRecord.rewardTransactionList;

            memoryRewards = concat(memoryRewards, ",", toString(_rewardAccountRecord.stakingRewards));
                // console.log("SOL=> _rewardAccountRecord.rewardTransactionList.length         = ", _rewardAccountRecord.rewardTransactionList.length);
                // console.log("SOL=> _rewardAccountRecord.rewardTransactionList.stakingRewards = ", _rewardAccountRecord.stakingRewards);
            memoryRewards = concat(memoryRewards, "\nRATE:", toString(rate));
            memoryRewards = concat(memoryRewards, ",", toString(rewardRateRecord.stakingRewards));

// console.log("SOL=>18.4 rewardTransactionList.length", rewardTransactionList.length);
            if (rewardTransactionList.length != 0) {
                string memory stringRewards = serializeRewardsTransactionList(rewardTransactionList);
// console.log("SOL=>18.5 stringRewards", stringRewards);
                memoryRewards = concat(memoryRewards, "\n" , stringRewards);
            }
        }
        // console.log("SOL=>21 AFTER memoryRewards", memoryRewards);
        // console.log("*** END SOL ******************************************************************************");
// console.log("SOL=>18.6 stringRewards", memoryRewards);
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
