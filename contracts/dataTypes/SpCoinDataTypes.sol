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

    // Recipiented Coins
    uint256 stakedSPCoins;

    // Keep track of account insertions
    // Record relationship rules as Follows:
    // 1. Every Account is the root of a mapping tree in the diagram below:
    // 2. Every Account can be a Sponsor, And/or Recipient, and/or Agent
    //    - A Sponsor is the, primary steak Holder of the "Recipient Coin" token.
    //        The primary purpose of holding "Recipient Coins" is to share "Proof of Stake"
    //        percentage earnings with the selected sopnsor(s).
    //    - A Recipient is considered to be a child of one or more Sponsors with the purposes
    //      of sharing "Proof of Stake" Sponsor rewards.
    //    - An Agent finds Sponsor(s) for any specific recipient and receives a share of the 
    //      "Proof of Stake" reward allocation for this effort. 
    // 3. Every Account can be a Patrion, Recipient and/or agent to one or more mutually 
    //    exclusive account(s).
    // 4. Every Recipient can have a number of Sponsor(s), Recipient(s) and/or Agent(s)
    // 5. Every Recipient has an array of recipientRate structures
    // 6. Every Agent has an array of agentRate structures
    // 7. Every Rate Structure has an array of Transactions
    // 8. Each Sponsor/Recipient/Agent "MUST BE" mutually exclusive
    //    - This implies no two accounts can be the same for each account structure
    //
    //  The following is a brief diagram of the contractural structure.
    //
    //              |                          |-/Agent(s)/Rate(s)/Transaction(s)
    // Account(s) =>| Sponsor(s)/Recipient(s)/ =>|
    //              |                          |-/Rate(s)/Transaction(s)

    // **Additional Recipient Coin Variables

    address burnAddress = 0x0000000000000000000000000000000000000000;
    address[] public masterAccountList;

    mapping(address => AccountStruct) accountMap;

    uint JUNK_COUNTER = 0;
 
    struct arrayMappedData {
        address[] masterAccountList;
        mapping(address => AccountStruct) accountMap;
    }

    struct AccountStruct {
        address accountKey;
        uint256 balanceOf;
        uint256 decimals;
        uint256 creationTime;
        uint256 stakedSPCoins; // Coins Owned but steaked to recipients
        bool inserted;
        bool verified;
        address[] recipientAccountList;       // If Sponsor List of Recipiented Account
        address[] sponsorAccountList;         // If Recipient? List of Sponsor Account
        address[] agentAccountList;           // If Recipient? List of Agent Account
        address[] agentsParentRecipientAccountList; // If Agent? List of Sponsor Recipient Account
        mapping(address => RecipientStruct) recipientMap;
        // STAKING REWARDS MAPPINGS
        // uint256 totalStakingRewards; // Coins not owned but Recipiented
        mapping(string  => RewardsStruct) rewardsMap;
//        KYC kyc;
    }

    // Each Account has a map of Recipient and an array of recipientRate structures
    struct RecipientStruct {
        address sponsorKey;
        address recipientKey;
        uint256 creationTime;
        uint256 stakedSPCoins; // Coins not owned but Recipiented
        uint256[] recipientRateList;
        mapping(uint256 => RecipientRateStruct) recipientRateMap;
        bool inserted;
        bool verified;
    }
 
    struct RecipientRateStruct {
        uint256 recipientRate;
        uint256 creationTime;
        uint256 lastUpdateTime;
        uint256 stakedSPCoins; // Coins not owned
        address[] agentAccountList;
        mapping(address => AgentStruct) agentMap;
        StakingTransactionStruct[] transactionList;
        bool inserted;
    }

    // Each Recipient has a map of Agent and an array of agentRate structures
    struct AgentStruct {
        address sponsorKey;
        address recipientKey;
        address agentKey;
        uint256 creationTime;
        uint256 stakedSPCoins; // Coins not owned but Recipiented
        uint256[] agentRateList;
        mapping(uint256 => AgentRateStruct) agentRateMap;
        bool inserted;
        bool verified;
    }
 
    struct AgentRateStruct {
        uint256 agentRate;
        uint256 creationTime;
        uint256 lastUpdateTime;
        uint256 stakedSPCoins; // Coins not owned but Recipiented
        StakingTransactionStruct[] transactionList;
        bool inserted;
    }

/////////////// END TWO PREVIOUSLY DELETED RECORDS
/////////////// PREVIOUS RECORDS

    struct StakingTransactionStruct {
        uint256 insertionTime;
        uint256 stakingRewards;
        address[] sourceList;
    }

    /// STAKING REWARDS SECTION ////////////////////////////////////////////////////////////////////

    struct RewardsStruct {
        uint256 totalSponsorRewards;
        uint256 totalRecipientRewards;
        uint256 totalAgentRewards;
        uint256 totalStakingRewards; 
        mapping(address => RewardAccountStruct) sponsorRewardsMap;
        mapping(address => RewardAccountStruct) recipienRewardstMap;
        mapping(address => RewardAccountStruct) agentRewardsMap;
    }

    struct RewardAccountStruct {
        uint256 stakingRewards;
        uint256[] rewardRateList;
        mapping(uint256 => RewardRateStruct) rewardRateMap;
    }

    struct RewardRateStruct {
        uint256 rate;
        uint256 stakingRewards;
        RewardsTransactionStruct[] rewardTransactionList;
    }

    struct RewardsTransactionStruct {
        uint256 rate;
        uint256 updateTime;
        uint256 stakingRewards;
    }

}