// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
/// @title ERC20 Contract
import "../utils/KYC.sol";

contract DataTypes is KYC {

   // Keep track of account insertions
   // Record relationship rules as Follows:
   // 1. Every Account is the root of a mapping tree in the diagram below:
   // 2. Every Account can be a Benefactor, And/or Sponsor, and/or Agent
   //    - A Benefactor is the primary bennifacary of the Sponsors steaking allocations
   //    - An Agent is the secondary bennifacary of the Sponsors steaking allocations
   // 3. Every Account can have a number of Sponsor(s)
   // 4. Every Sponsor can have a number of Agent(s)
   // 5. Every Sponsor has an array of rate structures
   // 6. Every Agent has an array of rate structures
   // 7. Every Rate Structure has an array of Transactions
   // 8. Each Benefactor/Sponsor/Agent must be mutually exclusive
   //    - This implies no two accounts can be the same for each account structure
   //
   //  The following is a brief diagram of the contractural structure.
   //                          |-/Agent(s)/Rate(s)/Transaction(s)
   // Account(s)/Sponsor(s)/ =>|
   //                          |-/Rate(s)/Transaction(s)

   address burnAddress = 0x0000000000000000000000000000000000000000;
   address[] public accountIndex;
   mapping(address => AccountStruct)  accountMap;

   struct AccountStruct {
      uint index;
      address accountKey;
      uint insertionTime;
      bool inserted;
      bool verified;
      KYC kyc;
      address[] sponsoredAccountKeys;     // If Patreon List of Sponsored Accounts 
      address[] agentKeys;                // If Sponsor? List of Agent Accounts
      address[] patreonAccountKeys; // If Sponsor? List of Patreon Accounts
      address[] agentParentAccountKeys;   // If Agent? List of Patreon Sponsor Accounts
      mapping(address => SponsorStruct)  sponsorMap;
   }

   // Each Account has a map of Sponsors and an array of rate structures
   struct SponsorStruct {
      uint index;
      address sponsorKey;
      uint insertionTime;
      bool inserted;
      bool verified;
      address[] agentKeys;
      mapping(address => AgentStruct) agentMap;
      RateStruct[] rates;
      mapping(uint256 => RateStruct) rateMap;
   }

   // Each Sponsor has a map of Agents and an array of rate structures
   struct AgentStruct {
      uint index;
      address account;
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
