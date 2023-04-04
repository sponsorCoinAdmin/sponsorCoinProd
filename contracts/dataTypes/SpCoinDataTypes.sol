// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
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

    // Sponsored Coins
    uint256 stakedSPCoins;

    // Keep track of account insertions
    // Record relationship rules as Follows:
    // 1. Every Account is the root of a mapping tree in the diagram below:
    // 2. Every Account can be a Patreon, And/or Sponsor, and/or Agent
    //    - A Patreon is the, primary steak Holder of the "Sponsor Coin" token.
    //        The primary purpose of holding "Sponsor Coins" is to share "Proof of Stake"
    //        percentage earnings with the selected sopnsor(s).
    //    - A Sponsor is considered to be a child of one or more Patreons with the purposes
    //      of sharing "Proof of Stake" Patreon rewards.
    //    - An Agent finds Patreon(s) for any specific sponsor and receives a share of the 
    //      "Proof of Stake" reward allocation for this effort. 
    // 3. Every Account can be a Patrion, Sponsor and/or agent to one or more mutually 
    //    exclusive account(s).
    // 4. Every Sponsor can have a number of Patreon(s), Sponsor(s) and/or Agent(s)
    // 5. Every Sponsor has an array of sponsorRate structures
    // 6. Every Agent has an array of agentRate structures
    // 7. Every Rate Structure has an array of Transactions
    // 8. Each Patreon/Sponsor/Agent "MUST BE" mutually exclusive
    //    - This implies no two accounts can be the same for each account structure
    //
    //  The following is a brief diagram of the contractural structure.
    //
    //              |                          |-/Agent(s)/Rate(s)/Transaction(s)
    // Account(s) =>| Patreon(s)/Sponsor(s)/ =>|
    //              |                          |-/Rate(s)/Transaction(s)

    // **Additional Sponsor Coin Variables

    address burnAddress = 0x0000000000000000000000000000000000000000;
    address[] public accountKeys;

    mapping(address => AccountStruct) accountMap;

    struct arrayMappedData {
        address[] accountKeys;
        mapping(address => AccountStruct) accountMap;
    }
 
    struct AccountStruct {
        address accountKey;
        uint256 balanceOf;
        uint256 stakedSPCoins; // Coins Owned but steaked to sponsors
        uint256 insertionTime;
        bool inserted;
        bool verified;
        address[] patreonAccountKeys;       // If Sponsor? List of Patreon Accounts
        address[] agentRecKeys;             // If Patreon List of Sponsored Accounts
        address[] agentAccountKeys;         // If Sponsor? List of Agent Accounts
        address[] parentSponsorAccountKeys; // If Agent? List of Patreon Sponsor Accounts
        mapping(address => SponsorStruct) sponsorMap; 
//        KYC kyc;
    }

    // Each Account has a map of Sponsors and an array of sponsorRate structures
    struct SponsorStruct {
        AccountStruct parent;
        address sponsorAccountKey;
        uint256 totalAgentsSponsored; // Coins not owned but Sponsored
        uint256 insertionTime;
        bool inserted;
        bool verified;
        address[] agentAccountKeys;
        mapping(address => AgentStruct) agentMap;
        uint256[] sponsorRateKeys;
        mapping(uint256 => SponsorRateStruct) sponsorRateMap;
    }

    struct SponsorRateStruct {
        AgentStruct parent;
        uint256 sponsorRate;
        uint256 insertionTime;
        uint256 lastUpdateTime;
        uint256 totalTransactionsSponsored; // Coins not owned but Sponsored
        bool inserted;
        address[] agentAccountKeys;
        mapping(address => AgentStruct) agentMap;
        TransactionStruct[] transactionList;
    }

    // Each Sponsor has a map of Agents and an array of agentRate structures
    struct AgentStruct {
        SponsorStruct parent;
        address agentAccountKey;
        uint256 totalRatesSponsored; // Coins not owned but Sponsored
        uint256 insertionTime;
        bool inserted;
        bool verified;
        uint256[] agentRateKeys;
        mapping(uint256 => AgentRateStruct) agentRateMap;
    }

    struct AgentRateStruct {
        AgentStruct parent;
        uint256 agentRate;
        uint256 insertionTime;
        uint256 lastUpdateTime;
        uint256 totalTransactionsSponsored; // Coins not owned but Sponsored
        bool inserted;
        TransactionStruct[] transactionList;
    }

    struct TransactionStruct {
        // AgentRateStruct parent;
        uint256 insertionTime;
        uint256 quantity;
    }
}
