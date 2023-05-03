// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./Utils.sol";

contract StructSerialization is Utils {

    constructor() {}

    function serializeAccount(AccountStruct storage _accountRec)
        internal view returns (string memory)
    {
        // ToDo Remove Next Line and Serialize the AccountRec
        string memory addr = concat(
            "accountKey: ",
            toString(_accountRec.accountKey)
        );
        string memory insertionTime = concat(
            "insertionTime: ",
            toString(_accountRec.insertionTime)
        );
        string memory balanceOf = concat(
            "balanceOf: ",
            toString(balanceOf[_accountRec.accountKey])
        );
        console.log("SERIALIZED balanceOf = ", balanceOf);
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
        string memory delimiter = "\\,";

        string memory seralized = string(
            abi.encodePacked(
                addr,
                "\\,\n",
                insertionTime,
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

        // console.log("_accountRec.accountKey:", _accountRec.accountKey);
        // console.log( "toString(_accountRec.accountKey)", toString(_accountRec.accountKey));
        // console.log("balanceOf[_accountRec.accountKey]", balanceOf);

        return seralized;
    }
}
