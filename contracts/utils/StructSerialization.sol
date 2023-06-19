// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./Utils.sol";

contract StructSerialization is Utils {

    constructor() {}

    string constant delimiter = "\\,";


    function serializeAccount(AccountStruct storage _accountRec)
        internal view returns (string memory)
    {
        string memory addr = concat(
            "accountKey: ",
            toString(_accountRec.accountKey)
        );
        string memory creationTime = concat(
            "creationTime: ",
            toString(_accountRec.creationTime)
        );
        string memory totalStakingRewards = concat(
            "totalStakingRewards: ",
            toString(_accountRec.totalStakingRewards)
        );
        string memory balanceOf = concat(
            "balanceOf: ",
            toString(balanceOf[_accountRec.accountKey])
        );
        string memory decimals = concat(
            "decimals: ",
            toString(_accountRec.decimals)
        );
        string memory stakedSPCoins = concat(
            "stakedSPCoins: ",
            toString(_accountRec.stakedSPCoins)
        );
        string memory verified = concat(
            "verified: ",
            toString(_accountRec.verified)
        );

        string memory seralized = string(
            abi.encodePacked(
                addr,
                "\\,\n",
                creationTime,
                "\\,\n",
                verified
            )
        );
        seralized = concat(seralized, delimiter, balanceOf);
        seralized = concat(seralized, delimiter, decimals); 

        seralized = concat(seralized, delimiter, stakedSPCoins);

        string memory sponsorAccountList = toString(_accountRec.sponsorAccountList);
        string memory recipientAccountList = toString(_accountRec.recipientAccountList);
        string memory agentAccountList = toString(_accountRec.agentAccountList);
        string memory agentsParentRecipientAccountList = toString(_accountRec.agentsParentRecipientAccountList);

        seralized = concat(seralized, delimiter, "sponsorAccountList:",sponsorAccountList);
        seralized = concat(seralized, delimiter, "recipientAccountList:",recipientAccountList);
        seralized = concat(seralized, delimiter, "agentAccountList:", agentAccountList);
        seralized = concat(seralized, delimiter, "agentsParentRecipientAccountList:", agentsParentRecipientAccountList);
        seralized = concat(seralized, delimiter, totalStakingRewards);

        return seralized;
    }

    function serializeRewards(AccountStruct storage _accountRec)
        internal view returns (string memory)
    {
        mapping(string  => RewardTypeStruct) storage rewardsMap = _accountRec.rewardsMap;
        RewardTypeStruct storage sponsorRewards = rewardsMap[getAccountTypeString(SPONSOR)];
        RewardTypeStruct storage recipientRewards = rewardsMap[getAccountTypeString(RECIPIENT)];
        RewardTypeStruct storage agentRewards = rewardsMap[getAccountTypeString(AGENT)];


// console.log("==============================================================================================");
// console.log("SOL=>0 serializeAccount(", toString(_accountRec.accountKey),")"); 
// console.log("SOL=>0 toString(sponsorRewards.stakingRewards)", toString(sponsorRewards.stakingRewards)); 
// console.log("SOL=>1 toString(recipientRewards.stakingRewards)", toString(recipientRewards.stakingRewards)); 
// console.log("SOL=>2 toString(agentRewards.stakingRewards)", toString(agentRewards.stakingRewards)); 
        string memory seralized = toString(sponsorRewards.stakingRewards);
        seralized = concat(seralized, ",", toString(recipientRewards.stakingRewards));
        seralized = concat(seralized, ",", toString(agentRewards.stakingRewards));

        return seralized;
    }

/*
    function serializeRewards(AccountStruct storage _accountRec)
        internal view returns (string memory)
    {
        mapping(string  => RewardTypeStruct) storage rewardsMap = _accountRec.rewardsMap;
        RewardTypeStruct storage rewards = rewardsMap["RECIPIENT"];

        string memory totalStakingRewards = concat(
            "totalStakingRewards: ",
            toString(rewards.totalStakingRewards)
        );

       string memory stakingRewards = concat(
            "stakingRewards: ",
            toString(rewards.stakingRewards)
        );
       string memory stakingRewards = concat(
            "stakingRewards: ",
            toString(rewards.stakingRewards)
        );
       string memory stakingRewards = concat(
            "stakingRewards: ",
            toString(rewards.stakingRewards)
        );

        string memory seralized = concat("totalStakingRewards:",totalStakingRewards); 
        seralized = concat(seralized, delimiter, "stakingRewards:",stakingRewards);
        seralized = concat(seralized, delimiter, "stakingRewards:", stakingRewards);
        seralized = concat(seralized, delimiter, "stakingRewards:", stakingRewards);

        return seralized;
    }
*/
}
