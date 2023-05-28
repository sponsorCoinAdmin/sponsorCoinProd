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
        seralized = concat(seralized, delimiter, totalStakingRewards); 

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
        string memory totalStakingRewards = concat(
            "totalStakingRewards: ",
            toString(_accountRec.totalStakingRewards)
        );

    //    ToDo Restore this later
    //    string memory totalSponsorRewards = concat(
    //         "totalSponsorRewards: ",
    //         toString(_accountRec.totalSponsorRewards)
    //     );
    //    string memory totalRecipientRewards = concat(
    //         "totalRecipientRewards: ",
    //         toString(_accountRec.totalRecipientRewards)
    //     );
    //    string memory totalAgentRewards = concat(
    //         "totalAgentRewards: ",
    //         toString(_accountRec.totalAgentRewards)
    //     );

        string memory seralized = totalStakingRewards; 

        return seralized;
    }

}
