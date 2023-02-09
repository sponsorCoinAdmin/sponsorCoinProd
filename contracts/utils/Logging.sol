// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "hardhat/console.sol";
import "./StringUtils.sol";

contract Logging is StringUtils{
    bool private logStatus = true;
    string prefix;
    uint256 logLevel = 0;
 
    constructor()  {
        setLogStatus(true);
    }

   function setLogStatus(bool _logStatus )  public {
        logStatus = _logStatus;
        string memory boolToString = boolTostring(_logStatus);
 //       string memory concat = string.concat("Setting Logging ", "boolToString");
 //       scLog(string.concat("Setting Logging ", boolTostring(_logStatus)));
    }

   function scLog(bool _logStr ) view public{
        console.log(_logStr);
    }

    function boolTostring(bool val)  internal pure returns(string memory) {
        if (val) {
            return "true";
        }
        else {
            return "false";
        }
    }

/*
   function scLog(string _logStr ) view public {
        console.log(_logStr);
    }

   function scClearPrefix(string _logStr ) view public {
        console.log("BLA");
    }
*/
 }
