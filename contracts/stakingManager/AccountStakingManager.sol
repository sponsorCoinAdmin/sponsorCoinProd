// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "../accounts/UnSubscribe.sol";

contract AccountStakingManager is UnSubscribe{

// ###  ALGORITHMIC ARCHITECTURAL DESIGN FOR STAKING REWARDS ALLOCATION ###
// allocateStakingRewards()
// 1. Get the recipients accounts Record as (recipientRecordList)
// 2. Set totalRewards = calcAllRecipientsStakingRewards(recipientRecordList)
// 3. Update all account balances updateAllRecipientsStakingRewards()

/*
function allocateStakingRewards() internal view returns(  AccountStruct[] memory ){
   AccountStruct[] memory recipientRecordList = getRecipientRecordByKeys(accountKey,recipientKey);
   return recipientRecordList;
}
*/// @title A title that should describe the contract/interface
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details
function gitAddressThis() external view returns(address){
   return (address(this));
}

// ### CALCULATE TIME DIFFERENCE IN SECONDS SINCE LAST UPDATE ###
// getAccountTimeInSecondeSinceUpdate(lastUpdateDate)
//     1. Get the current date in seconds(currentDate = block.timestamp).
//     2. Set timeInSecondsSinceLastUpdate = currentDate - lastUpdateDate

/// ### CALCULATE PRORATED STAKING REWARDS MULTIPLIER SINCE LAST UPDATE ###
// calcStakingRewardsMultiplier(rewardsRate, lastUpdateDate)
//    1. Set seconds in yearSeconds = 31,557,600, (@365.25 Days in Actual Year)
//    2. Get the rewardsRate from the account
//    3. Set secondsElapsed = getAccountTimeInSecondeSinceUpdate(lastUpdateDate)
//    4. Prorate Seconds over a year proratedRate = secondsElapsed/yearSeconds
//    5. rewardsMultiplier = proratedRate * annualRewardsRate
//    6. return rewardsMultiplier

// ### CALCULATE PRORATED STAKING REWARDS SINCE LAST UPDATE ###
// calculateAccountSteakingReward(balance, rewardsRate, lastUpdateDate)
//    1. Set rewardsMultiplier = calcStakingRewardsMultiplier(account.rewardsRate, account.lastUpdateDate)
//    2. Get the balance from the account = accountBalance = balancOf(account)
//    3. Set stakingRewards = accountBalance * rewardsMultiplier
//    4. return stakingRewards

// ### CALCULATE STAKING REWARDS FOR ALL RECIPIENTS ###
// calcAllRecipientsStakingRewards(recipientRecordList)
//    1. Set totalRecipientRewards = 0
//    2. For each accountRecipient in recipientRecordList calculate the Staking Rewards as:
//    2.1   Increment totalRecipientRewards += calcRecipientStakingRewards(accountRecipient)
//    3. return totalRecipientRewards

// ### CALCULATE INDIVIDUAL RECIPIENT STAKING REWARDS FOR ACCOUNT ###
// calcRecipientStakingRewards(accountRecipient)
//    1. Set recipientRewards = calculateAccountSteakingReward(balanceOf[sponsorAccount.accountKey], accountRecipient.rewardsRate, accountRecipient.lastUpdateDate)
//    2. Update balance = accountBalance + stakingRewards
//    3. agentAccountList = accountRecipient.
//    4. Set agentRewards = calcAllAgentsStakingRewards(agentAccountList)
//    5. Decrement recipientRewards -= agentRewards
//    6. addAccountRecordsToUpdateStakingRewards(accountRecipient, recipientRewards)
//    7. return recipientRewards

// ### CALCULATE STAKING REWARDS FOR ALL AGENTS ###
// calcAllAgentsStakingRewards(agentAccountList)
//    1. Set totalAgentsRewards = 0
//    3. For each agentAccount in agentAccountList calculate the Staking Rewards as:
//    4.    Increment totalAgentsRewards += calculateAccountSteakingReward(agentAccount)
//    5. addAccountRecordsToUpdateStakingRewards(accountRecipient, recipientRewards)
//    6. return totalAgentsRewards

//*****************************************************************************************************

// ### CALCULATE INDIVIDUAL RECIPIENT STAKING REWARDS FOR ACCOUNT ###
// calcRecipientStakingRewards(accountRecipient, rewardsMultiplier)
//    1. Get a list of the agents accounts (agentAccountList)
//    2. Get the current currBalance with balanceOf() ERC20 function;
//    3. Get the lastUpdate for the recipients Account
//    4. Update Balances of all accounts updateBalances()

//    3. For each agentAccount in agentAccountList calculate the Staking Rewards as:
//       accountStakingReward = calcAgentStakingRewards(agentAccount)

//    3. Add new elementto Record accountsToBeUpdated(account, "Recipient", StakingRewards, currBalance, newBalance)
//    4. Calculate newBalance as currBalance + stakingRewards 
//    3. return accountStakingReward;





// calcAgentsStakingRewards(recipientsRewards, agentKeys)
//    1. Initialize local totalAgentsReward to zero (0).
// ### FOR EACH AGENT PROCESS AS FOLLOWS ###
//    2. Get the agents account, (agentsAccount).
//    3. Get the agents Staking Rewards Interest Rate, (agentsRewardsRate), (between 2% and and 20% of recipientsRewards).
//    4. Get the Agent SPCoin Quantity (agentSCoinQty)
//    5. Calculate the agents SPCoin staking rewards as:
//             agentsReward = (SPCoin Recipient Quanty) * elapsedProratedDays * recipientsRewardsRate
//    6. Increment totalAgentsReward = totalAgentsReward + agentsReward
//    7. return totalAgentsReward



// 8. For the recipientedAccount, get the Recipient Account Rate, (recipientAccountRate), (between 2% and recipientsRewardsRate).
// 9. Calculate the Recipiented Reward, (recipientRewards as stakingRewards * stakingRewardsRate;

// 10. Get the Recipient Agent (recipientsAgent)
//     10.1 If no agent found set agentRewards at 0.
// 11. For the recipientedAccount, get the Recipiented Agent Rate, (recipientAgentRate), (between 1% and recipientAccountRate).
// 10. If Agent not found, AgentRewardRate = 0, otherwise AgentRewardRate = agentRate read, default 1%.
// 11. Calculate the RecipientsReward as, RecipientsRewards = stakingRewards * (1 - (AgentRewardRate/RecipientsRewardRate)).
// 12. Update the TotalQuanty
// 13. Update the Agent TotalQuanty 

    constructor(){
    }
}