// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
/// @title ERC20 Contract

// ###  ALGORITHMIC ARCHITECTURAL DESIGN FOR STAKING REWARDS ALLOCATION ###
// allocateStakingRewards()
//    1. Get the Sponsors Staking Rewards Interest Rate, (annualSponsorRewardsRate), (Default Initialized to 10%).
//    2. Get the last update date, (lastUpdateDate), should be yesterday.
//    3. Set rewardsMultiplier = calcStakingRewardsMultiplier(lastUpdateDate, annualSponsorRewardsRate)
//    4. Get a list of the sponsors accounts (sponsorAccountList)
//    5. For each sponsorAccount in sponsorAccountLists calculate the Staking Rewards as:
//       stakingRewards = calcSponsorStakingRewards(sponsorAccount, rewardsMultiplier)

// ### CALCULATE PRORATED STAKING REWARDS SINCE LAST UPDATE ###
// calculateAccountSteakingReward(account)
//    1. Get the lastUpdateDate from the account
//    2. Get the rewardsRate from the account
//    3. Set rewardsMultiplier = calcStakingRewardsMultiplier(lastUpdateDate, rewardsRate)
//    4. Get the balance from the account = balancOf(account)
//    5. Set stakingRewards = balancOf * rewardsMultiplier
//    6. return stakingRewards

// ### CALCULATE PRORATED STAKING REWARDS MULTIPLIER SINCE LAST UPDATE ###
// calcStakingRewardsMultiplier(lastUpdateDate, annualRewardsRate)
//    1. Set seconds in yearSeconds = 31,557,600, (@365.25 Days in Actual Year)
//    1. Get the current date in seconds(currentDate = block.timestamp).
//    4. Calculate the elapsed seconds as:
//          secondsElapsed = currentDate - lastUpdateDate
//    5. if days  == 0 return 0
//    6. Prorate Seconds over a year as.
//          elapsedProrated = secondsElapsed/yearSeconds
//    6. rewardsMultiplier = elapsedProrated * annualRewardsRate
//    7. return rewardsMultiplier

// ### CALCULATE STAKING REWARDS FOR ALL SPONSORS ###
// calcAllSponsorsStakingRewards(sponsorAccountList)
//    1. Set totalSponsorRewards = 0
//    2. For each sponsorAccount in sponsorAccountList calculate the Staking Rewards as:
//    2.1   Set  totalSponsorRewards += calcSponsorStakingRewards(sponsorAccount)
//    3. return totalSponsorRewards

//*****************************************************************************************************

// ### CALCULATE INDIVIDUAL SPONSOR STAKING REWARDS FOR ACCOUNT ###
// calcSponsorStakingRewards(sponsorAccount)
//    1. Set sponsorRewards = calculateAccountSteakingReward(sponsorAccount)
//    2. Get a list of the agents accounts (agentAccountList)
//    3. Set agentRewards = calcAllAgentsStakingRewards(agentAccountList)
//    3. Set sponsorRewards -= agentRewards
//    4. addAccountsToUpdateStakingRewards(sponsorAccount, sponsorRewards)
//    5. return sponsorRewards

// ### CALCULATE STAKING REWARDS FOR ALL AGENTS ###
// calcAllAgentsStakingRewards(agentAccountList)
//    1. Set totalAgentsRewards = 0
//    3. For each agentAccount in agentAccountList calculate the Staking Rewards as:
//    4. totalAgentsRewards += calculateAccountSteakingReward(agentAccount)
//    5. addAccountsToUpdateStakingRewards(sponsorAccount, sponsorRewards)
//    6. return totalAgentsRewards

//*****************************************************************************************************



// ### CALCULATE INDIVIDUAL SPONSOR STAKING REWARDS FOR ACCOUNT ###
// calcSponsorStakingRewards(sponsorAccount, rewardsMultiplier)
//    1. Get a list of the agents accounts (agentAccountList)
//    2. Get the current currBalance with balanceOf() ERC20 function;
//    3. Get the lastUpdate for the sponsors Account
//    4. Calculate the Sponsors Reward as 
//          

//    3. For each agentAccount in agentAccountList calculate the Staking Rewards as:
//       accountStakingReward = calcAgentStakingRewards(agentAccount)

//    3. Add new elementto Array accountsToBeUpdated(account, "Sponsor", StakingRewards, currBalance, newBalance)
//    4. Calculate newBalance as currBalance + stakingRewards 
//    3. return accountStakingReward;








// calcAgentsStakingRewards(sponsorsRewards, agentList)
//    1. Initialize local totalAgentsReward to zero (0).
// ### FOR EACH AGENT PROCESS AS FOLLOWS ###
//    2. Get the agents account, (agentsAccount).
//    3. Get the agents Staking Rewards Interest Rate, (agentsRewardsRate), (between 2% and and 20% of sponsorsRewards).
//    4. Get the Agents SPCoin Quantity (agentSCoinQty)
//    5. Calculate the agents SPCoin staking rewards as:
//             agentsReward = (SPCoin Sponsor Quanty) * elapsedProratedDays * sponsorsRewardsRate
//    6. Increment totalAgentsReward = totalAgentsReward + agentsReward
//    7. return totalAgentsReward



// 8. For the sponsoredAccount, get the Sponsors Account Rate, (sponsorAccountRate), (between 2% and sponsorsRewardsRate).
// 9. Calculate the Sponsored Reward, (sponsorRewards as stakingRewards * stakingRewardsRate;

// 10. Get the Sponsors Agent (sponsorsAgent)
//     10.1 If no agent found set agentRewards at 0.
// 11. For the sponsoredAccount, get the Sponsored Agent Rate, (sponsorAgentRate), (between 1% and sponsorAccountRate).
// 10. If Agent not found, AgentRewardRate = 0, otherwise AgentRewardRate = agent rate read, default 1%.
// 11. Calculate the SponsorsReward as, SponsorsRewards = stakingRewards * (1 - (AgentRewardRate/SponsorsRewardRate)).
// 12. Update the TotalQuanty
// 13. Update the Agents TotalQuanty 

contract StakingManager{
        constructor(){
    }
}

