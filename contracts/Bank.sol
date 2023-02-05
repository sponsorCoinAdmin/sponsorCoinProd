// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "hardhat/console.sol";

contract Bank {
    receive() external payable {
        console.log('Sender Address', msg.sender);
        console.log('Sender Value', msg.value);
        console.log('---');
    }
}