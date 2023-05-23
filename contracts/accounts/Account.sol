// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "../utils/StructSerialization.sol";

contract Account is StructSerialization {
    constructor() {}

    /// @notice insert block chain network address for spCoin Management
    /// @param _accountKey public accountKey to set new balance
    function addAccountRecord(string memory accountType, address _accountKey)
        internal {
        if (!isAccountInserted(_accountKey)) {
            // console.log("addAccountRecord(", accountType, _accountKey, ")");
// console.log(JUNK_COUNTER++, "addAccountRecord(", accountType, _accountKey, ")"); 
            AccountStruct storage accountRec = accountMap[_accountKey];
            accountRec.accountKey = _accountKey;
            accountRec.creationTime = block.timestamp;
            accountRec.decimals = decimals;
            accountRec.stakedSPCoins = 0;
            accountRec.inserted = true;
            masterAccountList.push(_accountKey);
        }
    }

    function getAccountRecord(string memory accountType, address account)
        internal returns (AccountStruct storage accountRecord) {
            addAccountRecord(accountType, account);
            return accountMap[account];
    }

/////////////////////// REWARDS CODE ////////////////////////////////////////////////////////////////////

    function recipientHasSponsor(address _sponsorAccount, address _recipientAccount )
        internal view returns ( bool ) {
            bool sponsorFound = false;
            AccountStruct storage recipientAccount = accountMap[_recipientAccount];

            address[] storage sponsorAccountList = recipientAccount.sponsorAccountList;

            for (uint idx = 0; idx < sponsorAccountList.length; idx++) {
            if ( _sponsorAccount == sponsorAccountList[idx] )
                sponsorFound = true;
            }
            return sponsorFound;
        }


    function depositRecipientStakingRewards(address _sponsorAccount, address _recipientAccount, uint _rate, uint _amount )
        public returns ( uint ) {
        require (_amount > 0, "AMOUNT BALANCE MUST BE LARGER THAN 0");
        require (recipientHasSponsor( _sponsorAccount, _recipientAccount ), "RECIPIENT ACCOUNT SPONSOR DOES NOT EXIST");
        // console.log("SOL=>1 depositRecipientStakingRewards("); 
        // console.log("SOL=>2 _sponsorAccount    = ", _sponsorAccount);
        // console.log("SOL=>3 _recipientAccount = ", _recipientAccount);
        // console.log("SOL=> _rate             = ", _rate);
        // console.log("SOL=> _amount           = ", _amount, ")" );
        totalSupply += _amount;

        console.log("SOL=>4 FETCHING recipientAccount = accountMap[", _recipientAccount, "]");
        AccountStruct storage recipientAccount = accountMap[_recipientAccount];
        console.log("recipientAccount.sponsorAccountList.length =", recipientAccount.sponsorAccountList.length);
        // console.log("recipientAccount.sponsorAccountList[0] =", recipientAccount.sponsorAccountList[0]);


        recipientAccount.totalStakingRewards += _amount;
        mapping(address => StakingAccountStruct) storage recipienRewardstMap = recipientAccount.recipienRewardstMap;
        StakingAccountStruct storage recipientAccountRecord = recipienRewardstMap[_sponsorAccount];

        depositStakingRewards( recipientAccountRecord, _rate, _amount );

        // getRecipientStakingRewardRecords(_sponsorAccount);

        return recipientAccountRecord.stakingRewards;
    }

///------------------------------------------------------------------------------------------------------------
    function getRecipientStakingRewardRecords(address _sponsorAccount) 
        public  view returns (string memory memoryRewards) {
        console.log("*** START SOL ******************************************************************************");
        console.log("SOL=>15 getRecipientStakingRewardRecords(", _sponsorAccount, ")");
        
        AccountStruct storage sponsorRecord = accountMap[_sponsorAccount];
        address[] storage recipientAccountList = sponsorRecord.recipientAccountList;

        console.log("SOL=>16 recipientAccountList.length = ", recipientAccountList.length);
        for (uint recipientIdx = 0; recipientIdx < recipientAccountList.length; recipientIdx++) {
            address recipientKey = recipientAccountList[recipientIdx];
            AccountStruct storage recipientAccount = accountMap[recipientKey];

///////////////////////////////////////////////////////////
        mapping(address => StakingAccountStruct) storage recipienRewardstMap = recipientAccount.recipienRewardstMap;
        StakingAccountStruct storage recipientAccountRecord = recipienRewardstMap[_sponsorAccount];
        console.log("SOL=> recipientAccountRecord.rewardTransactionList.length = ", recipientAccountRecord.rewardTransactionList.length);
        console.log("SOL=> recipientAccountRecord.rewardTransactionList.length = ", recipientAccountRecord.stakingRewards);
        RewardsTransactionStruct[] storage rewardTransactionList = recipientAccountRecord.rewardTransactionList;
        for (uint idx = 0; idx < rewardTransactionList.length; idx++) {
            RewardsTransactionStruct storage rewardTransaction = rewardTransactionList[idx];
            console.log("SOL5=> rewardTransaction.rate           = ", rewardTransaction.rate);
            console.log("SOL6=> rewardTransaction.updateTime     = ", rewardTransaction.updateTime);
            console.log("SOL7=> rewardTransaction.stakingRewards = ", rewardTransaction.stakingRewards);

            memoryRewards = concat(memoryRewards , toString(_sponsorAccount), ",", toString(rewardTransaction.rate), "," );
            memoryRewards = concat(memoryRewards , toString(rewardTransaction.updateTime), ",", toString(rewardTransaction.stakingRewards));
            if (idx < rewardTransactionList.length - 1) {
                memoryRewards = concat(memoryRewards , "\n" );
            }
            // console.log("SOL=>21 getRecipientStakingRewardRecords:Transaction =", memoryRewards);

        }
//////////////////////////////////////////////////////////////////////////
/*
            mapping(address => StakingAccountStruct) storage recipienRewardstMap = recipientAccount.recipienRewardstMap;
// START ISSUE IS HERE
            
            console.log("SOL=>17 sponsorAccountList[", recipientIdx, "] = ", recipientKey);
            StakingAccountStruct storage recipientAccountRecord = recipienRewardstMap[_sponsorAccount];

            console.log("SOL=>18 recipientAccountRecord.stakingRewards = ", recipientAccountRecord.stakingRewards);

            RewardsTransactionStruct[] storage rewardTransactionList = recipientAccountRecord.rewardTransactionList;
            console.log("SOL=>19 rewardTransactionList[", _sponsorAccount, "].length = ", rewardTransactionList.length);
// START ISSUE IS HERE
            for (uint idx = 0; idx < rewardTransactionList.length; idx++) {
                RewardsTransactionStruct storage rewardTransaction = rewardTransactionList[idx];
            // console.log("SOL=>20 rewardTransaction.stakingRewards =", rewardTransaction.stakingRewards);
                memoryRewards = concat(memoryRewards , toString(_sponsorAccount), ",", toString(rewardTransaction.rate), "," );
                memoryRewards = concat(memoryRewards , toString(rewardTransaction.updateTime), ",", toString(rewardTransaction.stakingRewards));
                if (idx < rewardTransactionList.length - 1) {
                    memoryRewards = concat(memoryRewards , "\n" );
                }
            // console.log("SOL=>21 getRecipientStakingRewardRecords:Transaction =", memoryRewards);
            }
        */
        }
        // console.log("rewardsRecordList", memoryRewards);
        // console.log("*** END SOL ******************************************************************************");
        return memoryRewards;
    }
/////////////////////////////////////////////////////////////////////////////////////

    function depositStakingRewards( StakingAccountStruct storage stakingAccountRecord, 
                                        uint _rate, uint _amount )  internal {
        // console.log("SOL=>9 depositStakingRewards("); 
        // console.log("SOL=>10 stakingAccountRecord.stakingRewards = ", stakingAccountRecord.stakingRewards);
        // console.log("SOL=>11               _rate                 = ", _rate);
        // console.log("SOL=>12               _amount               = ", _amount, ")" );
        stakingAccountRecord.stakingRewards += _amount; 
        RewardsTransactionStruct[] storage rewardTransactionList = stakingAccountRecord.rewardTransactionList;
        // console.log("SOL=>13 BEFORE rewardTransactionList.length = ", rewardTransactionList.length);

        RewardsTransactionStruct memory  rewardsTransactionRecord;
        rewardsTransactionRecord.rate = _rate;
        rewardsTransactionRecord.stakingRewards = _amount;
        rewardsTransactionRecord.updateTime = block.timestamp;
        rewardTransactionList.push(rewardsTransactionRecord);
        // console.log("SOL=>14 AFTER rewardTransactionList.length = ", rewardTransactionList.length);
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /// @notice determines if address Record is inserted in accountKey array
    /// @param _accountKey public accountKey validate Insertion
    function isAccountInserted(address _accountKey)
        public view returns (bool) {
        if (accountMap[_accountKey].inserted) 
            return true;
        else
            return false;
    }

    /// @notice retreives array list masterAccountList.
    function getAccountList() public view returns (address[] memory) {
        return masterAccountList;
    }

    /////////////////////////// AGENT REQUESTS //////////////////////////////
 
    /// @notice retreives the recipients of a specific address.
    /// @param _sponsorKey public account key to set new balance
    function getAccountRecipientList(address _sponsorKey) 
    public view returns (address[] memory) {
        return accountMap[_sponsorKey].sponsorAccountList;
    }

    function getAccountListIndex (address _accountKey, 
        address[] storage _accountKeyList) internal view
        returns (uint) {
        uint i = 0;
        for (i; i < _accountKeyList.length; i++) {
            if (_accountKeyList[i] == _accountKey) {
                break;
            }
        }
        return i; 
    }

    modifier accountExists (address _accountKey) {
        require (isAccountInserted(_accountKey) , concat("Account ", toString(_accountKey), " not found"));
        _;
    }
    /////////////////// ACCOUNT SERIALIZATION REQUESTS ////////////////////////

    /// @notice retreives the account record of a specific accountKey address.
    /// @param _accountKey public accountKey to set new balance
    function getSerializedAccountRecord(address _accountKey)
        public view returns (string memory) {
        require(isAccountInserted(_accountKey));
        return serializeAccount(accountMap[_accountKey]);
    }
}