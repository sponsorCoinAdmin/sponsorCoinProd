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

    function getStakingRewards(uint _tokenLastUpdate, uint _interestRate, uint _quantity) public view returns(uint rewards) {
        uint accountTimeInSecondeSinceUpdate = getTimeMultiplier(_tokenLastUpdate);
        rewards = (_quantity * accountTimeInSecondeSinceUpdate * _interestRate) /100;
        return rewards;
    }

    function getTimeMultiplier(uint _tokenLastUpdate) public view returns(uint _timeMultiplier) {
        uint accountTimeInSecondeSinceUpdate = this.getAccountTimeInSecondeSinceUpdate(_tokenLastUpdate);
        _timeMultiplier = this.getAnnualizedPercentageForGivenTimeInterval(accountTimeInSecondeSinceUpdate);
        return _timeMultiplier;
    }

   function getAccountTimeInSecondeSinceUpdate(uint _tokenLastUpdate) public view returns(uint) {
        uint accountTimeInSecondeSinceUpdate = block.timestamp - _tokenLastUpdate;
        return accountTimeInSecondeSinceUpdate;
    }

    function getAnnualizedPercentageForGivenTimeInterval(uint _timeInSeconds) public pure returns(uint) {
        return year/_timeInSeconds;
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