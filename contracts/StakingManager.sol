// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
/// @title ERC20 Contract

// This is an Architectural Layout Design Only
//
// 1. Connect to the SponsorCoin Contract
// 3. Get a list of SPCoin Wallet Accounts
// 4. Get the Interest for Staking Rewards Rate, (Default Initialized to 10%) called "StakingRewardsRate"  
// 5. For each account get the sponsored account, (sponsoredAccount).
// 7. If the sponsoredAccount does not exist, return with no staking rewards issued and process the next account
// 8. Calculate the anually prorated SPCoin staking rewards for each account as:
//      StakingRewards = (SPCoin Account Quanty) * ((Days since sponsored)/365) * StakingRewardsRate
// 9. Get the Sponsors Agent  
// 10. If Agent not found, AgentRewardRate = 0, otherwise AgentRewardRate = agent rate read, default 1%.
// 11. Calculate the SponsorsReward as, SponsorsRewards = StakingRewards * (1 - (AgentRewardRate/SponsorsRewardRate)).
// 12. Update the TotalQuanty
// 13. Update the Agents TotalQuanty 

import "./SPCoin.sol";
import "./Sponsor.sol";
import "./Agent.sol";

contract StakingManager is SPCoin, Sponsor, Agent{
        constructor(){
    }
}

