// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";


contract TimeUtils {
    constructor() {
    }

    uint constant second = 1;
    uint constant minute = second * 60;
    uint constant hour = minute * 60;
    uint constant day = hour * 24;
    uint constant week = day * 7;
    uint constant year = day * (365 + hour * 8);
    uint constant month = year/12;
    uint constant millennium = year * 1000;


    function getStakingRewards(uint _tokenLastUpdate, uint _interestRate, uint _quantity) public view returns(uint rewards) {
        uint accountTimeInSecondeSinceUpdate = getTimeMultiplier(_tokenLastUpdate);
        rewards = (_quantity * accountTimeInSecondeSinceUpdate * _interestRate) /100;
        return rewards;
    }

    function getTimeMultiplier(uint _tokenLastUpdate) public view returns(uint _timeMultiplier) {
        uint accountTimeInSecondeSinceUpdate = getAccountTimeInSecondeSinceUpdate(_tokenLastUpdate);
        _timeMultiplier = this.getMillenniumTimeIntervalDivisor(accountTimeInSecondeSinceUpdate);
        return _timeMultiplier;
    }

    function getAccountTimeInSecondeSinceUpdate(uint _tokenLastUpdate) public view returns(uint) {
        uint accountTimeInSecondeSinceUpdate = getTimeDifference(block.timestamp, _tokenLastUpdate);
        return accountTimeInSecondeSinceUpdate;
    }

   function getTimeDifference(uint _passedTime, uint _tokenLastUpdate ) public pure returns(uint) {
        uint accountTimeInSecondeSinceUpdate = _passedTime - _tokenLastUpdate;
        return accountTimeInSecondeSinceUpdate;
    }

    function getMillenniumTimeIntervalDivisor(uint _timeInSeconds) public view  returns(uint) {
        console.log("SOL=> _timeInSeconds ", _timeInSeconds);  
        uint millenniumDivisor = millennium/_timeInSeconds;
        return millenniumDivisor;
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