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
      address account;
      uint index;
      uint insertionTime;
      bool inserted;
      bool verified;
      KYC kyc;
      address[] sponsors;
      mapping(address => sponsorStruct)  sponsorMap;
   }

   struct sponsorStruct {
      uint index;
      address parent;
      address account;
      address sponsor;
      uint insertionTime;
      bool inserted;
      bool verified;
      address[] agentKeys;
      mapping(address => agentStruct) agentMap;
      rateStruct[] rates;
      mapping(uint256 => rateStruct) rateMap;
   }

   struct agentStruct {
      uint index;
      address parent;
      address account;
      address sponsor;
      address agent;
      uint insertionTime;
      bool inserted;
      bool verified;
      rateStruct[] rates;
      mapping(uint256 => rateStruct) rateMap;
   }

   struct rateStruct {
      uint insertionTime;
      uint lastUpdateTime;
      uint256 totalQuantity;
      uint[] rate;
      transactionStruct[] transactionChain;
   }

   struct transactionStruct {
      uint insertionTime;
      int256 quantity;
   }

}
