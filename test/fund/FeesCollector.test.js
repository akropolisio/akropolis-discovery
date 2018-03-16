'use strict'

const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const StakingPool    = artifacts.require('./StakingPool.sol');
const PensionFund    = artifacts.require('./PensionFund.sol');
const FlatFeesCollector  = artifacts.require('./FlatFeesCollector.sol');
const DigitalUSD = artifacts.require('./DigitalUSD.sol');

const Moment = require('moment');
const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Fees collector', function ([owner, wallet, fund]) {

	let token, feesCollector, usd;

	before(async function () {
		token = await AkropolisToken.new();
		feesCollector = await FlatFeesCollector.new(token.address);
		usd = await DigitalUSD.new();

		await token.mint(wallet, web3.toWei(100, "ether"), {from: owner});
		(await token.balanceOf(wallet)).should.be.bignumber.equal(web3.toWei(100, "ether"));
	});


	it('should calculate fees for investment', async function () {
		var fees = await feesCollector.calculateInvestmentFee(usd.address, web3.toWei(100, "ether"));
		(fees.should.be.bignumber.equal(web3.toWei(1, "ether")));
	});


	it('should collect fees for investment', async function () {
		token.approve(feesCollector.address, web3.toWei(100, "ether"), {from: wallet});
		await feesCollector.collectInvestmentFee(wallet, usd.address, web3.toWei(100, "ether"), {from: fund});

		(await token.balanceOf(wallet)).should.be.bignumber.equal(web3.toWei(99, "ether"));
		(await token.balanceOf(fund)).should.be.bignumber.equal(web3.toWei(1, "ether"));
	});




});