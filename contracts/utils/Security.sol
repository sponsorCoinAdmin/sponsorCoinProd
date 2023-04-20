// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "../dataTypes/SpCoinDataTypes.sol";

import "hardhat/console.sol";

contract Security is SpCoinDataTypes {
    address private  rootAdmin;
 
    constructor()  {
        rootAdmin = msg.sender;
    }

    modifier onlyRootAdmin () {
        require (msg.sender == rootAdmin, "Root Admin Security Access Violation");
        _;
    }

    modifier onlyOwner (address _account) {
        require (msg.sender == _account, "Owner Security Access Violation");
        _;
    }


    modifier onlyOwnerOrRootAdmin (address _account) {
        require (msg.sender == rootAdmin || msg.sender == _account, "Owner or Root Admin Security Access Violation");
        _;
    }

    modifier nonRedundantRecipient (address _recipientKey) {
        require (msg.sender != _recipientKey , "_accountKey and _recipientKey must be Mutually Exclusive)");
        _;
    }

    modifier nonRedundantAgent (address _recipientKey, address _agentKey) {
        require (msg.sender != _recipientKey && 
                 _recipientKey != _agentKey && 
                 msg.sender != _agentKey , "_accountKey, _recipientKey and _agentKey must be Mutually Exclusive)");
        _;
    }
}
