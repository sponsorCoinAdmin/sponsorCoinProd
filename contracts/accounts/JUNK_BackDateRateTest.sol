// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./Transactions.sol";

contract JUNK_BackDateRateTest is Transactions {
    
    constructor() { }

    function backDateRecipientRateRecord(address _sponsorKey,
                                 address _recipientKey, 
                                 uint _recipientRateKey,
                                 uint _backDate)
    public onlyOwnerOrRootAdmin("addSponsorship", msg.sender) {
        // console.log("msg.sender     ", msg.sender);
        // console.log("addSponsorship(", _recipientKey, ",");
        // console.log("               ", _recipientRateKey, ",");
        // console.log("               ", _agentKey, ",");
        // console.log("               ", _agentRateKey, ",");        
        // console.log("               ", _backDate);
         RecipientRateStruct storage recipientRateRecord = getRecipientRateRecord(_sponsorKey, _recipientKey, _recipientRateKey);
         recipientRateRecord.lastUpdateTime -= _backDate;
    }

    function backDateAgentRateRecord(address _sponsorKey,
                                 address _recipientKey, 
                                 uint _recipientRateKey, 
                                 address _agentKey,
                                 uint _agentRateKey,
                                 uint _backDate)
    public onlyOwnerOrRootAdmin("addSponsorship", msg.sender) {
        console.log("msg.sender     ", msg.sender);
        console.log("addSponsorship(", _recipientKey, ",");
        console.log("               ", _recipientRateKey, ",");
        console.log("               ", _agentKey, ",");
        console.log("               ", _agentRateKey, ",");        
        console.log("               ", _backDate);

        AgentRateStruct storage agentRateRecord = getAgentRateRecord(_sponsorKey, 
                                                                     _recipientKey, 
                                                                     _recipientRateKey, 
                                                                     _agentKey, 
                                                                     _agentRateKey);
        console.log("agentRateRecord.lastUpdateTime", agentRateRecord.lastUpdateTime);
        agentRateRecord.lastUpdateTime -= _backDate;
    }
}
