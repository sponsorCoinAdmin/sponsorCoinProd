// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./StakingManager.sol";
import "../accounts/AgentRates.sol";

contract RewardsManager is AgentRates{

    constructor() {
    }

    function updateAccountStakingRewards( address _sourceKey )
    public view returns (string memory rewardsString){
        // console.log("updateAccountStakingRewards(", toString(_sourceKey), ")");
        AccountStruct storage account = accountMap[_sourceKey];
        address[] storage recipientKeys = account.recipientAccountList;             // If Sponsor List of Recipient Accounts
        mapping(address => RecipientStruct) storage recipientMap = account.recipientMap;
        // console.log("recipientKeys.length = ",recipientKeys.length);
        rewardsString = concat("RECIPIENT_KEYS_LENGTH:", toString(recipientKeys.length));
        for (uint idx = 0; idx < recipientKeys.length; idx++) {
            rewardsString = concat(rewardsString, "\nRECIPIENT_IDX:", toString(idx));
            rewardsString = concat(rewardsString, "\nRECIPIENT_KEY:", toString(recipientKeys[idx]));
            address recipientKey = recipientKeys[idx];
            string memory tmpRewards;
            uint256 rewards;
            (rewards, tmpRewards) =  updateRecipientRateListRewards(recipientMap[recipientKey]);
            rewardsString = concat(rewardsString, "\n", tmpRewards);
        }
        // console.log("SOL 1.0 -------------------------------------------");
        // console.log(rewardsString);
        // console.log("SOL 1.1 -------------------------------------------");
        return rewardsString ;
    }

    function updateRecipientRateListRewards( RecipientStruct storage recipientRecord )
    internal view returns (uint rewards, string memory rewardsString) {
        // console.log("updateRecipientRateListRewards(recipientRecord)");
        uint256[] storage recipientRateList = recipientRecord.recipientRateList;
        mapping(uint256 => RecipientRateStruct) storage recipientRateMap = recipientRecord.recipientRateMap;
        rewardsString = concat("RECIPIENT_RATE_LIST_LENGTH:", toString(recipientRateList.length));
        for (uint idx = 0; idx < recipientRateList.length; idx++) {
            // rewardsString = concat(rewardsString, "\nRECIPIENT_RATE:", toString(idx));
            uint256 recipientMapIdx = recipientRateList[idx];
            string memory tmpRewards;
            (rewards, tmpRewards) =  updateRecipientRateRewards(recipientRateMap[recipientMapIdx]);
            rewardsString = concat(rewardsString, "\n", tmpRewards);
        }
        return (rewards, rewardsString) ;
    }

    function updateRecipientRateRewards( RecipientRateStruct storage _recipientRateRecord )
    internal view returns (uint rewards, string memory rewardsString) {
        // console.log("updateRecipientRateListRewards(_recipientRateRecord)");
        uint256 currentTimeStamp = block.timestamp;
        uint256 stakedSPCoins    = _recipientRateRecord.stakedSPCoins;
        uint256 lastUpdateTime   = _recipientRateRecord.lastUpdateTime;
        uint256 recipientRate    = _recipientRateRecord.recipientRate;
        rewards = calculateStakingRewards( stakedSPCoins, lastUpdateTime, currentTimeStamp, recipientRate );
        rewardsString = getStakingRewardsRateDataString( stakedSPCoins, lastUpdateTime, currentTimeStamp, recipientRate );
        return (rewards, rewardsString) ;
    }

    function getStakingRewardsRateDataString( uint256 _stakedSPCoins, uint256 _lastUpdateTime, uint256 _transactionTimeStamp, uint256 _rate )
    public view returns ( string memory rewardsString ) {
        // console.log("getStakingRewardsRateDataString(_stakedSPCoins, _lastUpdateTime, _transactionTimeStamp, _rate)");
        uint256 timeDiff = _lastUpdateTime > _transactionTimeStamp ? 0 : _transactionTimeStamp - _lastUpdateTime;
        uint256 timeRateMultiplier = ( timeDiff * _stakedSPCoins * _rate ) / 100;
        uint256 rewards = calculateStakingRewards( _stakedSPCoins, _lastUpdateTime, _transactionTimeStamp, _rate );

        rewardsString = "RECORD_RATE_DATA\n";
        rewardsString = concat(rewardsString, "TRANSACTION_TIME_STAMP:",       toString(_transactionTimeStamp));
        rewardsString = concat(rewardsString, "\nLAST_UPDATE_TIME:",           toString(_lastUpdateTime));
        rewardsString = concat(rewardsString, "\nRECIPIENT_RATE:",             toString(_rate));
        rewardsString = concat(rewardsString, "\nTIME_DIFFERENCE:",            toString(timeDiff));
        rewardsString = concat(rewardsString, "\nSTAKED_SPONSOR_COINS:",       toString(_stakedSPCoins));
        rewardsString = concat(rewardsString, "\nTIME_RATE_MULTIPLIER:",       toString(timeRateMultiplier));
        rewardsString = concat(rewardsString, "\nYEAR_IN_SECONDS:",            toString(year));
        rewardsString = concat(rewardsString, "\nCALCULATED_STAKING_REWARDS:", toString(rewards));
        return rewardsString ;
    }

    function calculateStakingRewards( uint256 _stakedSPCoins, uint256 _lastUpdateTime, uint256 _transactionTimeStamp, uint256 _rate )
    public pure returns (uint rewards) {
        uint256 timeDiff = _lastUpdateTime > _transactionTimeStamp ? 0 : _transactionTimeStamp - _lastUpdateTime;
        uint256 timeRateMultiplier = ( timeDiff * _stakedSPCoins * _rate ) / 100;
        rewards = timeRateMultiplier/year;
        return rewards;
    }

}
