// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
// import "../accounts/AgentRates.sol";
import "./StakingManager.sol";

contract RewardsManager is StakingManager{

    constructor() {
    }

    // Calculate and update an Account Sopnsor's Reward
    // As a Sponsor account, to get sponsor rewards
    //    1. Get a List of Recipients (_recipientKeys) from recipientAccountList
    //    2.  For Each Recipient (_recipientKey)
    //    3.    Get the RecipientRecord (recipientRec) from the recipientMap
    //    4.      Get a list of RecipientRateRecords (recipientRateRecords) from RecipientStruct recipientRec
    //    5.        For each recipientRate call function
    //    6.          updateRecipientRateRewards(recipientRateRecord, _recipientKey, _transactionTimeStamp);

    // **ToDo** Calculate and Update an Account Agent's Rewards
    //    1. Get a List of Recipients (_recipientKeys) from agentsParentRecipientAccountList
    //    2.   For Each Recipient (_recipientKey)
    //    3.     Get the RecipientRecord (recipientRec) from the recipientMap
    //    4.       Get a list of RecipientRateRecords (recipientRateRecords) from RecipientStruct recipientRec
    //    5.         For each recipientRate call function 
    //    6.           Get AgentStruct from agentMap using agentKey
    //    7.              For each agentRateRecord call 
    //    8.                updateAgentRateRewards( agentRateRecord, _agentKey, _recipientKey,  _recipientRate, _transactionTimeStamp);

    // **ToDo** To Calculate and Update an Account Recipient's Rewards
    //    1. Get a List of Sponsors (_recipientKeys) from agentsParentRecipientAccountList
    //    2.   For Each Sponsor (_sponsorKey)
    //    3.    Get the RecipientRecord (recipientRec) from the recipientMap
    //    4.      Get a list of RecipientRateRecords (recipientRateRecords) from RecipientStruct recipientRec
    //    5.        For each recipientRate call function
    //    6.          updateRecipientRateRewards(recipientRateRecord, _recipientKey, _transactionTimeStamp);

/*
    function updateAccountStakingRewards( address _sourceKey )
    public returns (uint256 totalRewards) {
        // console.log("SOL 1.0 -------------------------------------------");
        // console.log("SOL 1.1 updateAccountStakingRewards(", toString(_sourceKey), ")");
        AccountStruct storage accountRec = accountMap[_sourceKey];
        uint256 currentTimeStamp = block.timestamp;

        totalRewards += updateAccountRecipientRewards( accountRec, currentTimeStamp);
        // updateAccountAgentRewards( accountRec, currentTimeStamp);
        // console.log("SOL=>1.0 totalRewards = ",totalRewards );
        return totalRewards;
    }

    
    function updateAccountRecipientRewards_OLD( AccountStruct storage accountRec, uint _transactionTimeStamp )
    internal returns (uint256 totalRewards) {
        mapping(address => RecipientStruct) storage recipientMap = accountRec.recipientMap;
        address[] storage recipientKeys = accountRec.recipientAccountList;             // If Sponsor List of Recipient Accounts
        for (uint idx = 0; idx < recipientKeys.length; idx++) {
            address recipientKey = recipientKeys[idx];
            RecipientStruct storage recipientRec = recipientMap[recipientKey];
            mapping(uint256 => RecipientRateStruct) storage recipientRateMap = recipientRec.recipientRateMap;
            uint256[] storage recipientRateList = recipientRec.recipientRateList;
            for (uint rateIdx = 0; rateIdx < recipientRateList.length; rateIdx++) {
                uint recipientRate = recipientRateList[rateIdx];
                RecipientRateStruct storage recipientRateRecord = recipientRateMap[recipientRate];
                totalRewards += updateRecipientRateRewards(recipientRateRecord, recipientKey, _transactionTimeStamp);
            }
        }
        return totalRewards;
    }
*/

/** To Update an Accounts stacking rewards allocation,  we must update all reward types.
 *  The reward types are 
 *      1. Sponsor Rewards   ~ If account is sponsor
 *      2. Recipient Rewards ~ If account is Recipient
 *      3. Agent Rewards     ~ If account is agent
 *  Note: An account may be any or all of the above types and the accounts total rewards
 *        is the sum of each type.
**/

    function updateAccountStakingRewards( address _sourceKey )
    public returns (uint256 totalRewards) {
        // console.log("SOL 1.0 -------------------------------------------");
        // console.log("SOL 1.1 updateAccountStakingRewards(", toString(_sourceKey), ")");
        AccountStruct storage accountRec = accountMap[_sourceKey];
        uint256 currentTimeStamp = block.timestamp;

        totalRewards += updateAccountSponsorRewards( accountRec, currentTimeStamp);
        // updateAccountAgentRewards( accountRec, currentTimeStamp);
        // console.log("SOL=>1.0 totalRewards = ",totalRewards );
        // console.log("SOL 1.4 -------------------------------------------");
        return totalRewards;
    }

/** To Update a Sponsors Account we must complete the following:
 *  1. Get the Sponsors Recipients
 *  2. Update the Recipients rewards
 *     The rewards is divided umongst the Recipient And Sponsor.
 *  3. Calculate the recipients portion of the reward
 *  4. When the Recipients rewards are allocated, allocate the remaining reward balance to the Sponsor
 *  5. Note: Updating the recipients rewards will allocte the remaining balance to the Sponsor
 *  Algorithm:
 *  Calculate and update an Account Sopnsor's Reward
 *  As a Sponsor account, to get sponsor rewards
 *  2.  For Each Recipient (_recipientKey)
 *  3.    Get the RecipientRecord (recipientRec) from the recipientMap
 *  4.      Get a list of RecipientRateRecords (recipientRateRecords) from RecipientStruct recipientRec
 *  5.        For each recipientRate call function
 *  6.          updateRecipientRateRewards(recipientRateRecord, _recipientKey, _transactionTimeStamp);
**/
    function updateAccountSponsorRewards( AccountStruct storage accountRec, uint256 _transactionTimeStamp )
    internal returns (uint256 totalRewards) {
        // console.log("SOL 1.1 updateAccountRecipientRewards(AccountStruct storage accountRec, uint256 _transactionTimeStamp)");
        mapping(address => RecipientStruct) storage recipientMap = accountRec.recipientMap;
        address[] storage recipientKeys = accountRec.recipientAccountList;             // If Sponsor List of Recipient Accounts
        for (uint idx = 0; idx < recipientKeys.length; idx++) {
            address recipientKey = recipientKeys[idx];
            RecipientStruct storage recipientRecord = recipientMap[recipientKey];
            totalRewards += updateRecipientRateListRewards(recipientRecord, _transactionTimeStamp );
        }
        // console.log("SOL 1.3 totalRewards = ", totalRewards);
        return totalRewards ;
    }

    function updateRecipientRateListRewards( RecipientStruct storage recipientRecord, uint256 _transactionTimeStamp )
    internal returns ( uint rewards ) {
        // console.log("SOL=>7.0 updateRecipientRateListRewards(recipientRecord)");
        uint256[] storage recipientRateList = recipientRecord.recipientRateList;
        mapping(uint256 => RecipientRateStruct) storage recipientRateMap = recipientRecord.recipientRateMap;
        // console.log("SOL=>7.1 updateRecipientRateListRewards:recipientRateList.length = ",recipientRateList.length);
        for (uint idx = 0; idx < recipientRateList.length; idx++) {
            uint256 recipientRate = recipientRateList[idx];
            RecipientRateStruct storage recipientRateRecord = recipientRateMap[recipientRate];
            // console.log("SOL=>7.2 updateRecipientRateListRewards:recipientRecord.recipientKey = ", recipientRecord.recipientKey);
            rewards =  updateRecipientRateRewards( recipientRateRecord, recipientRecord.recipientKey, _transactionTimeStamp);
            // rewards =  calculateRecipientRateRewards(recipientRateRecord, _transactionTimeStamp);
        }
        return rewards ;
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function updateRecipientRateRewards(RecipientRateStruct storage recipientRateRecord, address _recipientKey, uint _transactionTimeStamp)
        internal returns (uint totalRewards) {
        // console.log("SOL=>8.0 updateRecipientRateRewards(recipientRateRecord, address _recipientKey, uint _transactionTimeStamp");

        uint lastUpdateTime = recipientRateRecord.lastUpdateTime;
        uint recipientRate = recipientRateRecord.recipientRate;
        // console.log("SOL=>8.1 updateRecipientRateRewards:lastUpdateTime                     = ", lastUpdateTime); 
        // console.log("SOL=>8.2 updateRecipientRateRewards:_transactionTimeStamp              = ", _transactionTimeStamp); 
        // console.log("SOL=>8.3 updateRecipientRateRewards:recipientRate                      = ", recipientRate); 
        // console.log("SOL=>8.4 updateRecipientRateRewards:agentRateRecord.stakedSPCoins      = ", stakedSPCoins);
        if ( lastUpdateTime != 0 && lastUpdateTime < _transactionTimeStamp) {
            // console.log("SOL=>8.5 updateRecipientRateRewards:agentRateRecord.lastUpdateTime = ", lastUpdateTime);
            // console.log("SOL=>8.6 updateRecipientRateRewards:_transactionTimeStamp          = ", _transactionTimeStamp);
            // console.log("SOL=>8.7 updateRecipientRateRewards:recipientRate                  = ", recipientRate);
            uint recipientRewards = calculateStakingRewards( recipientRateRecord.stakedSPCoins, lastUpdateTime, _transactionTimeStamp, recipientRateRecord.recipientRate );
            totalRewards += recipientRewards;
            // console.log("SOL=>8.8 updateRecipientRateRewards:Recipient Calculated Reward    = ", recipientRewards);
            depositStakingRewards( RECIPIENT, msg.sender, _recipientKey, recipientRate, burnAddress, 0, recipientRewards);

            updateAgentListRewards(recipientRateRecord, _recipientKey, recipientRate, _transactionTimeStamp);
        } 
        recipientRateRecord.lastUpdateTime = _transactionTimeStamp;
        return totalRewards;
    }

    function updateAgentListRewards(RecipientRateStruct storage recipientRateRecord, address _recipientKey,  uint _recipientRate, uint _transactionTimeStamp)
    internal returns (uint totalRewards) {
        mapping(address => AgentStruct) storage agentMap = recipientRateRecord.agentMap;
        address[] storage agentKeys = recipientRateRecord.agentAccountList;             // If Sponsor List of Recipient Accounts

        for (uint idx = 0; idx < agentKeys.length; idx++) {
            address agentKey = agentKeys[idx];
            AgentStruct storage agentRecord = agentMap[agentKey];
            totalRewards += updateAgentRewards(agentRecord, _recipientKey, _recipientRate, _transactionTimeStamp );
        }
        // console.log("SOL 1.3 totalRewards = ", totalRewards);
        return totalRewards ;

    }

   function updateAgentRewards(AgentStruct storage agentRecord, address _recipientKey,  uint _recipientRate, uint _transactionTimeStamp)
    internal returns (uint totalRewards) {
        mapping(uint256 => AgentRateStruct) storage agentRateMap = agentRecord.agentRateMap;
        uint256[] storage agentRateKeys = agentRecord.agentRateList; 
        address agentKey = agentRecord.agentKey;            // If Sponsor List of Recipient Accounts

        for (uint idx = 0; idx < agentRateKeys.length; idx++) {
            uint agentRateKey = agentRateKeys[idx];
            AgentRateStruct storage agentRateRec = agentRateMap[agentRateKey];
            totalRewards += updateAgentRateRewards(agentRateRec, agentKey, _recipientKey, _recipientRate, _transactionTimeStamp );
        }
        // console.log("SOL 1.3 totalRewards = ", totalRewards);
        return totalRewards;
    }

    function updateAgentRateRewards(AgentRateStruct storage agentRateRecord, address _agentKey, address _recipientKey,  uint _recipientRate, uint _transactionTimeStamp)
        internal returns (uint totalRewards) {
        // console.log("updateRecipientRateRewards(agentRateRecord, address _recipientKey, uint _transactionTimeStamp");

        uint lastUpdateTime = agentRateRecord.lastUpdateTime;
        uint agentRate = agentRateRecord.agentRate;
        if ( lastUpdateTime != 0 && lastUpdateTime < _transactionTimeStamp) {
            // console.log("SOL=>3.0 updateAgentRateRewards:agentRateRecord.lastUpdateTime = ", lastUpdateTime);
            // console.log("SOL=>3.2 updateAgentRateRewards:_transactionTimeStamp          = ", _transactionTimeStamp);
            // console.log("SOL=>3.3 updateAgentRateRewards:agentRate                      = ", agentRate);
            uint recipientRewards = calculateStakingRewards( agentRateRecord.stakedSPCoins, lastUpdateTime, _transactionTimeStamp, agentRateRecord.agentRate );
            totalRewards += recipientRewards;
            // console.log("SOL=>3.4 updateAgentRateRewards:recipientRewards               = ", recipientRewards);

            depositStakingRewards( AGENT, msg.sender, _recipientKey, _recipientRate, _agentKey,  agentRate, recipientRewards);
        } 
        agentRateRecord.lastUpdateTime = _transactionTimeStamp;
        return totalRewards;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function calculateRecipientRateRewards( RecipientRateStruct storage _recipientRateRecord, uint256 _transactionTimeStamp )
    internal view returns ( uint rewards ) {
        // console.log("calculateRecipientRateRewards( RecipientRateStruct storage _recipientRateRecord, uint256 _transactionTimeStamp )");
       return calculateStakingRewards(_recipientRateRecord.stakedSPCoins,
                                      _recipientRateRecord.lastUpdateTime,
                                      _transactionTimeStamp,
                                      _recipientRateRecord.recipientRate);
    }

    function calculateStakingRewards( uint256 _stakedSPCoins, uint256 _lastUpdateTime, uint256 _transactionTimeStamp, uint256 _rate )
    public view returns (uint rewards) {
        // console.log("SOL=>4.0 calculateStakingRewards:_stakedSPCoins        = ", _stakedSPCoins); 
        // console.log("SOL=>4.1 calculateStakingRewards:_lastUpdateTime       = ", _lastUpdateTime); 
        // console.log("SOL=>4.2 calculateStakingRewards:_transactionTimeStamp = ", _transactionTimeStamp); 
        // console.log("SOL=>4.3 calculateStakingRewards:_rate                 = ", _rate); 
        // console.log("SOL=>4.4 calculateStakingRewards:year                  = ", year); 
        uint256 timeDiff = _lastUpdateTime > _transactionTimeStamp ? 0 : _transactionTimeStamp - _lastUpdateTime;
        // console.log("SOL=>4.5 calculateStakingRewards:timeDiff              = ", timeDiff); 
        uint256 timeRateMultiplier = ( timeDiff * _stakedSPCoins * _rate ) / 100;
        rewards = timeRateMultiplier/year;
        // console.log("SOL=>4.5 calculateStakingRewards:timeRateMultiplier    = ", timeRateMultiplier); 
        // console.log("SOL=>4.6 calculateStakingRewards:rewardsString         = ", rewards); 

        return rewards;
    }

    //////////////////////////////////////////////////////////////////////////////

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
}
