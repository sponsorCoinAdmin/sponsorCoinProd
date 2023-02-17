// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
/// @title ERC20 Contract
import "../utils/KYC.sol";

contract DataTypes is KYC {
   address burnAddress = 0x0000000000000000000000000000000000000000;
   uint public lastStakingUpdateTime = block.timestamp;

   // Keep track of account insertions
   address[] public accountIndex;
   mapping(address => accountStruct)  accountMap;
   mapping(address => agentStruct)  agentMap;

   struct accountStruct {
      address[] sponsors;
      mapping(address => sponsorStruct)  sponsorMap;

      uint index;
      uint insertionTime;
      bool inserted;
      bool verified;
      KYC kyc ;
   }

   struct sponsorStruct {
      address parent;
      address account;
      address sponsor;
      address[] agentKeys;
      bool inserted;
      mapping(address => agentStruct) agentMap;
      rateStruct[] rates;
      mapping(uint256 => rateStruct) rateMap;
   }

   struct agentStruct {
      address parent;
      address account;
      address sponsor;
      address agent;
      bool inserted;
      rateStruct[] rates;
      mapping(uint256 => rateStruct) rateMap;
   }

   struct rateStruct {
      uint[] rate;
      uint insertionTime;
      uint lastUpdateTime;
      uint256 totalQuantity;
      transactionStruct[] transactionChain;
   }

   struct transactionStruct {
      uint insertionTime;
      int256 quantity;
   }

}
