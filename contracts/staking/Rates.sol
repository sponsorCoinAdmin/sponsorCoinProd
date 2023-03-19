// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "../accounts/Agents.sol";

contract Rates is Agents{

    constructor() {
    }

    /// @notice insert sponsors Agent
    /// @param _patreonKey public Sponsor Coin Account Key
    /// @param _sponsorKey public account key to get sponsor array
    /// @param _agentKey new sponsor to add to account list
    
    function addAgentRate(address _patreonKey, address _sponsorKey, address _agentKey, uint _rateKey)
            public onlyOwnerOrRootAdmin(msg.sender) {

        addSponsorAgent(_patreonKey, _sponsorKey, _agentKey);

        AgentStruct storage agentRec = getAgentRecordByKeys(_patreonKey, _sponsorKey, _agentKey);
        mapping(uint256 => RateStruct) storage rateMap = agentRec.rateMap;
        RateStruct storage rateRec = rateMap[_rateKey];
        if (!rateRec.inserted) {
            rateRec.inserted = true;
            rateRec.insertionTime = rateRec.lastUpdateTime = block.timestamp;
        }
        else {
            rateRec.lastUpdateTime = block.timestamp;
        }
    } 
    
    /// @notice determines if address Record is inserted in accountKey array
    /// @param _agentRec agent record containing rateMap records
    /// @param _rateKey key for a specific rateMap record
    function isRateInserted(AgentStruct storage _agentRec, uint _rateKey) internal view returns (bool) {
        mapping(uint256 => RateStruct) storage rateMap = _agentRec.rateMap;
        if (rateMap[_rateKey].inserted)
            return true;
        else 
            return false;
    }

    function getRateRecordByKeys(address _patreonKey, address _sponsorKey, address _agentKey, uint _rate) internal view onlyOwnerOrRootAdmin(_patreonKey) returns (RateStruct storage) {
        SponsorStruct storage sponsorRec = getPatreonSponsorRecByKeys(_patreonKey, _sponsorKey);
        RateStruct storage rateRec = sponsorRec.rateMap[_rate];
        return rateRec;
     }
}
