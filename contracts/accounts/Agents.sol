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
    function insertSponsorAgent(address _sponsorKey, address _agentKey) public onlyOwnerOrRootAdmin(msg.sender) returns (bool) {
        insertAccount(_sponsorKey);
        insertAccount(_agentKey);
        accountRec storage account = accountMap[_sponsorKey];
        account.agents.push(_agentKey);
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

        // console.log("#########################################################################");
        // console.log(concat(_sponsorKey, 15));
        // console.log("#########################################################################");
        // concat("", "");

        address agentaddr = accountMap[_sponsorKey].agents[_agentIdx];
        return agentaddr;
    }

    /// @notice retreives the sponsor array record size a specific address.
    /// @param _sponsorKey public account key to get Sponsor Record Length
    function getAgentRecordCount(address _sponsorKey) public view onlyOwnerOrRootAdmin(_sponsorKey) returns (uint) {
        return getAgents(_sponsorKey).length;
    }

    /// @notice retreives the sponsor array records from a specific account address.
    /// @param _sponsorKey public account key to get Sponsors
   function getAgents(address _sponsorKey) internal view onlyOwnerOrRootAdmin(_sponsorKey) returns (address[] memory) {
        address[] storage actAgent = accountMap[_sponsorKey].agents;
        return actAgent;
    }

}