async function main() {
    const [deployer] = await ethers.getSigners();

    const network = "https://sepolia.etherscan.io/address/";
  
    console.log("Deploying SPCoin contract with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Token = await ethers.getContractFactory("SPCoin");
    const token = await Token.deploy();
    // await token.init();

    console.log("Token address:", token.address);
    console.log("Token name:", await token.name());

    console.log("Contract Address:", network+token.address);
    console.log("Deployer Address:", network+deployer.address);

  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
