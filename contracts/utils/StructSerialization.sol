// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./Utils.sol";

contract StructSerialization is Utils {

    constructor() {}

    function serializeAccount(AccountStruct storage _accountRec)
        internal
        view
        returns (string memory)
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
            toString(_accountRec.balanceOf)
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

        seralized = concat(seralized, delimiter, stakedSPCoins);

        // console.log("AAAAAAAAAAAAAAAAAAAAAAA patronAccountKeys.length = ", _accountRec.patronAccountKeys.length);
        // console.log("BBBBBBBBBBBBBBBBBBBBBBB sponsorAccountKeys.length = ", _accountRec.sponsorAccountKeys.length);
        // console.log("CCCCCCCCCCCCCCCCCCCCCCC agentAccountKeys.length = ", _accountRec.agentAccountKeys.length);
        // console.log("DDDDDDDDDDDDDDDDDDDDDDD agentParentKeys.length = ", _accountRec.agentParentKeys.length);
        // console.log("EEEEEEEEEEEEEEEEEEEEEEE parentSponsorAccountKeys.length = ", _accountRec.parentSponsorAccountKeys.length);
        string memory patronAccountKeys = toString(_accountRec.patronAccountKeys);
        string memory sponsorAccountKeys = toString(_accountRec.sponsorAccountKeys);
        string memory agentAccountKeys = toString(_accountRec.agentAccountKeys);
        // string memory agentParentKeys = toString(_accountRec.agentParentKeys);
        string memory parentSponsorAccountKeys = toString(_accountRec.parentSponsorAccountKeys);

        seralized = concat(seralized, delimiter, "patronAccountKeys:",patronAccountKeys);
        seralized = concat(seralized, delimiter, "sponsorAccountKeys:",sponsorAccountKeys);
        seralized = concat(seralized, delimiter, "agentAccountKeys:", agentAccountKeys);
        // seralized = concat(seralized, delimiter, "agentParentKeys:", agentParentKeys);
        seralized = concat(seralized, delimiter, "parentSponsorAccountKeys:", parentSponsorAccountKeys);

        // console.log("_accountRec.accountKey:", _accountRec.accountKey);
        // console.log( "toString(_accountRec.accountKey)", toString(_accountRec.accountKey));

        return seralized;
    }
}
