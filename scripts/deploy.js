// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const SimpleNFT = await hre.ethers.getContractFactory("SimpleNFT");
  console.log("Deploying SimpleNFT...");

  const simpleNFT = await SimpleNFT.deploy();
  await simpleNFT.waitForDeployment(); // Ganti dari .deployed()

  const address = await simpleNFT.getAddress();
  console.log(`SimpleNFT deployed to: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
