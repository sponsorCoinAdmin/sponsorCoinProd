// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
/// @title ERC20 Contract
import "./Sponsors.sol";
import "../utils/StructSerialization.sol";

contract Agents is Sponsors {
        constructor(){
    }

    /// @notice insert sponsors Agent
    /// @param _accountKey public Sponsor Coin Account Key
    /// @param _sponsorAccountKey public account key to get sponsor array
    /// @param _agentAccountKey new sponsor to add to account list
    function insertSponsorAgent(address _accountKey, address _sponsorAccountKey, address _agentAccountKey)
            public onlyOwnerOrRootAdmin(msg.sender) 
            nonRedundantAgent ( _accountKey, _sponsorAccountKey, _agentAccountKey) {
        insertAccountSponsor(_accountKey, _sponsorAccountKey);
        addAccountRecord(_agentAccountKey);

        AccountStruct storage accountSponsorRec = accountMap[_sponsorAccountKey];
        AccountStruct storage accountAgentRec = accountMap[_agentAccountKey];
        SponsorStruct storage accountChildSponsorRec = getAccountSponsorRecByKey(_accountKey, _sponsorAccountKey);
        AgentStruct storage  sponsorChildAgentRec = getAgentRec(_accountKey, _sponsorAccountKey, _agentAccountKey);
        if (!sponsorChildAgentRec.inserted) {
            sponsorChildAgentRec.index = accountChildSponsorRec.accountAgentKeys.length;
            sponsorChildAgentRec.insertionTime = block.timestamp;
            sponsorChildAgentRec.account  = _accountKey;
            sponsorChildAgentRec.agent    = _agentAccountKey;
            sponsorChildAgentRec.inserted = true;
            accountChildSponsorRec.accountAgentKeys.push(_agentAccountKey);
            accountSponsorRec.accountAgentKeys.push(_agentAccountKey);
            accountAgentRec.accountAgentSponsorKeys.push(_agentAccountKey);
        }
    }

    /// @notice determines if agent address is inserted in account.sponsor.agent.map
    /// @param _accountKey public account key validate Insertion
    /// @param _sponsorAccountKey public sponsor account key validate Insertion
    /// @param _agentAccountKey public agent account key validate Insertion
    function isAgentInserted(address _accountKey,address _sponsorAccountKey,address _agentAccountKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (bool) {
        if (getAgentRec(_accountKey, _sponsorAccountKey, _agentAccountKey).inserted)
            return true;
        else
            return false;
    }

    function getAgentIndex(address _accountKey, address _sponsorAccountKey, address _agentAccountKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (uint) {
        if (isAgentInserted(_accountKey, _sponsorAccountKey, _agentAccountKey)) {
            //uint256 agentIndex = accountMap[_accountKey].sponsorMap[_sponsorAccountKey].agentMap[_agentAccountKey].index;
            // console.log(_accountKey, _sponsorAccountKey, _agentAccountKey);
            // console.log("Index = ", agentIndex);
            return accountMap[_accountKey].sponsorMap[_sponsorAccountKey].agentMap[_agentAccountKey].index;
        }
        else
            return 0;
        }

    function getAgentInsertionTime(address _accountKey, address _sponsorAccountKey, address _agentAccountKey) public onlyOwnerOrRootAdmin(_accountKey) view returns (uint) {
        if (isAgentInserted(_accountKey, _sponsorAccountKey, _agentAccountKey))
            return accountMap[_accountKey].sponsorMap[_sponsorAccountKey].agentMap[_agentAccountKey].insertionTime;
        else
            return 0;
    }

    function getValidAgentRec(address _accountKey, address _sponsorAccountKey, address _agentAccountKey) internal onlyOwnerOrRootAdmin(_accountKey) returns (AgentStruct storage) {
        if (!isAgentInserted(_accountKey, _sponsorAccountKey, _agentAccountKey)) {
            insertSponsorAgent(_accountKey, _sponsorAccountKey, _agentAccountKey);
        }
        return getAgentRec(_accountKey, _sponsorAccountKey, _agentAccountKey);
     }

    function getAgentRec(address _accountKey, address _sponsorAccountKey, address _agentAccountKey) internal view onlyOwnerOrRootAdmin(_accountKey) returns (AgentStruct storage) {
        SponsorStruct storage sponsorRec = getAccountSponsorRecByKey(_accountKey, _sponsorAccountKey);
        AgentStruct storage sponsorChildAgentRec = sponsorRec.agentMap[_agentAccountKey];
        return sponsorChildAgentRec;
     }

    /// @notice get address for an account sponsor
    /// @param _sponsorAccountKey public account key to get agent array
    /// @param _agentIdx new agent to add to account list
    function getSponsorAgentKeyAddress(address _accountKey, address _sponsorAccountKey, uint _agentIdx ) public view onlyOwnerOrRootAdmin(msg.sender) returns (address) {
        address[] memory agentList = getAgentList(_accountKey, _sponsorAccountKey);
        address agentAddress = agentList[_agentIdx];
        return agentAddress;
    }

    /// @notice retreives the sponsor array record size a specific address.
    /// @param _sponsorAccountKey public account key to get Sponsor Record Length
    function getSponsorAgentSize(address _accountKey, address _sponsorAccountKey) public view onlyOwnerOrRootAdmin(_sponsorAccountKey) returns (uint) {
        return getAgentList(_accountKey, _sponsorAccountKey).length;
    }

    /// @notice retreives the sponsor array records from a specific account address.
    /// @param _sponsorAccountKey public account key to get Sponsors
    function getAgentList(address _accountKey, address _sponsorAccountKey) internal view onlyOwnerOrRootAdmin(_sponsorAccountKey) returns (address[] memory) {
        SponsorStruct storage sponsorRec = getAccountSponsorRecByKey(_accountKey, _sponsorAccountKey);
        address[] memory accountAgentKeys = sponsorRec.accountAgentKeys;
        return accountAgentKeys;
    }
}
