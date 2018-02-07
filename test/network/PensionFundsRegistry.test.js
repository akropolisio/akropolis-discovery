'use strict'

const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const StakingPool = artifacts.require('./StakingPool.sol');
const PensionFundsRegistry = artifacts.require('./PensionFundsRegistry.sol');
const PensionFund = artifacts.require('./PensionFund.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Pension Funds Registry', function ([owner]) {

	let registry, pool, token, fund;

	before(async function () {
		token = await AkropolisToken.new();
		pool = await StakingPool.new(token.address);
		registry = await PensionFundsRegistry.new(pool.address);
		fund = await PensionFund.new();

		await token.mint(fund.address, 100, {from: owner});
		(await token.balanceOf(fund.address)).should.be.bignumber.equal(100);
	});


	it('should set minimum stake', async function () {
		await registry.setMinStake(100, {from: owner});
		(await registry.minStake()).should.be.bignumber.equal(100);
	});


	it('should allow registering', async function () {
		await registry.register(fund.address, "FUND");
		(await registry.getFund("FUND")).should.be.equal(fund.address);
	});


	it('should allow unregistering by registry owner', async function () {
		await registry.unregister("FUND");
		(await registry.getFund("FUND")).should.be.bignumber.equal(0);
	});

});