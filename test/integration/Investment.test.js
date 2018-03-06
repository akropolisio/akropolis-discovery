'use strict'

const Moment = require('moment');

const User = artifacts.require('./User.sol');
const UserRegistry = artifacts.require('./UserRegistry.sol');
const FundRegistry = artifacts.require('./PensionFundsRegistry.sol');
const PensionFund = artifacts.require('./PensionFund.sol');
const AkropolisToken = artifacts.require('./AkropolisToken.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Investment', function ([owner, userAccount, fundAccount]) {

	const DOB = Moment("1983-09-19");

	let userRegistry, user, fundRegistry, fund, aet;

	before(async function () {
		userRegistry = await UserRegistry.deployed();
		fundRegistry = await FundRegistry.deployed();
		aet = await AkropolisToken.deployed();
	});


	it('should create a user', async function () {
		await userRegistry.createUser(DOB.unix(), {from: userAccount});
		user = User.at(await userRegistry.getUserContract(userAccount));

		(await user.dateOfBirth()).should.be.bignumber.equal(DOB.unix());
		(await user.owner()).should.be.equal(userAccount);
	});


	it('should create a pension fund', async function () {
		await aet.mint(fundAccount, 100, {from: owner});
		await aet.approve(fundRegistry.address, 100, {from: fundAccount});
		await fundRegistry.createAndRegisterPensionFund("FUND", {from: fundAccount});
		fund = PensionFund.at(await fundRegistry.getFund("FUND"));

		(await fund.owner()).should.be.equal(fundAccount);
	});


});