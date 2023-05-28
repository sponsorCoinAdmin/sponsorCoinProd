// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "../accounts/UnSubscribe.sol";
import "../accounts/Transactions.sol";

contract StakingManager is UnSubscribe{
    constructor(){
    }

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


        recipientAccount.totalStakingRewards += _amount;
        mapping(address => StakingAccountStruct) storage recipienRewardstMap = recipientAccount.recipienRewardstMap;
        StakingAccountStruct storage recipientAccountRecord = recipienRewardstMap[_sponsorAccount];

        depositStakingRewards( recipientAccountRecord, _rate, _amount );

        return recipientAccountRecord.stakingRewards;
    }

    function depositStakingRewards( StakingAccountStruct storage stakingAccountRecord, 
                                        uint _rate, uint _amount )  internal {
        // console.log("SOL=>9 depositStakingRewards("); 
        // console.log("SOL=>10 stakingAccountRecord.stakingRewards = ", stakingAccountRecord.stakingRewards);
        // console.log("SOL=>11               _rate                 = ", _rate);
        // console.log("SOL=>12               _amount               = ", _amount, ")" );
        stakingAccountRecord.stakingRewards += _amount; 
        RewardsTransactionStruct[] storage rewardTransactionList = stakingAccountRecord.rewardTransactionList;
        // console.log("SOL=>13 BEFORE rewardTransactionList.length = ", rewardTransactionList.length);

        RewardsTransactionStruct memory  rewardsTransactionRecord;
        rewardsTransactionRecord.rate = _rate;
        rewardsTransactionRecord.stakingRewards = _amount;
        rewardsTransactionRecord.updateTime = block.timestamp;
        rewardTransactionList.push(rewardsTransactionRecord);
        // console.log("SOL=>14 AFTER rewardTransactionList.length = ", rewardTransactionList.length);
    }

/////////////////////////////////////////////////////////////////////////////////////
    function getRecipientRewardAccounts(address accountKey)
        public  view returns (string memory memoryRewards) {
        // console.log("*** START SOL ******************************************************************************");
        // console.log("SOL=>15 getRecipientRewardAccounts(", accountKey, ")");
        
        AccountStruct storage sponsorAccount = accountMap[accountKey];
        address[] storage sponsorAccountList = sponsorAccount.sponsorAccountList;
        memoryRewards = "";

        // console.log("SOL=>16 sponsorAccountList.length = ", sponsorAccountList.length);
        for (uint sponsorIdx = 0; sponsorIdx < sponsorAccountList.length; sponsorIdx++) {
            address sponsorKey = sponsorAccountList[sponsorIdx];
            memoryRewards = concat(memoryRewards, "SPONSOR_ACCOUNT:", toString(sponsorKey));
            // console.log("SOL=>17 sponsorKey[", sponsorIdx,"] = ", sponsorAccountList[sponsorIdx]);
            mapping(address => StakingAccountStruct) storage recipienRewardstMap = sponsorAccount.recipienRewardstMap;
            StakingAccountStruct storage recipientAccountRecord = recipienRewardstMap[sponsorKey];
            // console.log("SOL=> recipientAccountRecord.rewardTransactionList.length         = ", recipientAccountRecord.rewardTransactionList.length);
            // console.log("SOL=> recipientAccountRecord.rewardTransactionList.stakingRewards = ", recipientAccountRecord.stakingRewards);

            RewardsTransactionStruct[] storage rewardTransactionList = recipientAccountRecord.rewardTransactionList;
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
}
