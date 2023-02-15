// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
/// @title ERC20 Contract
import "./Sponsors.sol";

contract Agents is Sponsors {
        constructor(){
    }

    /// @notice insert sponsors Agent
    /// @param _sponsorKey public account key to get sponsor array
    /// @param _agentKey new sponsor to add to account list
    function insertSponsorAgent(address _accountKey, address _sponsorKey, address _agentKey) public onlyOwnerOrRootAdmin(msg.sender) returns (bool) {
        insertAccount(_sponsorKey);
        insertAccount(_agentKey);
        accountRec storage account = accountMap[_sponsorKey];
        account.parentAccount = _sponsorKey;
//accountSponsorRecs memory accountSponsors = getAccountSponsorRec(_accountKey, _sponsorKey);
        string memory accountSponsorKey =  getAccountSponsorKey(_accountKey, _sponsorKey);
        accountSponsorRecs storage  accountSponsors = accountSponsorMap[accountSponsorKey];

        string memory accountSponsorAgentKey =  getAccountSponsorAgentKey(_accountKey, _sponsorKey, _agentKey);
        accountSponsorAgentStruct storage  accountSponsorAgents = accountSponsorAgentMap[accountSponsorAgentKey];
        
//        string storage accountSponsorAgent = accountSponsorAgentMap[accountSponsorAgentKey];

        // console.log("accountSponsorAgentKey = ");
        // console.log(accountSponsorAgentKey);
        //accountSponsorAgentStruct memory accountSponsorAgents = getAccountSponsorAgentRec(_accountKey, _sponsorKey, _agentKey);
        if (accountSponsorAgents.account == burnAddress) {
           accountSponsorAgents.account = _accountKey;
           accountSponsorAgents.sponsor = _sponsorKey;
           accountSponsorAgents.agent = _agentKey;
           accountSponsors.agentKeys.push(accountSponsorAgentKey);
           return true;
        }

//        account.agents.push(_agentKey);
        return true;
    }

     function getAccountSponsorAgentKey(address _accountKey, address _sponsorKey, address _agentKey) public view onlyOwnerOrRootAdmin(_accountKey) returns (string memory) {
        string memory accountSponsorAgentKey =  concat(_accountKey, _sponsorKey, _agentKey);
        return accountSponsorAgentKey;
     }

     function getAccountSponsorAgentRec(address _accountKey, address _sponsorKey, address _agentKey) internal view onlyOwnerOrRootAdmin(_accountKey) returns (accountSponsorAgentStruct memory) {
        string memory accountSponsorAgentKey =  getAccountSponsorAgentKey(_accountKey, _sponsorKey, _agentKey);
        accountSponsorAgentStruct memory  accountSponsorAgents = accountSponsorAgentMap[accountSponsorAgentKey];
        return accountSponsorAgents;
     }

    /// @notice get address for an account sponsor
    /// @param _sponsorKey public account key to get agent array
    /// @param _agentIdx new agent to add to account list
    function getAccountSponsorAgentAddress(address _accountKey, address _sponsorKey, uint _agentIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        string[] memory agents = getAgents(_accountKey, _sponsorKey);
        string memory agent = agents[_agentIdx];
        console.log("getAccountSponsorAgentAddress Found agent Key");
        console.log(agent);
        return burnAddress;
    }

    /// @notice retreives the sponsor array record size a specific address.
    /// @param _sponsorKey public account key to get Sponsor Record Length
    function getAgentRecordCount(address _accountKey, address _sponsorKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (uint) {
        return getAgents(_accountKey, _sponsorKey).length;
    }

    /// @notice retreives the sponsor array records from a specific account address.
    /// @param _sponsorKey public account key to get Sponsors
   function getAgents(address _accountKey, address _sponsorKey) internal view onlyOwnerOrRootAdmin(_sponsorKey) returns (string[] memory) {
        string memory accountSponsorKey =  getAccountSponsorKey(_accountKey, _sponsorKey);
        accountSponsorRecs storage  accountSponsors = accountSponsorMap[accountSponsorKey];

        string[] storage agentKeys = accountSponsors.agentKeys;
        return agentKeys;
    }

}