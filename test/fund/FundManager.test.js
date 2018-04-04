'use strict'

const AkropolisExternalToken = artifacts.require('./AkropolisExternalToken.sol');
const StakingPool = artifacts.require('./StakingPool.sol');
const FundManager = artifacts.require('./FundManager.sol');
const FlatFeesCollector  = artifacts.require('./FlatFeesCollector.sol');
const AkropolisInternalToken  = artifacts.require('./AkropolisInternalToken.sol');
const Shares = artifacts.require('./Shares.sol');

const Moment = require('moment');
const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Fund Manager', function ([owner, wallet, savingAccount]) {

	let token, pool, fund, feesCollector, ait, shares;

	before(async function () {
		token = await AkropolisExternalToken.new();
		pool = await StakingPool.new(token.address);
		fund = await FundManager.new(token.address, "FUND");
		feesCollector = await FlatFeesCollector.new(token.address);
		ait = await AkropolisInternalToken.new();
		shares = Shares.at(await fund.shares());

		fund.setFeesCollector(feesCollector.address);
		await token.mint(fund.address, web3.toWei(100, "ether"), {from: owner});
		(await token.balanceOf(fund.address)).should.be.bignumber.equal(web3.toWei(100, "ether"));

	});


	it('should stake to a poll', async function () {
		await fund.stake(pool.address, web3.toWei(100, "ether"), {from: owner});

		(await token.balanceOf(fund.address)).should.be.bignumber.equal(0);
		(await token.balanceOf(pool.address)).should.be.bignumber.equal(web3.toWei(100, "ether"));
		(await pool.getStake(fund.address)).should.be.bignumber.equal(web3.toWei(100, "ether"));
	});


	it('should withdraw a stake', async function () {
		await fund.withdrawStake(pool.address, {from: owner});

		(await token.balanceOf(fund.address)).should.be.bignumber.equal(web3.toWei(100, "ether"));
		(await token.balanceOf(pool.address)).should.be.bignumber.equal(0);
		(await pool.getStake(fund.address)).should.be.bignumber.equal(0);
	});

	it('should accept investment and collect fees', async function () {
		await ait.mint(wallet, 100, {from: owner});
		(await ait.balanceOf(wallet)).should.be.bignumber.equal(100);

		await token.mint(wallet, web3.toWei(100, "ether"), {from: owner});
		(await token.balanceOf(wallet)).should.be.bignumber.equal(web3.toWei(100, "ether"));

		await token.approve(feesCollector.address, web3.toWei(100, "ether"), {from: wallet});
		await ait.approve(fund.address, 100, {from: wallet});

		//No shares before the investment
		(await shares.balanceOf(savingAccount)).should.be.bignumber.equal(0);

		await fund.investFromUser(ait.address, 100, savingAccount, {from: wallet});

		//Should issue shares after the investment

		(await token.balanceOf(fund.address)).should.be.bignumber.equal(web3.toWei(101, "ether"));
		(await token.balanceOf(wallet)).should.be.bignumber.equal(web3.toWei(99, "ether"));
		(await ait.balanceOf(fund.address)).should.be.bignumber.equal(100);
		(await ait.balanceOf(wallet)).should.be.bignumber.equal(0);
	});

});