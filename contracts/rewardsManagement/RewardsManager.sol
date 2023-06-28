// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./StakingManager.sol";

contract RewardsManager is StakingManager{

    constructor() {
    }

    function updateAccountStakingRewards( address _sourceKey )
    public view returns (string memory rewardsString){
        console.log("updateAccountStakingRewards(", toString(_sourceKey), ")");
        AccountStruct storage account = accountMap[_sourceKey];
        address[] storage recipientKeys = account.recipientAccountList;             // If Sponsor List of Recipient Accounts
        mapping(address => RecipientStruct) storage recipientMap = account.recipientMap;
        // console.log("recipientKeys.length = ",recipientKeys.length);
        rewardsString = concat("recipientKeys.length = ", toString(recipientKeys.length));
        for (uint idx = 0; idx < recipientKeys.length; idx++) {
            rewardsString = concat(rewardsString, "\nrecipientKeys[", toString(idx), "] = ");
            rewardsString = concat(rewardsString, toString(recipientKeys[idx]));
            address recipientKey = recipientKeys[idx];
            string memory tmpRewards;
            uint256 rewards;
            (rewards, tmpRewards) =  updateRecipientRateListRewards(recipientMap[recipientKey]);
            rewardsString = concat(rewardsString, "\n", tmpRewards);
        }
        return rewardsString ;
    }

    function updateRecipientRateListRewards( RecipientStruct storage recipientRecord )
    internal view returns (uint rewards, string memory rewardsString) {
        // console.log("updateRecipientRateListRewards(recipientRecord)");
        uint256[] storage recipientRateList = recipientRecord.recipientRateList;
        mapping(uint256 => RecipientRateStruct) storage recipientRateMap = recipientRecord.recipientRateMap;
        rewardsString = concat("recipientRateList.length = ", toString(recipientRateList.length));
        for (uint idx = 0; idx < recipientRateList.length; idx++) {
            rewardsString = concat(rewardsString, "\nrecipientRateList[", toString(idx), "] = ");
            uint256 recipientMapIdx = recipientRateList[idx];
            string memory tmpRewards;
            (rewards, tmpRewards) =  updateRecipientRateRewards(recipientRateMap[recipientMapIdx]);
            rewardsString = concat(rewardsString, "\n", tmpRewards);
        }
        return (rewards, rewardsString) ;
    }

    function updateRecipientRateRewards( RecipientRateStruct storage _recipientRateRecord )
    internal view returns (uint rewards, string memory rewardsString) {
        console.log("updateRecipientRateListRewards(_recipientRateRecord)");
        uint256 currentTimeStamp = block.timestamp;
        uint256 stakedSPCoins    = _recipientRateRecord.stakedSPCoins;
        uint256 lastUpdateTime   = _recipientRateRecord.lastUpdateTime;
        (rewards, rewardsString) = calculateStakingRewards( stakedSPCoins, lastUpdateTime, currentTimeStamp );
        return (rewards, rewardsString) ;
    }

    function calculateStakingRewards( uint256 _stakedSPCoins, uint256 _lastUpdateTime, uint256 currentTimeStamp)
    public view returns (uint rewards, string memory rewardsString) {
        // console.log("updateRecipientRateListRewards(_stakedSPCoins, lastUpdate, currentTimeStamp)");
        uint256 timeDiff = currentTimeStamp - _lastUpdateTime;
        uint256 timeMultiplier = timeDiff * _stakedSPCoins;
        rewards = timeMultiplier/year;

        // uint timeMultiplier = getAnnualTimeMultiplier(currentTimeStamp*decimals, lastUpdate);

        rewardsString;
        rewardsString = concat(rewardsString, "\ncurrentTimeStamp                     = ", toString(currentTimeStamp));
        rewardsString = concat(rewardsString, "\nSOL==>1.1 _lastUpdateTime            = ", toString(_lastUpdateTime));
        rewardsString = concat(rewardsString, "\nSOL==>1.2 timeDiff                   = ", toString(timeDiff));
        rewardsString = concat(rewardsString, "\nSOL==>1.3 _stakedSPCoins             = ", toString(_stakedSPCoins));
        rewardsString = concat(rewardsString, "\nSOL==>1.3 timeMultiplier             = ", toString(timeMultiplier));
        rewardsString = concat(rewardsString, "\nSOL==>1.4 year                       = ", toString(year));
        rewardsString = concat(rewardsString, "\nSOL==>1.5 Calculated Staking Rewards = ", toString(rewards));
        console.log(rewardsString);
        return (rewards, rewardsString) ;
    }

/*
    function updateAccountStakingRewards( address _sourceKey , uint _accountType )
        public view {
        AccountStruct storage account = accountMap[_sourceKey];
        RewardTypeStruct storage rewardsRecord = account.rewardsMap[getAccountTypeString(_accountType)];
        RewardAccountStruct storage rewardAccountRecord;
        rewardAccountRecord = rewardsRecord.rewardsMap[_sourceKey];
        updateSponsorRewardRecords(rewardAccountRecord);
    }

    function updateSponsorRewardRecords( RewardAccountStruct storage rewardAccountRecord )
        internal view returns (uint  rewards) {
        rewards = updateRewardRecords( rewardAccountRecord );
        return rewards;
    }

    function updateRecipientRewardRecords( RewardAccountStruct storage rewardAccountRecord )
        internal  view returns (uint  rewards) {

        rewards = updateRewardRecords( rewardAccountRecord );
        return rewards;
    }

    function updateAgentRewardRecords( RewardAccountStruct storage rewardAccountRecord )
        internal view returns (uint  rewards) {

        rewards = updateRewardRecords( rewardAccountRecord );
        return rewards;
    }

    function updateRewardRecords( RewardAccountStruct storage rewardAccountRecord )
        internal view returns (uint  rewards) {

        uint256[] storage rewardRateList = rewardAccountRecord.rewardRateList;
        mapping(uint256 => RewardRateStruct) storage rewardRateMap = rewardAccountRecord.rewardRateMap;
        // mapping(uint256 => RewardRateStruct) storagerewardRateMap;

        for (uint idx = 0; idx < rewardRateList.length; idx++) {
            uint rateIdx = rewardRateList[idx];
            RewardRateStruct memory rewardRateRecord = rewardRateMap[rateIdx];
            rewards += calculatedRateRewards(rewardRateRecord);
        }
        return rewards;
   }

    function calculatedRateRewards(RewardRateStruct memory rewardRateRecord)
     public view returns(uint rewards) {
        rewards += getCalculatedRewards(year, rewardRateRecord.rate, rewardRateRecord.stakingRewards);
        return rewards;
    }

    function getCalculatedRewards(uint lastUpdateTime, uint interestRate, uint quantity)
     public view returns(uint rewards) {
        uint accountTimeInSecondeSinceUpdate = getTimeMultiplier(lastUpdateTime);
        rewards = (quantity * accountTimeInSecondeSinceUpdate * interestRate) / 100;
        return rewards;
    }
    */
}
