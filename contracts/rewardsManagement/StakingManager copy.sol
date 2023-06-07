// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "../accounts/UnSubscribe.sol";
import "../accounts/Transactions.sol";

contract StakingManager is UnSubscribe{
    constructor(){
    }

//////////////// INSERT STAKING REWARDS /////////////////////////////////////////////////////////////////////

    function depositAgentStakingRewards(address _recipientKey, address _agentKey, uint _rate, uint _amount )
        public returns ( uint ) {
        require (_amount > 0, "AMOUNT BALANCE MUST BE LARGER THAN 0");
        string memory errMsg = concat("RECIPIENT ACCOUNT ",  toString(_recipientKey), " NOT FOUND FOR AGENT ACCOUNT ",  toString(_agentKey));
        require (agentHasRecipient( _recipientKey, _agentKey ), errMsg);
        console.log("SOL=>1.0 depositAgentStakingRewards("); 
        console.log("SOL=>1.1 _recipientKey = ", _recipientKey);
        console.log("SOL=>1.2 _agentKey     = ", _agentKey);
        console.log("SOL=>1.3 _rate             = ", _rate);
        console.log("SOL=>1.4 _amount           = ", _amount);
        totalSupply += _amount;

        // console.log("SOL=>4 FETCHING agentAccount = accountMap[", _agentKey, "]");
        AccountStruct storage agentAccount = accountMap[_agentKey];
        // console.log("agentAccount.recipientAccountList.length =", agentAccount.recipientAccountList.length);
        // console.log("agentAccount.recipientAccountList[0] =", agentAccount.recipientAccountList[0]);

        RewardsStruct storage rewards = agentAccount.rewardsMap["ALL_REWARDS"];
        rewards.totalStakingRewards += _amount;
        rewards.totalAgentRewards += _amount;
        mapping(address => RewardAccountStruct) storage agentRewardsMap = rewards.agentRewardsMap;


        RewardAccountStruct storage agentAccountRecord = agentRewardsMap[_recipientKey];
        agentAccountRecord.stakingRewards += _amount;

        uint256[] storage rewardRateList = agentAccountRecord.rewardRateList;
        RewardRateStruct storage rewardRateRecord = agentAccountRecord.rewardRateMap[_rate];
        if (rewardRateRecord.rate != _rate) {
            rewardRateList.push(_rate);
            rewardRateRecord.rate = _rate;
        }
        console.log("SOL=>1.5 rewardRateList.length = ",rewardRateList.length);
        console.log("SOL=>1.6 rewardRateRecord.rate = ",rewardRateRecord.rate);
        rewardRateRecord.stakingRewards += _amount;
        RewardsTransactionStruct[] storage rewardTransactionList = rewardRateRecord.rewardTransactionList;
        depositRewardTransaction( rewardTransactionList, _amount );
        console.log("SOL=>1.7 rewardTransactionList[0].stakingRewards = ", rewardTransactionList[0].stakingRewards);


        // TESTING REMOVE LATER
        console.log("=========================================================================================================================");
        getAgentRewardAccounts(_agentKey);
        console.log("=========================================================================================================================");
        //END TESTION

        return agentAccountRecord.stakingRewards;
    }

    function getAgentRewardAccounts(address _recipientKey)
        public view returns (string memory memoryRewards) {
        console.log("--------------------------------------------------------------------------------------------------------------------------");
        console.log("SOL=>15 getAgentRewardAccounts(", _recipientKey, ")");
        
        AccountStruct storage recipientAccount = accountMap[_recipientKey];
        address[] storage recipientAccountList = recipientAccount.agentAccountList;
        memoryRewards = "";

        console.log("SOL=>15.1 recipientAccountList.length = ", recipientAccountList.length);
            // Check the Agents's Benificary List
        for (uint recipientIdx = 0; recipientIdx < recipientAccountList.length; recipientIdx++) {
             address recipientKey = recipientAccountList[recipientIdx];
        console.log("SOL=>15.2 recipientIdx =", recipientKey);
             memoryRewards = concat(memoryRewards, "RECIPIENT_ACCOUNT:", toString(recipientKey));

            ///////////////// **** START REPLACE LATER **** ///////////////////////////

            RewardsStruct storage rewards = recipientAccount.rewardsMap["ALL_REWARDS"];
            mapping(address => RewardAccountStruct) storage agentRewardsMap = rewards.agentRewardsMap; 
            
            ///////////////// **** END REPLACE LATER **** ///////////////////////////

            // console.log("SOL=>17 recipientKey[", recipientIdx,"] = ", recipientAccountList[recipientIdx]);
            RewardAccountStruct storage agentAccountRecord = agentRewardsMap[recipientKey];
            memoryRewards = concat(memoryRewards, getRewardRateRecords(agentAccountRecord)); 
        }
        console.log("SOL=>15.5 RETURNING MEMORY REWARDS =", memoryRewards);
        console.log("--------------------------------------------------------------------------------------------------------------------------");
        return memoryRewards;
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function getRewardAccounts(address _accountKey, uint _rewardType)
        public view returns (string memory memoryRewards) {
        console.log("--------------------------------------------------------------------------------------------------------------------------");
        console.log("SOL=>17 getRewardAccounts(", _accountKey, ")");
        
        memoryRewards = "";
        AccountStruct storage accountRecord = accountMap[_accountKey];
        address[] storage accountSearchList;
        if ( _rewardType == RECIPIENT )
           accountSearchList = accountRecord.sponsorAccountList;
        else if ( _rewardType == AGENT )
                 accountSearchList = accountRecord.recipientAccountList;
             else return memoryRewards;

            // console.log("SOL=>16 accountSearchList.length = ", accountSearchList.length);
            // Check the Recipient's Sponsor List
        console.log("SOL=>17.1 accountSearchList.length = ", accountSearchList.length);
        for (uint idx = 0; idx < accountSearchList.length; idx++) {
            address accountKey = accountSearchList[idx];
        console.log("SOL=>17.2 idx =", accountKey);
            memoryRewards = concat(memoryRewards, "SPONSOR_ACCOUNT:", toString(accountKey));
        console.log("SOL=>17.3 memoryRewards =", accountKey);

            ///////////////// **** START REPLACE LATER **** ///////////////////////////

            RewardsStruct storage rewards = accountRecord.rewardsMap["ALL_REWARDS"];
            mapping(address => RewardAccountStruct) storage recipientRewardsMap = rewards.recipientRewardsMap;
            
            ///////////////// **** END REPLACE LATER **** ///////////////////////////

            // console.log("SOL=>17 accountKey[", idx,"] = ", accountRecordList[idx]);
            RewardAccountStruct storage recipientAccountRecord = recipientRewardsMap[accountKey];
            memoryRewards = concat(memoryRewards, getRewardRateRecords(recipientAccountRecord));
            console.log("SOL=>17.4 memoryRewards =", accountKey);
        }
        // console.log("SOL=>3 RETURNING MEMORY REWARDS =", memoryRewards);
        console.log("SOL=>17.5 RETURNING MEMORY REWARDS =", memoryRewards);
        console.log("--------------------------------------------------------------------------------------------------------------------------");
        return memoryRewards;
    }

















    function depositRecipientStakingRewards(address _sponsorKey, address _recipientKey, uint _rate, uint _amount )
        public returns ( uint ) {
        require (_amount > 0, "AMOUNT BALANCE MUST BE LARGER THAN 0");
        string memory errMsg = concat("SPONSOR ACCOUNT ",  toString(_sponsorKey), " NOT FOUND FOR RECIPIENT ACCOUNT ",  toString(_recipientKey));
        require (recipientHasSponsor( _sponsorKey, _recipientKey ), errMsg);
        // console.log("SOL=>1 depositRecipientStakingRewards("); 
        // console.log("SOL=>2 _sponsorKey    = ", _sponsorKey);
        // console.log("SOL=>3 _recipientKey = ", _recipientKey);
        // console.log("SOL=> _rate             = ", _rate);
        // console.log("SOL=> _amount           = ", _amount, ")" );
        totalSupply += _amount;

        // console.log("SOL=>4 FETCHING recipientAccount = accountMap[", _recipientKey, "]");
        AccountStruct storage recipientAccount = accountMap[_recipientKey];
        // console.log("recipientAccount.sponsorAccountList.length =", recipientAccount.sponsorAccountList.length);
        // console.log("recipientAccount.sponsorAccountList[0] =", recipientAccount.sponsorAccountList[0]);

        RewardsStruct storage rewards = recipientAccount.rewardsMap["ALL_REWARDS"];
        rewards.totalStakingRewards += _amount;
        rewards.totalRecipientRewards += _amount;
        mapping(address => RewardAccountStruct) storage recipientRewardsMap = rewards.recipientRewardsMap;


        RewardAccountStruct storage recipientAccountRecord = recipientRewardsMap[_sponsorKey];
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

        return recipientAccountRecord.stakingRewards;
    }

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

        

    // NEW STUFF
        function getRewardRateRecords(RewardAccountStruct storage _rewardAccountRecord)
        internal  view returns (string memory memoryRewards) {
 console.log("SOL=>18 getRewardRateRecords(RewardAccountStruct storage _rewardAccountRecord)");
        
        uint256[] storage rewardRateList = _rewardAccountRecord.rewardRateList;
 console.log("SOL=>18.1 BEFORE memoryRewards", memoryRewards);
 console.log("SOL=>18.2 rewardRateList.length", rewardRateList.length);

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
