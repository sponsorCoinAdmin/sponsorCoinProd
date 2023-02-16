// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
/// @title ERC20 Contract
import "../utils/KYC.sol";

contract DataTypes is KYC {
   address burnAddress = 0x0000000000000000000000000000000000000000;
   uint public lastStakingUpdateTime = block.timestamp;

   struct accountStruct {
      address[] sponsors;
      mapping(address => sponsorStruct)  sponsorMap;

      uint index;
      uint insertionTime;
      bool inserted;
      KYC kyc ;
      bool verified;
    }

    struct sponsorStruct {
      address parent;
      address account;
      address sponsor;
      address[] agentKeys;
      mapping(address => agentStruct)  agentMap;
      rateStruct[] rates;
  }
    
    struct agentStruct {
      address parent;
      address account;
      address sponsor;
      address agent;
      rateStruct[] rates;
    }

    struct rateStruct {
       uint[] rate;
       uint insertionTime;
       uint lastUpdateTime;
       uint256 quantity;
    }

// Keep track of account insertions
   address[] public accountIndex;
   mapping(address => accountStruct)  accountMap;
   mapping(address => agentStruct)  agentMap;

}
