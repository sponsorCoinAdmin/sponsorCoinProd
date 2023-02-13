// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
/// @title ERC20 Contract
import "../utils/KYC.sol";

contract DataTypes is KYC {

   address burnAddress = 0x0000000000000000000000000000000000000000;
   uint public lastStakingUpdateTime = block.timestamp;

   struct accountRec {
       address[] sponsors;
       string[] sponsorKeys;

       address[] agents;

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
    }

struct sponsorAccountAgentRecs {
      address account;
      address sponsor;
      address agent;
    }

    struct rateRec {
       uint[] rate;
       uint insertionTime;
       uint lastUpdateTime;
       uint256 quantity;
    }

// Keep track of account insertions
   address[] public accountIndex;
   mapping(address => accountRec)  accountMap;
//   mapping(string => rateRec[])  rateMap;

   mapping(string => accountSponsorRecs)  sponsorAccountMap;

//    address[] public sponsorIndex;
//    address[] public agentIndex;
}
