'use strict'

const AkropolisExternalToken = artifacts.require('./AkropolisExternalToken.sol');
const StakingPool = artifacts.require('./StakingPool.sol');
const FundManagerRegistry = artifacts.require('./FundManagerRegistry.sol');
const ComplianceOracle = artifacts.require('./ComplianceOracle.sol');
const FundManager = artifacts.require('./FundManager.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Fund Managers Registry', function ([owner]) {

	let registry, pool, token, fund, compliance;

	before(async function () {
		token = await AkropolisExternalToken.new();
		pool = await StakingPool.new(token.address);
		compliance = await ComplianceOracle.new();
		registry = await FundManagerRegistry.new(token.address, pool.address, compliance.address);
		fund = await FundManager.new(token.address, "FUND");

		await token.mint(fund.address, 100, {from: owner});
		(await token.balanceOf(fund.address)).should.be.bignumber.equal(100);
	});


	it('should set minimum stake', async function () {
		await registry.setMinStake(100, {from: owner});
		(await registry.minStake()).should.be.bignumber.equal(100);
	});


	it('should NOT allow registering without staking', async function () {
		await fund.register(registry.address).should.be.rejectedWith('revert');
	});


	it('should allow registering', async function () {
		await fund.stake(pool.address, 100);
		await fund.register(registry.address);
		(await registry.getFund("FUND")).should.be.equal(fund.address);
	});


	it('should allow unregistering by pension fund', async function () {
		await fund.unregister(registry.address);
		(await registry.getFund("FUND")).should.be.bignumber.equal(0);
	});


	it('should allow unregistering by the owner', async function () {
		await fund.register(registry.address);

		await registry.unregister("FUND");
		(await registry.getFund("FUND")).should.be.bignumber.equal(0);
	});


	it('should create and register fund', async function () {
		await token.mint(owner, 100, {from: owner});
		await token.approve(registry.address, 100, {from: owner});
		await registry.createAndRegisterFundManager("CREATED", {from: owner});

		var fundAddress = await registry.getFund("CREATED");
		var fund = await FundManager.at(fundAddress);

		(await fund.owner()).should.be.equal(owner);
		(await fund.aet()).should.be.equal(token.address);

	});

});