'use strict'

const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const StakingPool = artifacts.require('./StakingPool.sol');
const PensionFund = artifacts.require('./PensionFund.sol');
const FlatFeesCollector  = artifacts.require('./FlatFeesCollector.sol');
const DigitalUSD  = artifacts.require('./DigitalUSD.sol');
const Shares = artifacts.require('./Shares.sol');

const Moment = require('moment');
const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Pension Fund', function ([owner, wallet, savingAccount]) {

	let token, pool, fund, feesCollector, usd, shares;

	before(async function () {
		token = await AkropolisToken.new();
		pool = await StakingPool.new(token.address);
		fund = await PensionFund.new(token.address, "FUND");
		feesCollector = await FlatFeesCollector.new(token.address);
		usd = await DigitalUSD.new();
		shares = Shares.at(await fund.shares());

		fund.setFeesCollector(feesCollector.address);
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

	it('should accept investment and collect fees', async function () {
		await usd.mint(wallet, 100, {from: owner});
		(await usd.balanceOf(wallet)).should.be.bignumber.equal(100);

		await token.mint(wallet, 100, {from: owner});
		(await token.balanceOf(wallet)).should.be.bignumber.equal(100);

		await token.approve(feesCollector.address, 1, {from: wallet});
		await usd.approve(fund.address, 100, {from: wallet});

		//No shares before the investment
		(await shares.balanceOf(savingAccount)).should.be.bignumber.equal(0);

		await fund.investFromUser(usd.address, 100, savingAccount, {from: wallet});

		//Should issue shares after the investment


		(await token.balanceOf(fund.address)).should.be.bignumber.equal(101);
		(await token.balanceOf(wallet)).should.be.bignumber.equal(99);
		(await usd.balanceOf(fund.address)).should.be.bignumber.equal(100);
		(await usd.balanceOf(wallet)).should.be.bignumber.equal(0);
	});

});