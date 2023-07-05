// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
// import "../accounts/AgentRates.sol";
import "./StakingManager.sol";

contract RewardsManager is StakingManager{

    constructor() {
    }

    function updateAccountStakingRewards( address _sourceKey )
    public view returns (uint256 totalRewards){
        // console.log("SOL 1.0 -------------------------------------------");
        console.log("SOL 1.1 updateAccountStakingRewards(", toString(_sourceKey), ")");
        uint256 currentTimeStamp = block.timestamp;
        AccountStruct storage account = accountMap[_sourceKey];
        address[] storage recipientKeys = account.recipientAccountList;             // If Sponsor List of Recipient Accounts
        mapping(address => RecipientStruct) storage recipientMap = account.recipientMap;
        console.log("SOL 1.2 recipientKeys.length = ",recipientKeys.length);
        // rewardsString = concat("SOL 1.2 RECIPIENT_KEYS_LENGTH:", toString(recipientKeys.length));
        for (uint idx = 0; idx < recipientKeys.length; idx++) {
            // rewardsString = concat(rewardsString, "\nRECIPIENT_IDX:", toString(idx));
            // rewardsString = concat(rewardsString, "\nRECIPIENT_KEY:", toString(recipientKeys[idx]));
            address recipientKey = recipientKeys[idx];
            // string memory tmpRewards = getStakingRewardsRateDataString(recipientMap[recipientKey], currentTimeStamp );
            totalRewards += updateRecipientRateListRewards(recipientMap[recipientKey], currentTimeStamp );
            
            // rewardsString = concat(rewardsString, "\n", tmpRewards);
        }
        console.log("SOL 1.3 totalRewards = ", totalRewards);
        // console.log("SOL 1.4 -------------------------------------------");
        return totalRewards ;
    }

    function updateRecipientRateListRewards( RecipientStruct storage recipientRecord, uint256 _transactionTimeStamp )
    internal view returns ( uint rewards ) {
        console.log("updateRecipientRateListRewards(recipientRecord)");
        uint256[] storage recipientRateList = recipientRecord.recipientRateList;
        mapping(uint256 => RecipientRateStruct) storage recipientRateMap = recipientRecord.recipientRateMap;
        for (uint idx = 0; idx < recipientRateList.length; idx++) {
            uint256 recipientMapIdx = recipientRateList[idx];
            rewards =  updateRecipientRateRewards(recipientRateMap[recipientMapIdx], _transactionTimeStamp);
        }
        return rewards ;
    }

/*
    function getStakingRewardsRateDataString( RecipientStruct storage recipientRecord, uint256 _transactionTimeStamp )
    internal view returns (string memory rewardsString) {
        // console.log("SOL=> 2.0updateRecipientRateListRewards(recipientRecord)");
        uint256[] storage recipientRateList = recipientRecord.recipientRateList;
        mapping(uint256 => RecipientRateStruct) storage recipientRateMap = recipientRecord.recipientRateMap;
        rewardsString = concat("RECIPIENT_RATE_LIST_LENGTH:", toString(recipientRateList.length));
        for (uint idx = 0; idx < recipientRateList.length; idx++) {

           // rewardsString = concat(rewardsString, "\nRECIPIENT_RATE:", toString(idx));
            uint256 recipientMapIdx = recipientRateList[idx];
            RecipientRateStruct storage recipientRateRecord = recipientRateMap[recipientMapIdx];
            uint256 stakedSPCoins    = recipientRateRecord.stakedSPCoins;
            uint256 lastUpdateTime   = recipientRateRecord.lastUpdateTime;
            uint256 recipientRate    = recipientRateRecord.recipientRate;

            string memory tmpRewards= getStakingRewardsRateRecordString( stakedSPCoins, lastUpdateTime, _transactionTimeStamp, recipientRate );
            rewardsString = concat(rewardsString, "\n", tmpRewards);
        }
        return rewardsString ;
    }

    function getStakingRewardsRateRecordString( uint256 _stakedSPCoins, uint256 _lastUpdateTime, uint256 _transactionTimeStamp, uint256 _rate )
    public view returns ( string memory rewardsString ) {
        // console.log("SOL=>3.0 getStakingRewardsRateRecordString(_stakedSPCoins, _lastUpdateTime, _transactionTimeStamp, _rate)");
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
        // console.log("SOL=>3.1 rewardsString = ", rewardsString); 
        return rewardsString ;
    }
*/

    function updateRecipientRateRewards( RecipientRateStruct storage _recipientRateRecord, uint256 _transactionTimeStamp )
    internal view returns ( uint rewards ) {
        // console.log("updateRecipientRateListRewards(_recipientRateRecord)");
        uint256 stakedSPCoins    = _recipientRateRecord.stakedSPCoins;
        uint256 recipientRate    = _recipientRateRecord.recipientRate;
        uint256 lastUpdateTime   = _recipientRateRecord.lastUpdateTime;
        rewards = calculateStakingRewards( stakedSPCoins, lastUpdateTime, _transactionTimeStamp, recipientRate );
        // console.log("SOL=>4.1 rewardsString = ", rewards); 
        return rewards ;
    }

///////////////////////////////////////////////////////////////////////////////////

    function updateRecipientRateRewards(RecipientRateStruct storage recipientRateRecord, address _recipientKey, uint _transactionTimeStamp)
        internal returns (uint totalRewards) {

        uint lastUpdateTime = recipientRateRecord.lastUpdateTime;
        uint recipientRate = recipientRateRecord.recipientRate;
        recipientRateRecord.lastUpdateTime = _transactionTimeStamp;
        if ( recipientRateRecord.inserted && lastUpdateTime < _transactionTimeStamp) {
            console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRR agentRateRecord.lastUpdateTime  = ", lastUpdateTime);
            console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRR _transactionTimeStamp           = ", _transactionTimeStamp);
            console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRR recipientRate                   = ", recipientRate);
            uint recipientRewards = calculateStakingRewards( recipientRateRecord.stakedSPCoins, lastUpdateTime, _transactionTimeStamp, recipientRateRecord.recipientRate );
            totalRewards += recipientRewards;
           console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRR Recipient Calculated Rewards     = ", recipientRewards);

            depositStakingRewards( RECIPIENT, msg.sender, _recipientKey, recipientRate, burnAddress, 0, recipientRewards);
        } else recipientRateRecord.inserted = true;
        return totalRewards;
    }

    function calculateStakingRewards( uint256 _stakedSPCoins, uint256 _lastUpdateTime, uint256 _transactionTimeStamp, uint256 _rate )
    public view returns (uint rewards) {
        console.log("SOL=>4.0 _stakedSPCoins = ", _stakedSPCoins); 
        console.log("SOL=>4.1 _lastUpdateTime = ", _lastUpdateTime); 
        console.log("SOL=>4.2 _transactionTimeStamp = ", _transactionTimeStamp); 
        console.log("SOL=>4.3 _rate = ", _rate); 
        console.log("SOL=>4.4 year = ", year); 
        uint256 timeDiff = _lastUpdateTime > _transactionTimeStamp ? 0 : _transactionTimeStamp - _lastUpdateTime;
        console.log("SOL=>4.5 timeDiff = ", timeDiff); 
        uint256 timeRateMultiplier = ( timeDiff * _stakedSPCoins * _rate ) / 100;
        rewards = timeRateMultiplier/year;
        console.log("SOL=>4.6 rewardsString = ", rewards); 

        return rewards;
    }

}

