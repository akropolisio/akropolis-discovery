'use strict'

const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const StakingPool = artifacts.require('./StakingPool.sol');
const PensionFund = artifacts.require('./PensionFund.sol');

const Moment = require('moment');
const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Pension Fund', function ([owner]) {

	let token, pool, fund;

	before(async function () {
		token = await AkropolisToken.new();
		pool = await StakingPool.new(token.address);
		fund = await PensionFund.new(token.address);

		await token.mint(fund.address, 100, {from: owner});
		(await token.balanceOf(fund.address)).should.be.bignumber.equal(100);
	});


	it('should stake to a poll', async function () {
		await fund.stake(pool.address, 100, {from: owner});

		(await token.balanceOf(fund.address)).should.be.bignumber.equal(0);
		(await token.balanceOf(pool.address)).should.be.bignumber.equal(100);
		(await pool.getStake(fund.address)).should.be.bignumber.equal(100);
	});


	it('should withdraw a stake', async function () {
		await fund.withdrawStake(pool.address, {from: owner});

		(await token.balanceOf(fund.address)).should.be.bignumber.equal(100);
		(await token.balanceOf(pool.address)).should.be.bignumber.equal(0);
		(await pool.getStake(fund.address)).should.be.bignumber.equal(0);
	});

});