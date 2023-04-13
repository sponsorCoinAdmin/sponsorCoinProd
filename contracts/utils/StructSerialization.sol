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

        // console.log("AAAAAAAAAAAAAAAAAAAAAAA patronAccountList.length = ", _accountRec.patronAccountList.length);
        // console.log("BBBBBBBBBBBBBBBBBBBBBBB sponsorAccountList.length = ", _accountRec.sponsorAccountList.length);
        // console.log("CCCCCCCCCCCCCCCCCCCCCCC agentAccountList.length = ", _accountRec.agentAccountList.length);
        // console.log("DDDDDDDDDDDDDDDDDDDDDDD parentSponsorAccountList.length = ", _accountRec.parentSponsorAccountList.length);
        string memory patronAccountList = toString(_accountRec.patronAccountList);
        string memory sponsorAccountList = toString(_accountRec.sponsorAccountList);
        string memory agentAccountList = toString(_accountRec.agentAccountList);
        string memory parentSponsorAccountList = toString(_accountRec.parentSponsorAccountList);

        seralized = concat(seralized, delimiter, "patronAccountList:",patronAccountList);
        seralized = concat(seralized, delimiter, "sponsorAccountList:",sponsorAccountList);
        seralized = concat(seralized, delimiter, "agentAccountList:", agentAccountList);
        seralized = concat(seralized, delimiter, "parentSponsorAccountList:", parentSponsorAccountList);

        // console.log("_accountRec.accountKey:", _accountRec.accountKey);
        // console.log( "toString(_accountRec.accountKey)", toString(_accountRec.accountKey));

        return seralized;
    }
}
