const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UniFarmTest", function () {
  let uniFarmTestContract;
  let owner, user1, user2, user3, user4;
  const PRECISION = 1e12;

  beforeEach(async () => {
    [owner, user1, user2, user3, user4] = await ethers.getSigners();
    const UniFarmTestFactory = await hre.ethers.getContractFactory(
      "UniFarmTest"
    );
    uniFarmTestContract = await UniFarmTestFactory.deploy();
  });

  it("should write an integer to the contract", async () => {
    await uniFarmTestContract.connect(user1).addNum(1 * PRECISION);
    const summary = await uniFarmTestContract.getSummary();
    expect(summary[1].toNumber() / PRECISION).to.equal(1);
  });

  it("should write multiple integers to the contract", async () => {
    await uniFarmTestContract.connect(user1).addNum(1 * PRECISION);
    await uniFarmTestContract.connect(user2).addNum(5 * PRECISION);
    await uniFarmTestContract.connect(user3).addNum(15 * PRECISION);
    const summary = await uniFarmTestContract.getSummary();
    expect(summary[1].toNumber() / PRECISION).to.equal(21);
  });

  it("should write a float to the contract", async () => {
    await uniFarmTestContract.connect(user1).addNum(1.11 * PRECISION);
    const summary = await uniFarmTestContract.getSummary();
    expect(summary[1].toNumber() / PRECISION).to.equal(1.11);
  });

  it("should write multiple floats to the contract", async () => {
    await uniFarmTestContract.connect(user1).addNum(1.11 * PRECISION);
    await uniFarmTestContract.connect(user1).addNum(2.5 * PRECISION);
    await uniFarmTestContract.connect(user1).addNum(6.92018292 * PRECISION);
    const summary = await uniFarmTestContract.getSummary();
    expect(summary[1].toNumber() / PRECISION).to.equal(10.53018292);
  });

  it("should show correct number of users", async () => {
    await uniFarmTestContract.connect(user1).addNum(1.11 * PRECISION);
    await uniFarmTestContract.connect(user1).addNum(8.0 * PRECISION);
    await uniFarmTestContract.connect(user1).addNum(12.9 * PRECISION);
    await uniFarmTestContract.connect(user1).addNum(2 * PRECISION);
    await uniFarmTestContract.connect(user2).addNum(2.5 * PRECISION);
    await uniFarmTestContract.connect(user3).addNum(1.201292 * PRECISION);
    await uniFarmTestContract.connect(user3).addNum(7.92 * PRECISION);
    const summary = await uniFarmTestContract.getSummary();
    expect(summary[0].toNumber()).to.equal(3);
  });
});
