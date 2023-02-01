// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
/// @title ERC20 Contract

import "./Sponsor.sol";

contract KYC{

    address key;
    bool authorized;

    struct kyc {
       string name;
       string email;
       string address1;
       string address2;
       string zipPostalCode;
       string homePhone;
       string mobilePhone;
    }
}