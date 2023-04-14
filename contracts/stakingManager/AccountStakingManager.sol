// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "../accounts/UnSubscribe.sol";
import "../accounts/Transactions.sol";

contract AccountStakingManager is UnSubscribe{

// ###  ALGORITHMIC ARCHITECTURAL DESIGN FOR STAKING REWARDS ALLOCATION ###
// allocateStakingRewards()
// 1. Get the benificiarias accounts Record as (benificiaryRecordList)
// 2. Set totalRewards = calcAllBenificiariasStakingRewards(benificiaryRecordList)
// 3. Update all account balances updateAllBenificiariasStakingRewards()

/*
function allocateStakingRewards() internal view returns(  AccountStruct[] memory ){
   AccountStruct[] memory benificiaryRecordList = getBenificiaryRecordByKeys(msg.sender);
   return benificiaryRecordList;
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

// ### CALCULATE STAKING REWARDS FOR ALL BENIFICIARYS ###
// calcAllBenificiariasStakingRewards(benificiaryRecordList)
//    1. Set totalBenificiaryRewards = 0
//    2. For each accountBenificiary in benificiaryRecordList calculate the Staking Rewards as:
//    2.1   Increment totalBenificiaryRewards += calcBenificiaryStakingRewards(accountBenificiary)
//    3. return totalBenificiaryRewards

// ### CALCULATE INDIVIDUAL BENIFICIARY STAKING REWARDS FOR ACCOUNT ###
// calcBenificiaryStakingRewards(accountBenificiary)
//    1. Set benificiaryRewards = calculateAccountSteakingReward(accountBenificiary.balanceOf, accountBenificiary.rewardsRate, accountBenificiary.lastUpdateDate)
//    2. Update balance = accountBalance + stakingRewards
//    3. agentAccountList = accountBenificiary.
//    4. Set agentRewards = calcAllAgentsStakingRewards(agentAccountList)
//    5. Decrement benificiaryRewards -= agentRewards
//    6. addAccountRecordsToUpdateStakingRewards(accountBenificiary, benificiaryRewards)
//    7. return benificiaryRewards

// ### CALCULATE STAKING REWARDS FOR ALL AGENTS ###
// calcAllAgentsStakingRewards(agentAccountList)
//    1. Set totalAgentsRewards = 0
//    3. For each agentAccount in agentAccountList calculate the Staking Rewards as:
//    4.    Increment totalAgentsRewards += calculateAccountSteakingReward(agentAccount)
//    5. addAccountRecordsToUpdateStakingRewards(accountBenificiary, benificiaryRewards)
//    6. return totalAgentsRewards

//*****************************************************************************************************

// ### CALCULATE INDIVIDUAL BENIFICIARY STAKING REWARDS FOR ACCOUNT ###
// calcBenificiaryStakingRewards(accountBenificiary, rewardsMultiplier)
//    1. Get a list of the agents accounts (agentAccountList)
//    2. Get the current currBalance with balanceOf() ERC20 function;
//    3. Get the lastUpdate for the benificiarias Account
//    4. Update Balances of all accounts updateBalances()

//    3. For each agentAccount in agentAccountList calculate the Staking Rewards as:
//       accountStakingReward = calcAgentStakingRewards(agentAccount)

//    3. Add new elementto Record accountsToBeUpdated(account, "Benificiary", StakingRewards, currBalance, newBalance)
//    4. Calculate newBalance as currBalance + stakingRewards 
//    3. return accountStakingReward;





// calcAgentsStakingRewards(benificiariasRewards, agentKeys)
//    1. Initialize local totalAgentsReward to zero (0).
// ### FOR EACH AGENT PROCESS AS FOLLOWS ###
//    2. Get the agents account, (agentsAccount).
//    3. Get the agents Staking Rewards Interest Rate, (agentsRewardsRate), (between 2% and and 20% of benificiariasRewards).
//    4. Get the Agents SPCoin Quantity (agentSCoinQty)
//    5. Calculate the agents SPCoin staking rewards as:
//             agentsReward = (SPCoin Benificiary Quanty) * elapsedProratedDays * benificiariasRewardsRate
//    6. Increment totalAgentsReward = totalAgentsReward + agentsReward
//    7. return totalAgentsReward



// 8. For the benificiaryedAccount, get the Benificiarias Account Rate, (benificiaryAccountRate), (between 2% and benificiariasRewardsRate).
// 9. Calculate the Benificiaryed Reward, (benificiaryRewards as stakingRewards * stakingRewardsRate;

// 10. Get the Benificiarias Agent (benificiariasAgent)
//     10.1 If no agent found set agentRewards at 0.
// 11. For the benificiaryedAccount, get the Benificiaryed Agent Rate, (benificiaryAgentRate), (between 1% and benificiaryAccountRate).
// 10. If Agent not found, AgentRewardRate = 0, otherwise AgentRewardRate = agentRate read, default 1%.
// 11. Calculate the BenificiariasReward as, BenificiariasRewards = stakingRewards * (1 - (AgentRewardRate/BenificiariasRewardRate)).
// 12. Update the TotalQuanty
// 13. Update the Agents TotalQuanty 

    constructor(){
    }
}