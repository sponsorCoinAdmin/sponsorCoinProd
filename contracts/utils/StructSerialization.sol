// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "../accounts/DataTypes.sol";

contract StructSerialization is DataTypes {

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
        string memory verified = concat(
            "verified: ",
            toString(_accountRec.verified)
        );
        string memory agentKeys = toString(_accountRec.agentKeys);
        string memory contributorAccountKeys = toString(
            _accountRec.contributorAccountKeys
        );
        string memory delimiter = "\\,";
        string memory seralized = concat(
            index,
            delimiter,
            addr,
            delimiter,
            insertionTime
        );
        seralized = concat(seralized, ",", verified);
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
        seralized = concat(seralized, delimiter, "agentKeys:", agentKeys);
        seralized = concat(
            seralized,
            delimiter,
            "contributorAccountKeys:",
            contributorAccountKeys
        );
        seralized = concat(seralized, delimiter, "agentKeys:", agentKeys);

        // console.log("_accountRec.accountKey:", _accountRec.accountKey);
        // console.log( "toString(_accountRec.accountKey)", toString(_accountRec.accountKey));

        return seralized;
    }
}
