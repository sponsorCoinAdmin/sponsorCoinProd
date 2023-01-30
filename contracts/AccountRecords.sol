// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
/// @title ERC20 Contract

contract AccountRecords {

    address key;
    bool authorized;

    struct accountRec {
       address addr;
       sponsorRec[] sponsor;
       kyc kyc;
    }

    struct sponsorRec {
       address addr;
       uint rate;
       bool verified;
       agentRec[] agent;
    }

    struct agentRec {
       address addr;
       uint rate;
       bool verified;
    }

    struct kyc {
       string name;
       string email;
       string address1;
       string address2;
       string zipPostalCode;
       string homePhone;
       string mobilePhone;
    }

     // Keep track balances and allowances approved
    mapping(address => accountRec)  detailMap;

    constructor(){
    }

    /// @notice gets Account Details
    /// @param _key receiver of token
    /// @return account Record 
    function getaccountRec( address _key) external view returns (accountRec memory) {
        accountRec memory map = detailMap[_key];
        return(map);
    }
}