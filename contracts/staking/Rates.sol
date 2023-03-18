// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "../accounts/Agents.sol";

contract Rates is Agents{

    constructor(){
    }

    /// @notice insert sponsors Agent
    /// @param _patreonKey public Sponsor Coin Account Key
    /// @param _sponsorKey public account key to get sponsor array
    /// @param _agentKey new sponsor to add to account list

    
    function addAgentRate(address _patreonKey, address _sponsorKey, address _agentKey, uint _rate)
            public onlyOwnerOrRootAdmin(msg.sender) {

        addSponsorAgent(_patreonKey, _sponsorKey, _agentKey);  

        AgentStruct storage rateRec = getAgentRecordByKeys(_patreonKey, _sponsorKey, _agentKey);
/*        agentRec.

        AccountStruct storage accountSponsorRec = accountMap[_sponsorKey];
        AccountStruct storage accountAgentRec = accountMap[_agentKey];
        SponsorStruct storage patreonSponsorRec = getPatreonSponsorRecByKeys(_patreonKey, _sponsorKey);
        AgentStruct storage  sponsorChildAgentRec = getAgentRecordByKeys(_patreonKey, _sponsorKey, _agentKey);
        if (!sponsorChildAgentRec.inserted) {
            sponsorChildAgentRec.index = patreonSponsorRec.accountChildAgentKeys.length;
            sponsorChildAgentRec.insertionTime = block.timestamp;
            sponsorChildAgentRec.agentAccountKey    = _agentKey;
            sponsorChildAgentRec.inserted = true;
            patreonSponsorRec.accountChildAgentKeys.push(_agentKey);
            accountSponsorRec.accountChildAgentKeys.push(_agentKey);
            accountAgentRec.accountParentSponsorKeys.push(_sponsorKey);
        }
*/
    }

    function getRateRecordByKeys(address _patreonKey, address _sponsorKey, address _agentKey, uint _rate) internal view onlyOwnerOrRootAdmin(_patreonKey) returns (RateStruct storage) {
        SponsorStruct storage sponsorRec = getPatreonSponsorRecByKeys(_patreonKey, _sponsorKey);
        RateStruct storage rateRec = sponsorRec.rateMap[_rate];
        // RateStruct storage sponsorRec = getPatreonSponsorRecByKeys(_patreonKey, _sponsorKey);
        // SponsorStruct storage sponsorChildAgentRec = sponsorRec.agentMap[_agentKey];
        // return sponsorChildAgentRec;
        return rateRec;
     }

}
