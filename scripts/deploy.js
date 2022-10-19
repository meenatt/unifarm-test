const hre = require("hardhat");

async function main() {
  const UniFarmTestFactory = await hre.ethers.getContractFactory("UniFarmTest");
  const uniFarmTest = await UniFarmTestFactory.deploy();

  await uniFarmTest.deployed();

  console.log(uniFarmTest.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
