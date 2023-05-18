// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";
import "./StringUtils.sol";


contract TimeUtils is StringUtils {
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


/*
    function testStakingRewards(uint _lastUpdateTime, uint _testUpdateTime, uint _interestRate, uint _quantity) public view returns(uint rewards) {
        console.log("SOL=> testStakingRewards:_lastUpdateTime =", toString(_lastUpdateTime));
        console.log("SOL=> testStakingRewards:_testUpdateTime =", toString(_testUpdateTime));
        console.log("SOL=> testStakingRewards:_interestRate   =", toString(_interestRate));
        console.log("SOL=> testStakingRewards:_quantity       =", toString(_quantity));
        // uint accountTimeInSecondeSinceUpdate = getTimeMultiplier(_lastUpdateTime);
        // rewards = (_quantity * accountTimeInSecondeSinceUpdate * _interestRate) /100;
        rewards =99;
        return rewards;
    }
*/
    // function getMillenniumTimeIntervalDivisor2(uint _timeInSeconds) public view  returns(uint) {
    //     console.log("SOL=> _timeInSeconds ", _timeInSeconds);  
    //     uint millenniumDivisor = millennium/_timeInSeconds;
    //     return millenniumDivisor;
    // }

//    function getStakingRewards(uint _lastUpdateTime, uint _interestRate, uint _quantity) public view returns(uint rewards) {
//         uint accountTimeInSecondeSinceUpdate = getTimeMultiplier(_lastUpdateTime);
//         rewards = (_quantity * accountTimeInSecondeSinceUpdate * _interestRate) /100;
//         return rewards;
//     }

//     function getTimeMultiplier(uint _lastUpdateTime) public view returns(uint _timeMultiplier) {
//         uint accountTimeInSecondeSinceUpdate = getAccountTimeInSecondeSinceUpdate(_lastUpdateTime);
//         _timeMultiplier = this.getMillenniumTimeIntervalDivisor(accountTimeInSecondeSinceUpdate);
//         return _timeMultiplier;
//     }

//     function getAccountTimeInSecondeSinceUpdate(uint _lastUpdateTime) public view returns(uint) {
//         uint accountTimeInSecondeSinceUpdate = getTimeDifference(block.timestamp, _lastUpdateTime);
//         return accountTimeInSecondeSinceUpdate;
//     }

//    function getTimeDifference(uint _passedTime, uint _lastUpdateTime ) public pure returns(uint) {
//         uint accountTimeInSecondeSinceUpdate = _passedTime - _lastUpdateTime;
//         return accountTimeInSecondeSinceUpdate;
//     }

    function getMillenniumTimeIntervalDivisor(uint _timeInSeconds) public view  returns(uint) {
        console.log("SOL=> _timeInSeconds ", _timeInSeconds);  
        uint millenniumDivisor = millennium/_timeInSeconds;
        return millenniumDivisor;
    }

    function getMillenniumTimeIntervalDivisor2(uint _timeInSeconds) public view  returns(uint) {
        console.log("SOL=> _timeInSeconds ", _timeInSeconds);  
        uint millenniumDivisor = millennium/_timeInSeconds;
        return millenniumDivisor;
    }
}
