// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
/// @title ERC20 Contract
import "./KYC.sol";

contract Accounts is KYC {

   address burnAddress = 0x0000000000000000000000000000000000000000;
   // Keep track of account insertions
   address[] public accountIndex;
//    address[] public sponsorIndex;
//    address[] public agentIndex;
   uint public lastStakingUpdateTime = block.timestamp;

   struct accountRec {
       addressRec[] sponsors;
       addressRec[] agents;
       address parentAccount;
       rateRec[] rateEntries;
       uint index;
       uint insertionTime;
       bool inserted;
       KYC kyc ;
       bool verified;
    }
    struct rateRec {
       uint[] rate;
       uint insertionTime;
       uint lastUpdateTime;
       uint256 quantity;
    }
    struct addressRec {
       address[] child;
       address addr;
       rateRec next;
    }

    mapping(address => accountRec)  accounts;
    // mapping(address => addressRec)  sponsors;
    // mapping(address => agentRec)  agents;

    constructor(){
    }

    /// @notice determines if address is inserted in account array
    /// @param _accountKey public account key validate Insertion
    function isInserted(address _accountKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (bool) {
        if (accounts[_accountKey].inserted)
            return true;
        else
            return false;
    }

    /// @notice insert sponsors Agent
    /// @param _sponsorKey public account key to get sponsor array
    /// @param _agentKey new sponsor to add to account list
    function insertSponsorAgent(address _sponsorKey, address _agentKey) public onlyOwnerOrRootAdmin(msg.sender) returns (bool) {
        insertAccount(_sponsorKey);
        insertAccount(_agentKey);
        accountRec storage account = accounts[_sponsorKey];
//      uint256 insertionTime = block.timestamp;

        addressRec memory newAgent;
        newAgent.addr = _agentKey;
        account.agents.push(newAgent);

        return true;
    }

    /// @notice insert address for later recall
    /// @param _accountKey public account key to get sponsor array
    /// @param _sponsorKey new sponsor to add to account list
    function insertAccountSponsor(address _accountKey, address _sponsorKey) public onlyOwnerOrRootAdmin(_accountKey) returns (bool) {
        insertAccount(_accountKey);
        insertAccount(_sponsorKey);
        accountRec storage account = accounts[_accountKey];
//        uint256 insertionTime = block.timestamp;

        addressRec memory newSponsor;
        newSponsor.addr = _sponsorKey;
        account.sponsors.push(newSponsor);

        return true;
    }

    /// @notice get address for an account sponsor
    /// @param _sponsorKey public account key to get agent array
    /// @param _agentIdx new agent to add to account list
    function getSponsorAgentKey(address _sponsorKey, uint _agentIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        // console.log("getAccountSponsorKey(");
        // console.log("_sponsorKey = ");
        // console.log(_sponsorKey);
        // console.log("_agentIdx = ");
        // console.log(_agentIdx);
        // console.log(")");

        address agentaddr = accounts[_sponsorKey].agents[_agentIdx].addr;
        return agentaddr;
    }

    /// @notice get address for an account sponsor
    /// @param _accountKey public account key to get sponsor array
    /// @param _sponsorIdx new sponsor to add to account list
    function getAccountSponsorKey(address _accountKey, uint _sponsorIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        // console.log("getAccountSponsorKey(");
        // console.log("_accountKey = ");
        // console.log(_accountKey);
        // console.log("_sponsorIdx = ");
        // console.log(_sponsorIdx);
        // console.log(")");

        // console.log("#########################################################################");
        // console.log(concat(_accountKey, 15));
        // console.log("#########################################################################");
//        concat("", "");

        address sponsoraddr = accounts[_accountKey].sponsors[_sponsorIdx].addr;
        return sponsoraddr;
    }

    /// @notice insert address for later recall
    /// @param _accountKey public account key to set new balance
    /// @return true if balance is set, false otherwise
    function insertAccount(address _accountKey) public onlyOwnerOrRootAdmin(_accountKey) returns (bool) {
         if (!isInserted(_accountKey)) {
            accounts[_accountKey].insertionTime = block.timestamp;
            accounts[_accountKey].inserted = true;
            accounts[_accountKey].index = accountIndex.length;
            accounts[_accountKey].parentAccount = burnAddress;
            accountIndex.push(_accountKey);
            // console.log("Returning TRUE");
            return true;
         }
            // console.log("Returning FALSE");
            return false;
    }

    /// @notice retreives the sponsor array record size a specific address.
    /// @param _accountKey public account key to get Sponsor Record Length
    function getSponsorRecordCount(address _accountKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (uint) {
        return getAccountSponsors(_accountKey).length;
    }

    /// @notice retreives the sponsor array records from a specific account address.
    /// @param _accountKey public account key to get Sponsors
   function getAccountSponsors(address _accountKey) internal view onlyOwnerOrRootAdmin(_accountKey) returns (addressRec[] memory) {
        return accounts[_accountKey].sponsors;
    }

   /// @notice retreives the sponsor array record size a specific address.
    /// @param _sponsorKey public account key to get Sponsor Record Length
    function getAgentRecordCount(address _sponsorKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (uint) {
        return getAccountAgents(_sponsorKey).length;
    }

    /// @notice retreives the sponsor array records from a specific account address.
    /// @param _sponsorKey public account key to get Sponsors
   function getAccountAgents(address _sponsorKey) internal view onlyOwnerOrRootAdmin(_sponsorKey) returns (addressRec[] memory) {
        return accounts[_sponsorKey].agents;
    }


    /// @notice retreives the array index of a specific address.
    /// @param _accountKey public account key to set new balance
    function getindex(address _accountKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (uint) {
        if (isInserted(_accountKey))
            return accounts[_accountKey].index;
        else
            return 0;
    }

    /// @notice retreives the array index of a specific address.
     function getAccountRecordCount() public view returns (uint) {
        return accountIndex.length;
      }

    /// @notice retreives a specified account address from accountIndex.
    /// @param _idx index of a specific account in accountIndex
     function getAccount(uint _idx) public view returns (address) {
        return accountIndex[_idx];
      }

    /// @notice retreives the account record of a specific account address.
    /// @param _accountKey public account key to set new balance
    function getAccountRecord(address _accountKey) internal onlyOwnerOrRootAdmin(_accountKey) view returns (accountRec storage) {
        require (isInserted(_accountKey));
        return accounts[_accountKey];
    }

    /// @notice retreives the account balance of a specific address.
    function getSponsorRecCount() public view returns (uint) {
        return getSponsorRecords().length;
    }
    
   /// @notice retreives the account balance of a specific address.
    function getSponsorRecords() internal view returns (addressRec[] memory) {
        return getSponsorRecords(msg.sender);
    }
    
    /// @notice retreives the account balance of a specific address.
    /// @param _accountKey public account key to set new balance
    function getSponsorRecords(address _accountKey) internal onlyOwnerOrRootAdmin(_accountKey) view returns (addressRec[] memory) {
        addressRec[] storage actSponsor = accounts[_accountKey].sponsors;
        return actSponsor;
    }
}