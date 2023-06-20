// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";


contract TimeUtils {
    constructor() {
    }

    uint8 constant second = 1;
    uint8 constant minute = second * 60;
    uint8 constant hour = minute * 60;
    uint8 constant day = hour * 24;
    uint8 constant week = day * 7;
    uint16 constant year = day * (365 + hour * 8);
    uint16 constant month = year/12;

    function getStakingRewards(uint lastUpdateTime, uint interestRate, uint quantity)
    internal view returns(uint rewards) {
        uint accountTimeInSecondeSinceUpdate = getTimeMultiplier(lastUpdateTime);
        rewards = (quantity * accountTimeInSecondeSinceUpdate * interestRate) /100;
        return rewards;
    }

    function getTimeMultiplier(uint lastUpdateTime)
    internal view returns(uint timeMultiplier) {
        uint accountTimeInSecondeSinceUpdate = getAccountTimeInSecondeSinceUpdate(lastUpdateTime);
        timeMultiplier = getAnnualizedPercentageForGivenTimeInterval(accountTimeInSecondeSinceUpdate);
        return timeMultiplier;
    }

   function getAccountTimeInSecondeSinceUpdate(uint TokenLastUpdate)
   internal view returns(uint) {
        uint accountTimeInSecondeSinceUpdate = block.timestamp - TokenLastUpdate;
        return accountTimeInSecondeSinceUpdate;
    }

    function getAnnualizedPercentageForGivenTimeInterval(uint timeInSeconds)
    internal pure returns(uint) {
        return year/timeInSeconds;
    }
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