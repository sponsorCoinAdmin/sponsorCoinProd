// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
/// @title ERC20 Contract
import "../accounts/Agents.sol";

contract Rates is Agents{

    constructor(){
    }

    /// @notice insert sponsors Agent
    /// @param _rate Rate record for transaction
    function insertSponsorRate(uint256 _rate) public onlyOwnerOrRootAdmin(msg.sender) returns (bool) {
/*
        insertAccountSponsor(_accountKey, _sponsorKey);
        // addNetworkAccount(_agentKey);
        // addNetworkAccount(_sponsorKey);
        addNetworkAccount(_agentKey);

        SponsorStruct storage sponsorRec = getSponsorRec(_accountKey, _sponsorKey);
        AgentStruct storage  agentRec = getAgentRec(_accountKey, _sponsorKey, _agentKey);

        if (!agentRec.inserted) {
            agentRec.index = sponsorRec.agentKeys.length;
            agentRec.insertionTime = block.timestamp;
            agentRec.account  = _accountKey;
            agentRec.sponsor  = _sponsorKey;
            agentRec.agent    = _agentKey;
            agentRec.inserted = true;
            sponsorRec.agentKeys.push(_agentKey);
            return true;
        */
    }

}
