// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./StakingManager.sol";

contract RewardsManager is StakingManager{

    constructor() {
    }

    function updateAccountRewards( address _sourceKey )
    public view {
        AccountStruct storage account = accountMap[_sourceKey];
        address[] storage recipientKeys = account.recipientAccountList;             // If Sponsor List of Recipient Accounts
        mapping(address => RecipientStruct) storage recipientMap = account.recipientMap;
        for (uint idx = 0; idx < recipientKeys.length; idx++) {
            address recipientKey = recipientKeys[idx];
            updateRecipientRateListRewards(recipientMap[recipientKey]);
        }
    }

    function updateRecipientRateListRewards( RecipientStruct storage recipientRecord )
    internal view {
        uint256[] storage recipientRateList = recipientRecord.recipientRateList;
        mapping(uint256 => RecipientRateStruct) storage recipientRateMap = recipientRecord.recipientRateMap;

        for (uint idx = 0; idx < recipientRateList.length; idx++) {
            uint256 recipientMapIdx = recipientRateList[idx];
            updateRecipientRateRewards(recipientRateMap[recipientMapIdx]);
        }
    }

    function updateRecipientRateRewards( RecipientRateStruct storage recipientRateRecord )
    internal view {
        uint256 currentTimeStamp = block.timestamp;
        uint256 stakedSPCoins  = recipientRateRecord.stakedSPCoins;
        uint256 lastUpdateTime = recipientRateRecord.lastUpdateTime;
        calculatrRewards( stakedSPCoins, lastUpdateTime, currentTimeStamp );
    }

    function calculatrRewards( uint256 stakedSPCoins, uint256 lastUpdate, uint256 currentTimeStamp)
    public pure returns (uint256 rewards) {
        rewards = currentTimeStamp - lastUpdate;
        return rewards;
    }


/*
    function updateAccountRewards( address _sourceKey , uint _accountType )
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
