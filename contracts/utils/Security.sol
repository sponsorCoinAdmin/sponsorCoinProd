// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
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

    modifier nonRedundantSponsor (address _accountKey, address _sponsorAccountKey) {
        require (_accountKey != _sponsorAccountKey , "_accountKey and _sponsorAccountKey must be Mutually Exclusive)");
        _;
    }

    modifier nonRedundantAgent (address _accountKey, address _sponsorAccountKey, address _agentKey) {
        require (_accountKey != _sponsorAccountKey && 
                 _sponsorAccountKey != _agentKey && 
                 _accountKey != _agentKey , "_accountKey, _sponsorAccountKey and _agentKey must be Mutually Exclusive)");
        _;
    }

    // address _accountKey, address _sponsorAccountKey, address _agentKey
}
