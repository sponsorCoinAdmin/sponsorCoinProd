// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "./Sponsors.sol";
import "../utils/StructSerialization.sol";

contract Agents is Sponsors {
        constructor(){
    }

    /// @notice insert sponsors Agent
    /// @param _patreonKey public Sponsor Coin Account Key
    /// @param _sponsorKey public account key to get sponsor array
    /// @param _agentKey new sponsor to add to account list
    function addSponsorAgent(address _patreonKey, address _sponsorKey, address _agentKey)
            public onlyOwnerOrRootAdmin(msg.sender) 
            nonRedundantAgent ( _patreonKey, _sponsorKey, _agentKey) {
        addPatreonSponsor(_patreonKey, _sponsorKey);
        addAccountRecord(_agentKey);

        AccountStruct storage accountSponsorRec = accountMap[_sponsorKey];
        AccountStruct storage accountAgentRec = accountMap[_agentKey];
        SponsorStruct storage patreonSponsorRec = getPatreonSponsorRecByKeys(_patreonKey, _sponsorKey);
        AgentStruct storage  sponsorChildAgentRec = getAgentRecordByKeys(_patreonKey, _sponsorKey, _agentKey);
        if (!sponsorChildAgentRec.inserted) {
            sponsorChildAgentRec.index = patreonSponsorRec.accountAgentKeys.length;
            sponsorChildAgentRec.insertionTime = block.timestamp;
            sponsorChildAgentRec.agentAccountKey    = _agentKey;
            sponsorChildAgentRec.inserted = true;
            patreonSponsorRec.accountAgentKeys.push(_agentKey);
            accountSponsorRec.accountAgentKeys.push(_agentKey);
            accountAgentRec.accountAgentSponsorKeys.push(_agentKey);
        }
    }

    /// @notice determines if agent address is inserted in account.sponsor.agent.map
    /// @param _patreonKey public account key validate Insertion
    /// @param _sponsorKey public sponsor account key validate Insertion
    /// @param _agentKey public agent account key validate Insertion
    function isAgentInserted(address _patreonKey,address _sponsorKey,address _agentKey) public onlyOwnerOrRootAdmin(_patreonKey) view returns (bool) {
        return getAgentRecordByKeys(_patreonKey, _sponsorKey, _agentKey).inserted;
    }

    function getAgentIndex(address _patreonKey, address _sponsorKey, address _agentKey) public onlyOwnerOrRootAdmin(_patreonKey) view returns (uint) {
        if (isAgentInserted(_patreonKey, _sponsorKey, _agentKey)) {
            //uint256 agentIndex = accountMap[_patreonKey].sponsorMap[_sponsorKey].agentMap[_agentKey].index;
            // console.log(_patreonKey, _sponsorKey, _agentKey);
            // console.log("Index = ", agentIndex);
            return accountMap[_patreonKey].sponsorMap[_sponsorKey].agentMap[_agentKey].index;
        }
        else
            return 0;
        }

    function getAgentInsertionTime(address _patreonKey, address _sponsorKey, address _agentKey) public onlyOwnerOrRootAdmin(_patreonKey) view returns (uint) {
        if (isAgentInserted(_patreonKey, _sponsorKey, _agentKey))
            return accountMap[_patreonKey].sponsorMap[_sponsorKey].agentMap[_agentKey].insertionTime;
        else
            return 0;
    }
    /////////////////// DELETE AGENT METHODS ////////////////////////

    /// @notice delete sponsors Agent
    /// @param _patreonKey public Sponsor Coin Account Key
    /// @param _sponsorKey public account key to get sponsor array
    /// @param _agentKey new sponsor to add to account list
    function deleteSponsorAgent(address _patreonKey, address _sponsorKey, address _agentKey)
            public onlyOwnerOrRootAdmin(msg.sender) 
            agentExists ( _patreonKey, _sponsorKey, _agentKey) {
        // addPatreonSponsor(_patreonKey, _sponsorKey);
        // addAccountRecord(_agentKey);

        // AccountStruct storage accountSponsorRec = accountMap[_sponsorKey];
        // AccountStruct storage accountAgentRec = accountMap[_agentKey];
        // SponsorStruct storage patreonSponsorRec = getPatreonSponsorRecByKeys(_patreonKey, _sponsorKey);
        // AgentStruct storage  sponsorChildAgentRec = getAgentRecordByKeys(_patreonKey, _sponsorKey, _agentKey);
        // if (!sponsorChildAgentRec.inserted) {
        //     sponsorChildAgentRec.index = patreonSponsorRec.accountAgentKeys.length;
        //     sponsorChildAgentRec.insertionTime = block.timestamp;
        //     sponsorChildAgentRec.agentAccountKey    = _agentKey;
        //     sponsorChildAgentRec.inserted = true;
        //     patreonSponsorRec.accountAgentKeys.push(_agentKey);
        //     accountSponsorRec.accountAgentKeys.push(_agentKey);
        //     accountAgentRec.accountAgentSponsorKeys.push(_agentKey);
        // }
    }

    modifier agentExists (address _patreonKey, address _sponsorKey, address _agentKey) {
        require (isAgentInserted(_patreonKey, _sponsorKey, _agentKey) , "_agentKey not found)");
        _;
    }

}
