// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";
import "./StringUtils.sol";


contract TimeUtils is StringUtils{
    constructor() {
    }

    uint8 constant second = 1;
    uint16 constant minute = second * 60;
    uint32 constant hour = minute * 60;
    uint32 constant day = hour * 24;
    uint32 constant week = day * 7;
    uint32 constant year = day * (365 + hour * 8);
    uint32 constant month = year/12;


    // function getAnnualTimeMultiplier(uint currentTime, uint lastUpdateTime)
    // internal view returns(uint timeMultiplier) {
    //     uint256 timeDiff = currentTime - lastUpdateTime;
    //     timeMultiplier = (currentTime - lastUpdateTime)/year;
    //     console.log("currentTime =",toString(currentTime));
    //     console.log("lastUpdateTime =",toString(lastUpdateTime));
    //     console.log("timeDiff =",toString(timeDiff));
    //     console.log("year =",toString(year));
    //     console.log("timeMultiplier =",toString(timeMultiplier));
    //     return timeMultiplier;
    // //   return year;
    // }
}

/*
contract Countdown {

    function getTimeUnits() external view returns(uint, uint, uint, uint, uint, uint) {
        return(block.timestamp, 1 seconds, 1 minutes, 1 hours, 1 days, 1 weeks);
    }


    uint yesVote;
    uint noVote;

    uint public startTime;
    function start() external {
        startTime = block.timestamp;
    }

    function voteYes() external {
        require(block.timestamp < startTime + 60 seconds, "voting period passed, wait next year");
        yesVote++;
    }

    function voteNo() external {
        require(block.timestamp < startTime + 60 seconds, "voting period passed, wait next year");
        noVote++;
    }
}
*/