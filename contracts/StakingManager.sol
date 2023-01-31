// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
/// @title ERC20 Contract

// This is an Architectural Layout Design Only
//  call calcStakingRewards()

// calcStakingRewards()
// ### CALCULATE STAKING REWARDS FOR ALL ACCOUNTS ###
// 1. Get a list of the SPCoin Wallet accounts (accounts)
// 2. call calcAccountStakingRewards(accounts)*

// *calcAccountStakingRewards(accounts)
// ### FOR EACH ACCOUNT PROCESS AS FOLLOWS ###
// 2.1. Get a list of the SPCoin Wallet accounts (accounts)
// 2.2. call calcAccountStakingRewards(accounts)**

// **calcSponsorsStakingRewards(sponsorList)
// ### FOR EACH SPONSOR PROCESS AS FOLLOWS ###
// 2.1.1. Get the sponsors account, (sponsorsAccount).
// 2.1.2. Get the Sponsors Staking Rewards Interest Rate, (sponsorsRewardsRate), (Default Initialized to 10%).
// 2.1.3. Get the Sponsors SPCoin Quantity (sponsorSCoinQty)
// 2.1.4. Calculate the anually prorated Sponsors SPCoin staking rewards as:
//           sponsorsRewards = (sponsorSCoinQty) * ((Days since sponsored)/365) * sponsorsRewardsRate
// 2.1.5. Get a list of the Sponsors Agent (sponsorsAgent)
// 2.1.6. totalAgentsReward = calcAgentsStakingRewards(sponsorsRewards, agentList)
// 2.1.7. decrement agents fee from sponsors Rewards as follows
//           sponsorsRewards -= totalAgentsReward
// 2.1.8. set the new sponsors account balance to sPCoinQuanty + sponsorsRewards

// calcAgentsStakingRewards(sponsorsRewards, agentList)
// 2.1.6.1. Initialize local totalAgentsReward to zero (0).
// ### FOR EACH AGENT PROCESS AS FOLLOWS ###
// 2.1.6.2. Get the agents account, (agentsAccount).
// 2.1.6.3. Get the agents Staking Rewards Interest Rate, (agentsRewardsRate), (between 2% and and 20% of sponsorsRewards).
// 2.1.3. Get the Agents SPCoin Quantity (agentSCoinQty)
// 2.1.6.4. Calculate the agents SPCoin staking rewards as:
//             agentsReward = (SPCoin Sponsor Quanty) * ((Days since sponsored)/365) * sponsorsRewardsRate
// 2.1.6.5. Increment totalAgentsReward = totalAgentsReward + agentsReward
// 2.1.6.6. return totalAgentsReward



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

