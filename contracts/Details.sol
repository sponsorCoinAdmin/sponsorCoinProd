// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
/// @title ERC20 Contract

contract Details {

    address key;
    struct detailRec {
       string name;
       string email;
       string address1;
       string address2;
       string zipPostalCode;
       string homePhone;
       string mobilePhone;
    }

     // Keep track balances and allowances approved
    mapping(address => detailRec)  detailMap;

    constructor(){
    }

    /// @notice gets Account Details
    /// @param _key receiver of token
    /// @return account Record 
    function getDetailRec( address _key) external view returns (detailRec memory) {
        detailRec memory map = detailMap[_key];
        return(map);
    }
}