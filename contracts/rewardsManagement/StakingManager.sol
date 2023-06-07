// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "../accounts/UnSubscribe.sol";
import "../accounts/Transactions.sol";

contract StakingManager is UnSubscribe{
    constructor(){
    }

//////////////// INSERT STAKING REWARDS /////////////////////////////////////////////////////////////////////

    function depositAgentStakingRewards(address _recipientAccount, address _agentAccount, uint _rate, uint _amount )
        public returns ( uint ) {
        require (_amount > 0, "AMOUNT BALANCE MUST BE LARGER THAN 0");
        string memory errMsg = concat("RECIPIENT ACCOUNT ",  toString(_recipientAccount), " NOT FOUND FOR AGENT ACCOUNT ",  toString(_agentAccount));
        require (agentHasRecipient( _recipientAccount, _agentAccount ), errMsg);
        console.log("SOL=>1 depositAgentStakingRewards("); 
        console.log("SOL=>2 _recipientAccount    = ", _recipientAccount);
        console.log("SOL=>3 _agentAccount = ", _agentAccount);
        console.log("SOL=> _rate             = ", _rate);
        console.log("SOL=> _amount           = ", _amount, ")" );
        totalSupply += _amount;

        // console.log("SOL=>4 FETCHING agentAccount = accountMap[", _agentAccount, "]");
        AccountStruct storage agentAccount = accountMap[_agentAccount];
        // console.log("agentAccount.recipientAccountList.length =", agentAccount.recipientAccountList.length);
        // console.log("agentAccount.recipientAccountList[0] =", agentAccount.recipientAccountList[0]);

        RewardsStruct storage rewards = agentAccount.rewardsMap["ALL_REWARDS"];
        rewards.totalStakingRewards += _amount;
        rewards.totalAgentRewards += _amount;
        mapping(address => RewardAccountStruct) storage agentRewardsMap = rewards.agentRewardsMap;


        RewardAccountStruct storage agentAccountRecord = agentRewardsMap[_recipientAccount];
        agentAccountRecord.stakingRewards += _amount;

        uint256[] storage rewardRateList = agentAccountRecord.rewardRateList;
        RewardRateStruct storage rewardRateRecord = agentAccountRecord.rewardRateMap[_rate];
        if (rewardRateRecord.rate != _rate) {
            rewardRateList.push(_rate);
            rewardRateRecord.rate = _rate;
        }
        rewardRateRecord.stakingRewards += _amount;
        RewardsTransactionStruct[] storage rewardTransactionList = rewardRateRecord.rewardTransactionList;
        depositRewardTransaction( rewardTransactionList, _amount );


        // TESTING REMOVE LATER
        console.log("=========================================================================================================================");
        getAgentRewardAccounts(_recipientAccount);
        console.log("=========================================================================================================================");
        //END TESTION

        return agentAccountRecord.stakingRewards;
    }

    function getAgentRewardAccounts(address _recipientAccount)
        public view returns (string memory memoryRewards) {
        console.log("--------------------------------------------------------------------------------------------------------------------------");
        console.log("SOL=>15 getAgentRewardAccounts(", _recipientAccount, ")");
        
        AccountStruct storage recipientAccount = accountMap[_recipientAccount];
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

    function getRecipientRewardAccounts(address _sponsorKey)
        public view returns (string memory memoryRewards) {
        console.log("--------------------------------------------------------------------------------------------------------------------------");
        console.log("SOL=>17 getRecipientRewardAccounts(", _sponsorKey, ")");
        
        AccountStruct storage sponsorAccount = accountMap[_sponsorKey];
        address[] storage sponsorAccountList = sponsorAccount.sponsorAccountList;
        memoryRewards = "";

            // console.log("SOL=>16 sponsorAccountList.length = ", sponsorAccountList.length);
            // Check the Recipient's Sponsor List
        console.log("SOL=>17.1 sponsorAccountList.length = ", sponsorAccountList.length);
        for (uint sponsorIdx = 0; sponsorIdx < sponsorAccountList.length; sponsorIdx++) {
            address sponsorKey = sponsorAccountList[sponsorIdx];
        console.log("SOL=>17.2 sponsorIdx =", sponsorKey);
            memoryRewards = concat(memoryRewards, "SPONSOR_ACCOUNT:", toString(sponsorKey));
        console.log("SOL=>17.3 memoryRewards =", sponsorKey);

            ///////////////// **** START REPLACE LATER **** ///////////////////////////

            RewardsStruct storage rewards = sponsorAccount.rewardsMap["ALL_REWARDS"];
            mapping(address => RewardAccountStruct) storage recipientRewardsMap = rewards.recipientRewardsMap;
            
            ///////////////// **** END REPLACE LATER **** ///////////////////////////

            // console.log("SOL=>17 sponsorKey[", sponsorIdx,"] = ", sponsorAccountList[sponsorIdx]);
            RewardAccountStruct storage recipientAccountRecord = recipientRewardsMap[sponsorKey];
            memoryRewards = concat(memoryRewards, getRewardRateRecords(recipientAccountRecord));
            console.log("SOL=>17.4 memoryRewards =", sponsorKey);
        }
        // console.log("SOL=>3 RETURNING MEMORY REWARDS =", memoryRewards);
        console.log("SOL=>17.5 RETURNING MEMORY REWARDS =", memoryRewards);
        console.log("--------------------------------------------------------------------------------------------------------------------------");
        return memoryRewards;
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

        RewardsStruct storage rewards = recipientAccount.rewardsMap["ALL_REWARDS"];
        rewards.totalStakingRewards += _amount;
        rewards.totalRecipientRewards += _amount;
        mapping(address => RewardAccountStruct) storage recipientRewardsMap = rewards.recipientRewardsMap;


        RewardAccountStruct storage recipientAccountRecord = recipientRewardsMap[_sponsorAccount];
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
