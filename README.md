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
              BenificiaryRates
                Benificiarias
                  Accounts



To Add a Benificiary Account Agent, add the following:
Add a Rate Record to Agent

Using: addBenificiaryAgents(Account, Benificiary, SponsroRate, [Agents])
Example: addBenificiaryAgents(1, 2, 10, [6]); 

Add a Rate Record to Benificiary
================================================
Create:  AddBenificiaryRate(Account, Benificiary, BenificiaryRatePercent);
Example: AddBenificiaryRate(1, 2, 10);

Add a Rate Record to Benificiary
================================================
Create: AddAgentRate(Account, Benificiary, Agent, BenificiaryRatePercent, AgentRatePercent);
Example: AddAgentRate(1, 2, 6, 10, 10);

Add a Benificiary Transaction
================================================
Create AddBenificiaryTransaction(Account, Benificiary, BenificiaryRate, amount);
Example: AddBenificiaryTransaction(1, 2, 10, 123.1230);

Add aa Agent Transaction
================================================
Create AddAgentRateTransaction(Account, Benificiary, BenificiaryRate, Agent, AgentRate, Amount)
Example: AddAgentRate(1, 2, 6, 10, 10, 123.1230);


Requirements to Delete Agent: Agent Affiliation Program
1. Require Agent to be child of Benificiary
2. Require Agent to have No BenificiaryCoin balanceOf Token affiliation with Parent.
3. Must Remove from parent Benificiary.agentAccountList
4. Then Remove Benificiary Parent from agentAccount.parentBenificiaryAccountList
5. Optional, If Agent account balanceOf is zero (0), Agent account may be deleted.

Requirements to Delete Benificiary from Patron: (Delete Patron benificiariaship)
1. Require Benificiary to be Child of Patron
2. Require Benificiary to have no Parent Patrion balanceOf Token affiliation.
3. Require Benificiary to have no Child Agent affiliation
4. Remove associated child agents from Benificiary.agentAccountList
5. Remove from Account ParentKeys, account.benificiaryAccountList
6. Remove from Account.benificiaryMap, 
7. Optional, If Benificiary account balanceOf is zero (0), Benificiary account may be deleted.

Requirements to Delete Account
1. Require Account to have No Benificiarias, account.benificiaryAccountList must be zero (0).
2. Require Account to have No Agents, account.agentAccountList must be zero (0).
3. Optional, Require Account to have No Patrons account.patronAccountList must be zero (0).
4. Optional, Require Account to have No account.parentBenificiaryAccountList must be zero (0).
