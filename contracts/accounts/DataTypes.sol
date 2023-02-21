// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
/// @title ERC20 Contract
import "../utils/KYC.sol";

contract DataTypes is KYC {
   address burnAddress = 0x0000000000000000000000000000000000000000;
   uint public lastStakingUpdateTime = block.timestamp;

   // Keep track of account insertions
   address[] public accountIndex;
   mapping(address => AccountStruct)  accountMap;
   mapping(address => AgentStruct)  agentMap;

   struct AccountStruct {
      uint index;
      address account;
      uint insertionTime;
      bool inserted;
      bool verified;
      KYC kyc;
      address[] sponsorKeys;
      mapping(address => SponsorStruct)  sponsorMap;
   }

   struct SponsorStruct {
      uint index;
      address parentAccount;
      address sponsor;
      uint insertionTime;
      bool inserted;
      bool verified;
      address[] agentKeys;
      mapping(address => AgentStruct) agentMap;
      RateStruct[] rates;
      mapping(uint256 => RateStruct) rateMap;
   }

   struct AgentStruct {
      uint index;
      address account;
      address parentSponsor;
      address agent;
      uint insertionTime;
      bool inserted;
      bool verified;
      RateStruct[] rates;
      mapping(uint256 => RateStruct) rateMap;
   }

   struct RateStruct {
      uint insertionTime;
      uint lastUpdateTime;
      uint256 totalQuantity;
      uint[] rate;
      TransactionStruct[] transactionChain;
   }

   struct TransactionStruct {
      uint insertionTime;
      int256 quantity;
   }

}
