// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
// import "./KYC.sol";

contract SpCoinDataTypes {

    // **Standard ERC20 contract Variables
    string public name;
    string public symbol;
    uint256 public decimals;
    uint256 public totalSupply;

    // Keep track balances and allowances approved
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    // Events - fire events on state changes etc
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    // Benificiaryed Coins
    uint256 stakedSPCoins;

    // Keep track of account insertions
    // Record relationship rules as Follows:
    // 1. Every Account is the root of a mapping tree in the diagram below:
    // 2. Every Account can be a Patron, And/or Benificiary, and/or Agent
    //    - A Patron is the, primary steak Holder of the "Benificiary Coin" token.
    //        The primary purpose of holding "Benificiary Coins" is to share "Proof of Stake"
    //        percentage earnings with the selected sopnsor(s).
    //    - A Benificiary is considered to be a child of one or more Patrons with the purposes
    //      of sharing "Proof of Stake" Patron rewards.
    //    - An Agent finds Patron(s) for any specific benificiary and receives a share of the 
    //      "Proof of Stake" reward allocation for this effort. 
    // 3. Every Account can be a Patrion, Benificiary and/or agent to one or more mutually 
    //    exclusive account(s).
    // 4. Every Benificiary can have a number of Patron(s), Benificiary(s) and/or Agent(s)
    // 5. Every Benificiary has an array of benificiaryRate structures
    // 6. Every Agent has an array of agentRate structures
    // 7. Every Rate Structure has an array of Transactions
    // 8. Each Patron/Benificiary/Agent "MUST BE" mutually exclusive
    //    - This implies no two accounts can be the same for each account structure
    //
    //  The following is a brief diagram of the contractural structure.
    //
    //              |                          |-/Agent(s)/Rate(s)/Transaction(s)
    // Account(s) =>| Patron(s)/Benificiary(s)/ =>|
    //              |                          |-/Rate(s)/Transaction(s)

    // **Additional Benificiary Coin Variables

    address burnAddress = 0x0000000000000000000000000000000000000000;
    address[] public AccountList;

    mapping(address => AccountStruct) accountMap;

    struct arrayMappedData {
        address[] AccountList;
        mapping(address => AccountStruct) accountMap;
    }
 
    struct AccountStruct {
        address accountKey;
        uint256 balanceOf;
        uint256 stakedSPCoins; // Coins Owned but steaked to benificiarias
        uint256 insertionTime;
        bool inserted;
        bool verified;
        address[] patronAccountList;        // If Benificiary? List of Patron Accounts
        address[] benificiaryAccountList;      // If Patron List of Benificiaryed Accounts
        address[] agentAccountList;         // If Benificiary? List of Agent Accounts
        address[] parentBenificiaryAccountList; // If Agent? List of Patron Benificiary Accounts
        mapping(address => BenificiaryStruct) benificiaryMap; 
//        KYC kyc;
    }

    // Each Account has a map of Benificiarias and an array of benificiaryRate structures
    struct BenificiaryStruct {
        address benificiaryKey;
        address patronKey;
        uint256 stakedSPCoins; // Coins not owned but Benificiaryed
        uint256 insertionTime;
        uint256[] benificiaryRateList;
        mapping(uint256 => BenificiaryRateStruct) benificiaryRateMap;
        bool inserted;
        bool verified;
    }
 
    struct BenificiaryRateStruct {
        uint256 benificiaryRate;
        uint256 insertionTime;
        uint256 lastUpdateTime;
        address[] agentAccountList;
        uint256 stakedSPCoins; // Coins not owned but Benificiaryed
        mapping(address => AgentStruct) agentMap;
        TransactionStruct[] transactionList;
        bool inserted;
    }

    // Each Benificiary has a map of Agents and an array of agentRate structures
    struct AgentStruct {
        address agentKey;
        uint256 stakedSPCoins; // Coins not owned but Benificiaryed
        uint256 insertionTime;
        uint256[] agentRateKeys;
        mapping(uint256 => AgentRateStruct) agentRateMap;
        bool inserted;
        bool verified;
    }
 
    struct AgentRateStruct {
        uint256 agentRate;
        uint256 insertionTime;
        uint256 lastUpdateTime;
        uint256 stakedSPCoins; // Coins not owned but Benificiaryed
        TransactionStruct[] transactionList;
        bool inserted;
    }

    struct TransactionStruct {
        uint256 insertionTime;
        uint256 quantity;
    }
}
