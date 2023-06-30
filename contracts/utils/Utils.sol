// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "hardhat/console.sol";
import "./Security.sol";
//import "./StringUtils.sol";
import "./TimeUtils.sol";
import "./StringUtils.sol";

contract Utils is Security, TimeUtils {
    constructor() {
    }
  
    function msgSender() external view returns(address){
        return (msg.sender);
     }

    function calculateStakingRewards( uint256 _stakedSPCoins, uint256 _lastUpdateTime, uint256 _transactionTimeStamp, uint256 rate )
    public view returns (uint rewards) {

        console.log("CCCCCCCCCCCCCCCCC calculateStakingRewards _transAmount                  = ", _stakedSPCoins);
        console.log("CCCCCCCCCCCCCCCCC calculateStakingRewards _lastUpdateTimelastUpdateTime = ", _lastUpdateTime);
        console.log("CCCCCCCCCCCCCCCCC calculateStakingRewards _transactionTimeStamp         = ", _transactionTimeStamp);
        console.log("CCCCCCCCCCCCCCCCC calculateStakingRewards rate                          = ", rate);

        uint256 timeDiff = _lastUpdateTime < _transactionTimeStamp ? 0 : _transactionTimeStamp - _lastUpdateTime;
        uint256 timeRateMultiplier = ( timeDiff * _stakedSPCoins * rate ) / 100;
        rewards = timeRateMultiplier/year;
        console.log("CCCCCCCCCCCCCCCCC calculateStakingRewards timeDiff                       = ", timeDiff);
        console.log("CCCCCCCCCCCCCCCCC calculateStakingRewards timeRateMultiplier             = ", timeRateMultiplier);
        console.log("CCCCCCCCCCCCCCCCC calculateStakingRewards Recipient Calculated Rewards   = ", rewards);
        return rewards;
    }
}
