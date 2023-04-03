// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Utils.sol";

contract StructSerialization is Utils {

    constructor() {}

    function serializeAccount(AccountStruct storage _accountRec)
        internal
        view
        returns (string memory)
    {
        // ToDo Remove Next Line and Serialize the AccountRec
        string memory index = concat("index: ", toString(_accountRec.index));
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
        string memory agentAccountKeys = toString(_accountRec.agentAccountKeys);
        string memory patreonAccountKeys = toString(
            _accountRec.patreonAccountKeys
        );
        string memory delimiter = "\\,";
        string memory seralized = concat(
            index,
            delimiter,
            addr,
            delimiter,
            insertionTime
        );
//        seralized = concat(seralized, ",", verified);
        seralized = string(
            abi.encodePacked(
                index,
                "\\,\n",
                addr,
                "\\,\n",
                insertionTime,
                "\\,\n",
                verified
            )
        );
        seralized = concat(seralized, delimiter, balanceOf);

        seralized = concat(seralized, delimiter, stakedSPCoins);
        seralized = concat(seralized, delimiter, "agentAccountKeys:", agentAccountKeys);
        seralized = concat(
            seralized,
            delimiter,
            "patreonAccountKeys:",
            patreonAccountKeys
        );
        seralized = concat(seralized, delimiter, "agentAccountKeys:", agentAccountKeys);

        // console.log("_accountRec.accountKey:", _accountRec.accountKey);
        // console.log( "toString(_accountRec.accountKey)", toString(_accountRec.accountKey));

        return seralized;
    }
}
