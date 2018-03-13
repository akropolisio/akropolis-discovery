'use strict'

const User = artifacts.require('./User.sol');
const PensionFundsRegistry = artifacts.require('./PensionFundsRegistry.sol');
const SavingsAccount = artifacts.require('./SavingsAccount.sol');

const Moment = require('moment');
const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('User', function ([owner, userAccount]) {

	const DOB = Moment("1983-09-19");
	let user, registry;

	before(async function () {
		registry = await PensionFundsRegistry.deployed();
	});

	it('should create a user', async function () {
		user = await User.new(DOB.unix(), 0x0, {from:userAccount});
		(await user.dateOfBirth()).should.be.bignumber.equal(DOB.unix());
	});

	it('should open a saving account', async function () {
		await user.openSavingAccount("FIRST", {from: userAccount});
	  var accountAddress = await user.getSavingAccountByName("FIRST");
	  var account = await SavingsAccount.at(accountAddress);

		(await user.getSavingAccountsCount()).should.be.bignumber.equal(1);
		(await account.owner()).should.be.equal(user.address);
	});

	it('should create a 3 pot system', async function () {
		await user.createDefaultAccounts({from: userAccount});

		(await user.getSavingAccountsCount()).should.be.bignumber.equal(4);
	});

});