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
        AgentStruct storage  sponsorAgentRec = getAgentRecordByKeys(_patreonKey, _sponsorKey, _agentKey);
        if (!sponsorAgentRec.inserted) {
            sponsorAgentRec.index = patreonSponsorRec.accountAgentKeys.length;
            sponsorAgentRec.insertionTime = block.timestamp;
            sponsorAgentRec.agentAccountKey    = _agentKey;
            sponsorAgentRec.inserted = true;
            patreonSponsorRec.accountAgentKeys.push(_agentKey);
            accountSponsorRec.accountAgentKeys.push(_agentKey);
            accountAgentRec.accountParentSponsorKeys.push(_sponsorKey);
        }
    }

    /// @notice Remove all sponsorship relationships for Patreon and Sponsor accounts
    /// @param _patreonKey Patreon key containing the Sponsor relationship
    /// @param _sponsorKey Sponsor to be removed from the Sponsor relationship
    function deletePatreonSponsor(address _patreonKey, address _sponsorKey)  
        public onlyOwnerOrRootAdmin(_patreonKey)
        accountExists(_patreonKey)
        accountExists(_sponsorKey)
        nonRedundantSponsor ( _patreonKey,  _sponsorKey) {
    
        AccountStruct storage patreonAccountRec = accountMap[_patreonKey];
        address[] storage patreonSponsorKeys = patreonAccountRec.accountSponsorKeys;
console.log("***Agent.sol:deletePatreonSponsor(", _patreonKey,  _sponsorKey, ")");
        if (deleteAccountFromSearchKeys(_sponsorKey, patreonSponsorKeys)) {
            deleteSponsorRecord(_patreonKey, _sponsorKey);
        }
    }

    function deleteSponsorRecord(address _patreonKey, address _sponsorKey) internal {
        AccountStruct storage sponsorAccountRec = accountMap[_sponsorKey];
        address[] storage accountParentPatreonKeys = sponsorAccountRec.accountParentPatreonKeys;
        if (deleteAccountFromSearchKeys(_patreonKey, accountParentPatreonKeys)) {
            deleteSponsorAgentRecords (_patreonKey, _sponsorKey);
        }
        // Optional        delete accountMap[_sponsorKey];
    }

    function deleteSponsorAgentRecords (address _patreonKey, address _sponsorKey) internal {
        // Get The Patreon Account Record and Remove from the Child Sponsor Relationship account list
        AccountStruct storage patreonAccountRec = accountMap[_patreonKey];
        mapping(address => SponsorStruct) storage sponsorMap = patreonAccountRec.sponsorMap;

        // console.log("deleteAgentsFromSponsor(_sponsorKey, sponsorMap)");
        mapping(address => AgentStruct) storage agentMap = sponsorMap[_sponsorKey].agentMap;
        address[] storage accountAgentKeys = sponsorMap[_sponsorKey].accountAgentKeys;

        uint i = accountAgentKeys.length - 1;
        // console.log("*** BEFORE AGENT DELETE accountAgentKeys.length = ", accountAgentKeys.length);
         for (i; i >= 0; i--) {
            deleteSponsorAgentRecord(_sponsorKey, accountAgentKeys[i]); 
            // console.log("***** Deleting accountAgentKeys ", agentStruct.agentAccountKey);
            delete agentMap[accountAgentKeys[i]];
            delete accountAgentKeys[i];
            accountAgentKeys.pop();
            if (i == 0)
               break;
        }
    }

    function deleteSponsorAgentRecord (address _sponsorKey, address _agentKey) public {
        // console.log("Deleting Agent Key ", _agentKey, "from Sponsor child Agent Keys ", _sponsorKey); 
        AccountStruct storage accountSponsorRec = accountMap[_sponsorKey];
        address[] storage AgentKeys = accountSponsorRec.accountAgentKeys;
        if (deleteAccountFromSearchKeys(_agentKey, AgentKeys)) {
            deleteSponsorParentFromAgent (_sponsorKey, _agentKey);
        }
    }

    function deleteSponsorParentFromAgent (address _sponsorKey, address _agentKey) internal {
        // console.log("Deleting Sponsor Key ", _sponsorKey, "from Agent Parent Sponsor Keys ", _agentKey); 
        AccountStruct storage accountAgentRec = accountMap[_agentKey];

        address[] storage parentSponsorKeys = accountAgentRec.accountParentSponsorKeys;
        deleteAccountFromSearchKeys(_sponsorKey, parentSponsorKeys);
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
            return accountMap[_patreonKey].sponsorMap[_sponsorKey].agentMap[_agentKey].index;
        }
        else
            return 0;
    }

    /*
    function getAgentInsertionTime(address _patreonKey, address _sponsorKey, address _agentKey) public onlyOwnerOrRootAdmin(_patreonKey) view returns (uint) {
        if (isAgentInserted(_patreonKey, _sponsorKey, _agentKey))
            return accountMap[_patreonKey].sponsorMap[_sponsorKey].agentMap[_agentKey].insertionTime;
        else
            return 0;
    }
*/
}
