// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
/// @title ERC20 Contract
import "./Transactions.sol";

contract JUNK_BackDateRateTest is Transactions {
    constructor() { }

    function backDateRecipientRateRecord(address _sponsorKey,
                                         address _recipientKey, 
                                         uint    _recipientRateKey,
                                         uint    _backDate)
    public onlyOwnerOrRootAdmin("addSponsorship", msg.sender) {
        // console.log("SOL==>backDateRecipientRateRecord(");
        // console.log("SOL==>_sponsorKey       ", _sponsorKey);
        // console.log("SOL==>_recipientKey     ", _recipientKey, ",");
        // console.log("SOL==>_recipientRateKey ", _recipientRateKey, ",");
        // console.log("SOL==>_backDate         ", _backDate, ")");

        RecipientRateStruct storage recipientRateRecord = getRecipientRateRecord(_sponsorKey, _recipientKey, _recipientRateKey);
        recipientRateRecord.lastUpdateTime -= _backDate;
    }

    function backDateAgentRateRecord(address _sponsorKey,
                                     address _recipientKey, 
                                     uint    _recipientRateKey, 
                                     address _agentKey,
                                     uint    _agentRateKey,
                                     uint    _backDate)
    public onlyOwnerOrRootAdmin("addSponsorship", _sponsorKey) {
        // console.log("SOL==>backDateAgentRateRecord(");
        // console.log("SOL==>msg.sender        ", _sponsorKey);
        // console.log("SOL==>_recipientKey     ", _recipientKey, ",");
        // console.log("SOL==>_recipientRateKey ", _recipientRateKey, ",");
        // console.log("SOL==>_agentKey         ", _agentKey, ",");
        // console.log("SOL==>_agentRateKey     ", _agentRateKey, ",");        
        // console.log("SOL==>_backDate         ", _backDate, ")");

        AgentRateStruct storage agentRateRecord = getAgentRateRecord(_sponsorKey, 
                                                                     _recipientKey, 
                                                                     _recipientRateKey, 
                                                                     _agentKey, 
                                                                     _agentRateKey);
        // console.log("SOL==>block.timestamp", block.timestamp);
        // console.log("SOL==>BEFORE agentRateRecord.lastUpdateTime", agentRateRecord.lastUpdateTime);
        agentRateRecord.lastUpdateTime -= _backDate;
        // console.log("SOL==>AFTER agentRateRecord.lastUpdateTime", agentRateRecord.lastUpdateTime);
    }
}
