# dev-contracts-spCoin

// TESTING

// VISUAL STUDIO CODE INSTALL PLUGIN
Nomic Foundation

// INSTALLING HARDHAT
npm install --save-dev hardhat

//REQUIRED SUPPORT PACKAGES
"@nomicfoundation/hardhat-toolbox": "^2.0.1"
npm install --save-dev @nomicfoundation/hardhat-toolbox
npm install --save-dev @nomiclabs/hardhat-waffle 'ethereum-waffle@^3.0.0' @nomiclabs/hardhat-ethers 'ethers@^5.0.0'

Add the following code snippet at the top of your hardhat.config.js file
require("@nomiclabs/hardhat-waffle");

npm audit fix --force

// IMPORTANT HARDHAT GLOBAL COMMANDS
npx hardhat help

dataStructureModel Level
SPCoin
  Token
      Staking Manager
        Transactions
          Rates
            Agents
              Sponsors
                Accounts

To Add a Sponsor Account Agent, add the following:
Add a Rate Record to Agent

Using: addNetworkAccounts(Account, Sponsor, [Agents])
Example: addNetworkAccounts(1, 2, [6]); 

Add a Rate Record to Sponsor
================================================
Create:  AddSponsorRate(Account, Sponsor, SponsorRatePercent);
Example: AddSponsorRate(1, 2, 10);

Add a Rate Record to Sponsor
================================================
Create: AddAgentRate(Account, Sponsor, Agent, SponsorRatePercent, AgentRatePercent);
Example: AddAgentRate(1, 2, 6, 10, 10);

Add a Sponsor Transaction
================================================
Create AddSponsorTransaction(Account, Sponsor, SponsorRate, amount);
Example: AddSponsorTransaction(1, 2, 10, 123.1230);

Add aa Agent Transaction
================================================
Create AddAgentRateTransaction(Account, Sponsor, SponsorRate, Agent, AgentRate, Amount)
Example: AddAgentRate(1, 2, 6, 10, 10, 123.1230);
