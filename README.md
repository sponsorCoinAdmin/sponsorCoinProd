# dev-contracts-spCoin

// TESTING

// VISUAL STUDIO CODE INSTALL PLUGIN
Nomic Foundation

// INSTALLING HARDHAT
npm install --save-dev hardhat

//REQUIRED SUPPORT PACKAGES
"@nomicfoundation/hardhat-toolbox": "^2.0.1"
npm install --save-dev @nomicfoundation/hardhat-toolbox  @nomiclabs/hardhat-ethers 'ethers@^5.0.0'

Add the following code snippet at the top of your hardhat.config.js file
require("@nomicfoundation/hardhat-toolbox");

npm audit fix --force

// IMPORTANT HARDHAT GLOBAL COMMANDS
npx hardhat help

dataStructureModel Inheritance Level
SPCoin
  Token
      Staking Manager
        Transactions
          AgentRates
            Agents
              RecipientRates
                Recipients
                  Accounts



To Add a Recipient Account Agent, add the following:
Add a Rate Record to Agent

Using: addAgents(Recipient, SponsroRate, [Agents])
Example: addAgents(2, 10, [6]); 

Add a Rate Record to Recipient
================================================
Create:  AddRecipientRate(Account, Recipient, RecipientRatePercent);
Example: AddRecipientRate(1, 2, 10);

Add a Rate Record to Recipient
================================================
Create: AddAgentRate(Account, Recipient, Agent, RecipientRatePercent, AgentRatePercent);
Example: AddAgentRate(1, 2, 6, 10, 10);

Add a Recipient Transaction
================================================
Create AddRecipientTransaction(Account, Recipient, RecipientRate, amount);
Example: AddRecipientTransaction(1, 2, 10, 123.1230);

Add aa Agent Transaction
================================================
Create addAgentTransaction(Account, Recipient, RecipientRate, Agent, AgentRate, Amount)
Example: AddAgentRate(1, 2, 6, 10, 10, 123.1230);


Requirements to Delete Agent: Agent Affiliation Program
1. Require Agent to be child of Recipient
2. Require Agent to have No RecipientCoin balanceOf Token affiliation with Parent.
3. Must Remove from parent Recipient.agentAccountList
4. Then Remove Recipient Parent from agentAccount.parentRecipientAccountList
5. Optional, If Agent account balanceOf is zero (0), Agent account may be deleted.

Requirements to Delete Recipient from Sponsor: (Delete Sponsor recipientship)
1. Require Recipient to be Child of Sponsor
2. Require Recipient to have no Parent Patrion balanceOf Token affiliation.
3. Require Recipient to have no Child Agent affiliation
4. Remove associated child agents from Recipient.agentAccountList
5. Remove from Account ParentKeys, account.recipientAccountList
6. Remove from Account.recipientMap, 
7. Optional, If Recipient account balanceOf is zero (0), Recipient account may be deleted.

Requirements to Delete Account
1. Require Account to have No Recipients, account.recipientAccountList must be zero (0).
2. Require Account to have No Agents, account.agentAccountList must be zero (0).
3. Optional, Require Account to have No Sponsors account.sponsorAccountList must be zero (0).
4. Optional, Require Account to have No account.parentRecipientAccountList must be zero (0).
