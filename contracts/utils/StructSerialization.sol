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
        // string memory totalStakingRewards = concat(
        //     "totalStakingRewards: ",
        //     toString(_accountRec.totalStakingRewards)
        // );
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
        // seralized = concat(seralized, delimiter, totalStakingRewards); 

        seralized = concat(seralized, delimiter, stakedSPCoins);

        string memory sponsorAccountList = toString(_accountRec.sponsorAccountList);
        string memory recipientAccountList = toString(_accountRec.recipientAccountList);
        string memory agentAccountList = toString(_accountRec.agentAccountList);
        string memory agentsParentRecipientAccountList = toString(_accountRec.agentsParentRecipientAccountList);

        seralized = concat(seralized, delimiter, "sponsorAccountList:",sponsorAccountList);
        seralized = concat(seralized, delimiter, "recipientAccountList:",recipientAccountList);
        seralized = concat(seralized, delimiter, "agentAccountList:", agentAccountList);
        seralized = concat(seralized, delimiter, "agentsParentRecipientAccountList:", agentsParentRecipientAccountList);

        return seralized;
    }

    function serializeRewards(AccountStruct storage _accountRec)
        internal view returns (string memory)
    {
        mapping(string  => RewardsStruct) storage rewardsMap = _accountRec.rewardsMap;
        RewardsStruct storage rewards = rewardsMap["ALL_REWARDS"];

console.log("==============================================================================================");
console.log("SOL=>0 serializeAccount(", toString(_accountRec.accountKey),")"); 
console.log("SOL=>0 toString(rewards.totalSponsorRewards)", toString(rewards.totalSponsorRewards)); 
console.log("SOL=>1 toString(rewards.totalRecipientRewards)", toString(rewards.totalRecipientRewards)); 
console.log("SOL=>2 toString(rewards.totalAgentRewards)", toString(rewards.totalAgentRewards)); 
console.log("SOL=>3 toString(rewards.totalStakingRewards)", toString(rewards.totalStakingRewards)); 
        string memory seralized = toString(rewards.totalSponsorRewards);
        seralized = concat(seralized, ",", toString(rewards.totalRecipientRewards));
        seralized = concat(seralized, ",", toString(rewards.totalAgentRewards));
        seralized = concat(seralized, ",", toString(rewards.totalStakingRewards));

        return seralized;
    }

    // function serializeRewards(AccountStruct storage _accountRec)
    //     internal view returns (string memory)
    // {
    //     mapping(string  => RewardsStruct) storage rewardsMap = _accountRec.rewardsMap;
    //     RewardsStruct storage rewards = rewardsMap["RECIPIENT"];

    //     string memory totalStakingRewards = concat(
    //         "totalStakingRewards: ",
    //         toString(rewards.totalStakingRewards)
    //     );

    //    string memory totalSponsorRewards = concat(
    //         "totalSponsorRewards: ",
    //         toString(rewards.totalSponsorRewards)
    //     );
    //    string memory totalRecipientRewards = concat(
    //         "totalRecipientRewards: ",
    //         toString(rewards.totalRecipientRewards)
    //     );
    //    string memory totalAgentRewards = concat(
    //         "totalAgentRewards: ",
    //         toString(rewards.totalAgentRewards)
    //     );

    //     string memory seralized = concat("totalStakingRewards:",totalStakingRewards); 
    //     seralized = concat(seralized, delimiter, "totalSponsorRewards:",totalSponsorRewards);
    //     seralized = concat(seralized, delimiter, "totalRecipientRewards:", totalRecipientRewards);
    //     seralized = concat(seralized, delimiter, "totalAgentRewards:", totalAgentRewards);

    //     return seralized;
    // }

}
