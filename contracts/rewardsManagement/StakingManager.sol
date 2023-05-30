// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "../accounts/UnSubscribe.sol";
import "../accounts/Transactions.sol";

contract StakingManager is UnSubscribe{
    constructor(){
    }

//////////////// INSERT STAKING REWARDA/////////////////////////////////////////////////////////////////////

    function depositRecipientStakingRewards(address _sponsorAccount, address _recipientAccount, uint _rate, uint _amount )
        public returns ( uint ) {
        require (_amount > 0, "AMOUNT BALANCE MUST BE LARGER THAN 0");
        string memory errMsg = concat("SPONSOR ACCOUNT ",  toString(_sponsorAccount), " NOT FOUND FOR RECIPIENT ACCOUNT ",  toString(_recipientAccount));
        require (recipientHasSponsor( _sponsorAccount, _recipientAccount ), errMsg);
        // console.log("SOL=>1 depositRecipientStakingRewards("); 
        // console.log("SOL=>2 _sponsorAccount    = ", _sponsorAccount);
        // console.log("SOL=>3 _recipientAccount = ", _recipientAccount);
        // console.log("SOL=> _rate             = ", _rate);
        // console.log("SOL=> _amount           = ", _amount, ")" );
        totalSupply += _amount;

        // console.log("SOL=>4 FETCHING recipientAccount = accountMap[", _recipientAccount, "]");
        AccountStruct storage recipientAccount = accountMap[_recipientAccount];
        // console.log("recipientAccount.sponsorAccountList.length =", recipientAccount.sponsorAccountList.length);
        // console.log("recipientAccount.sponsorAccountList[0] =", recipientAccount.sponsorAccountList[0]);

        RewardsStruct storage rewards = recipientAccount.rewardsMap["RECIPIENT"];
        rewards.totalStakingRewards += _amount;
        rewards.totalRecipientRewards += _amount;
        mapping(address => RewardAccountStruct) storage recipienRewardstMap = rewards.recipienRewardstMap;


        RewardAccountStruct storage recipientAccountRecord = recipienRewardstMap[_sponsorAccount];
        recipientAccountRecord.stakingRewards += _amount;

        uint256[] storage rewardRateList = recipientAccountRecord.rewardRateList;
        RewardRateStruct storage rewardRateMap = recipientAccountRecord.rewardRateMap[_rate];
        if (rewardRateMap.rate != _rate) {
            rewardRateList.push(_rate);
            rewardRateMap.rate = _rate;
        }
        
         RewardsTransactionStruct[] storage rewardTransactionList = rewardRateMap.rewardTransactionList;

        depositRewardTransaction( rewardTransactionList, _rate, _amount );

        return recipientAccountRecord.stakingRewards;
    }

    function depositRewardTransaction(  RewardsTransactionStruct[] storage rewardTransactionList, 
                                        uint _rate, uint _amount )  internal {
        // console.log("SOL=>9 depositRewardTransaction("); 
        // console.log("SOL=>10 stakingAccountRecord.stakingRewards = ", stakingAccountRecord.stakingRewards);
        // console.log("SOL=>11               _rate                 = ", _rate);
        // console.log("SOL=>12               _amount               = ", _amount, ")" );
        // console.log("SOL=>13 BEFORE rewardTransactionList.length = ", rewardTransactionList.length);

        RewardsTransactionStruct memory  rewardsTransactionRecord;
        rewardsTransactionRecord.rate = _rate;
        rewardsTransactionRecord.stakingRewards = _amount;
        rewardsTransactionRecord.updateTime = block.timestamp;
        rewardTransactionList.push(rewardsTransactionRecord);
        // console.log("SOL=>14 AFTER rewardTransactionList.length = ", rewardTransactionList.length);
    }

//////////////// RETREIVE STAKING REWARDA/////////////////////////////////////////////////////////////////////
    function getRecipientRewardAccounts(address accountKey)
        public  view returns (string memory memoryRewards) {
        // console.log("SOL=>15 getRecipientRewardAccounts(", accountKey, ")");
        
            AccountStruct storage sponsorAccount = accountMap[accountKey];
            address[] storage sponsorAccountList = sponsorAccount.sponsorAccountList;
            memoryRewards = "";

            // console.log("SOL=>16 sponsorAccountList.length = ", sponsorAccountList.length);
            for (uint sponsorIdx = 0; sponsorIdx < sponsorAccountList.length; sponsorIdx++) {
                address sponsorKey = sponsorAccountList[sponsorIdx];
                memoryRewards = concat(memoryRewards, "SPONSOR_ACCOUNT:", toString(sponsorKey));

            ///////////////// **** START REPLACE LATER **** ///////////////////////////

            RewardsStruct storage rewards = sponsorAccount.rewardsMap["RECIPIENT"];
            mapping(address => RewardAccountStruct) storage recipienRewardstMap = rewards.recipienRewardstMap;
            
            ///////////////// **** END REPLACE LATER **** ///////////////////////////

            // console.log("SOL=>17 sponsorKey[", sponsorIdx,"] = ", sponsorAccountList[sponsorIdx]);
            RewardAccountStruct storage recipientAccountRecord = recipienRewardstMap[sponsorKey];


            uint256[] storage rewardRateList = recipientAccountRecord.rewardRateList;


            /////////////////////////////////////////
            uint rate = rewardRateList[0];
            RewardRateStruct storage rewardRateMap = recipientAccountRecord.rewardRateMap[rate];
            RewardsTransactionStruct[] storage rewardTransactionList = rewardRateMap.rewardTransactionList; 

            // console.log("SOL=> recipientAccountRecord.rewardTransactionList.length         = ", recipientAccountRecord.rewardTransactionList.length);
            // console.log("SOL=> recipientAccountRecord.rewardTransactionList.stakingRewards = ", recipientAccountRecord.stakingRewards);
            memoryRewards = concat(memoryRewards, ",", toString(recipientAccountRecord.stakingRewards));

            if (rewardTransactionList.length != 0) {
                string memory stringRewards = serializeRewardsTransactionList(rewardTransactionList);
                memoryRewards = concat(memoryRewards, "\n" , stringRewards);
            }
        }
        // console.log("SOL=>3 RETURNING MEMORY REWARDS =", memoryRewards);
        return memoryRewards;
    }

    function getRateTransactionList(RewardAccountStruct storage recipientAccountRecord)
        internal  view returns (string memory memoryRewards) {
        
        uint256[] storage rewardRateList = recipientAccountRecord.rewardRateList;

        for (uint rateIdx = 0; rateIdx < rewardRateList.length; rateIdx++) {
            uint rate = rewardRateList[rateIdx];
            RewardRateStruct storage rewardRateRecord = recipientAccountRecord.rewardRateMap[rate];
            RewardsTransactionStruct[] storage rewardTransactionList = rewardRateRecord.rewardTransactionList;

            memoryRewards = concat(memoryRewards, ",", toString(recipientAccountRecord.stakingRewards));
                // console.log("SOL=> recipientAccountRecord.rewardTransactionList.length         = ", recipientAccountRecord.rewardTransactionList.length);
                // console.log("SOL=> recipientAccountRecord.rewardTransactionList.stakingRewards = ", recipientAccountRecord.stakingRewards);

            if (rewardTransactionList.length != 0) {
                string memory stringRewards = serializeRewardsTransactionList(rewardTransactionList);
                memoryRewards = concat(memoryRewards, "\n" , stringRewards);
            }
        }
        // console.log("SOL=>18 memoryRewards", memoryRewards);
        // console.log("*** END SOL ******************************************************************************");
        return memoryRewards;
    }

    function serializeRewardsTransactionList(RewardsTransactionStruct[] storage rewardTransactionList)
        internal  view returns (string memory memoryRewards) {
        for (uint idx = 0; idx < rewardTransactionList.length; idx++) {
            RewardsTransactionStruct storage rewardTransaction = rewardTransactionList[idx];
            // console.log("SOL5=> rewardTransaction.rate           = ", rewardTransaction.rate);
            // console.log("SOL6=> rewardTransaction.updateTime     = ", rewardTransaction.updateTime);
            // console.log("SOL7=> rewardTransaction.stakingRewards = ", rewardTransaction.stakingRewards);

            memoryRewards = concat(memoryRewards , toString(rewardTransaction.rate), "," , toString(rewardTransaction.updateTime));
            memoryRewards = concat(memoryRewards , ",", toString(rewardTransaction.stakingRewards));
            if (idx < rewardTransactionList.length - 1) {
                memoryRewards = concat(memoryRewards , "\n" );
            }
           // console.log("SOL=>21 getRecipientRewardAccounts:Transaction =", memoryRewards);
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
