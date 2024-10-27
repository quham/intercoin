
const { expect } = require("chai");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const hardhatToken = await ethers.deployContract("Africoin");

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
  it("Update Asset Reserves should be updated to new value", async function () {
    const [owner] = await ethers.getSigners();

    const token = await ethers.deployContract("Africoin");
    // expect(await token.updateReserve(1000)).to.equal(1000);
    const context = '{\"contextAddress\":\"user\'s address\",\"contextMessage\":\"for acmecorp.com on 1st january\",\"extractedParameters\":{\"AAPL_quantity\":"50.87",\"WMT_quantity\":\"100.0\"},\"providerHash\":\"0xbe30d812f5fee9117c11b50d6c23b07446ac2e273f99410ae544150e1c9a7c11\"}';
    await token.updateReserve(context);
    expect(await token.getVerifiedReserve("AAPL")).to.equal(50);
    expect(await token.getVerifiedReserve("WMT")).to.equal(100);


    
  });
  it("String conversion", async function () {
    const [owner] = await ethers.getSigners();

    const token = await ethers.deployContract("Africoin");
    expect(await token.stringToTruncatedUint("1000")).to.equal(1000);

    
  });
  it("Reserve should be updated to new value", async function () {
    const [owner] = await ethers.getSigners();

    const token = await ethers.deployContract("Africoin");
    await token.setCoinAllocation("AAPL", 1000);
    await token.setCoinAllocation("WMT", 50);
    console.log(await token.getCoinAllocation("AAPL"));
    // console.log(await token.assetTickers());
    // console.log(await token.coinAllocation());
    expect(await token.getCoinAllocation("AAPL") ).to.equal(1000);

    
  });
  it("Extraction", async function () {
    const [owner] = await ethers.getSigners();

    const token = await ethers.deployContract("Africoin");
    const context = '{\"contextAddress\":\"user\'s address\",\"contextMessage\":\"for acmecorp.com on 1st january\",\"extractedParameters\":{\"AAPL_quantity\":"50.87",\"WMT_quantity\":\"100.0\"},\"providerHash\":\"0xbe30d812f5fee9117c11b50d6c23b07446ac2e273f99410ae544150e1c9a7c11\"}';
    const asset = "AAPL";
    const target = await token.getTarget(asset);
    const x = await token.extractFieldFromContext(context, target);
    console.log(x);
    console.log(await token.stringToTruncatedUint(x));
    // await token.setCoinAllocation("WMT", 50);
    // console.log(await token.getCoinAllocation("AAPL"));
    // console.log(await token.assetTickers());
    // console.log(await token.coinAllocation());
    // expect(await token.stringToUint("1000")).to.equal(1000);

    
  });
  it("Can burn", async function () {
    const [owner] = await ethers.getSigners();

    const token = await ethers.deployContract("Africoin");
    const context = '{\"contextAddress\":\"user\'s address\",\"contextMessage\":\"for acmecorp.com on 1st january\",\"extractedParameters\":{\"AAPL_quantity\":"50.87",\"WMT_quantity\":\"100.0\"},\"providerHash\":\"0xbe30d812f5fee9117c11b50d6c23b07446ac2e273f99410ae544150e1c9a7c11\"}';
    await token.updateReserve(context);

    const x = await token.totalSupply();
    console.log(x)
    // await token.mint(owner.address, 1000);
    await token.burn(owner.address, 1000);
    const ownerBalance = await token.balanceOf(owner.address);
    console.log(ownerBalance);
    // console.log(x - 1000);
    console.log(await token.totalSupply());
    // expect(await hardhatToken.totalSupply()).to.equal(x - 1000);
  });

//   it("mint", async function () {
//     const [owner] = await ethers.getSigners();

//     const token = await ethers.deployContract("Africoin");
//     expect(await token.updateReserve(1000)).to.equal(1000);
//     console.log(token.verifiedReserve);
//     // expect(1000).to.equal(await token.verifiedReserve());

    
//   });
});