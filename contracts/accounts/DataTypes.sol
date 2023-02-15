// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
/// @title ERC20 Contract
import "../utils/KYC.sol";

contract DataTypes is KYC {

   address burnAddress = 0x0000000000000000000000000000000000000000;
   uint public lastStakingUpdateTime = block.timestamp;

   struct accountRec {
      string[] sponsorKeys;

//      address[] agents;
      string[] agentKeys;

      address parentAccount;
      uint index;
      uint insertionTime;
      bool inserted;
      KYC kyc ;
      bool verified;
    }

    struct accountSponsorRecs {
      address account;
      address sponsor;
      string[] agentKeys;
      rateStruct[] rates;
     }
    
    struct accountSponsorAgentStruct {
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
   mapping(address => accountRec)  accountMap;
//   mapping(string => rateStruct[])  rateMap;

   mapping(string => accountSponsorRecs)  accountSponsorMap;
   mapping(string => accountSponsorAgentStruct)  accountSponsorAgentMap;

//    address[] public sponsorIndex;
//    address[] public agentIndex;
}
