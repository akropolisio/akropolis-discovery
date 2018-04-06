'use strict'

const User = artifacts.require('./IndividualUser.sol');
const FundManagerRegistry = artifacts.require('./FundManagerRegistry.sol');
const PersonalDataOracle = artifacts.require('./PersonalDataOracle.sol');
const SavingsAccount = artifacts.require('./SavingsAccount.sol');
const SavingGoal = artifacts.require('./SavingGoal.sol');

const Moment = require('moment');
const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('User', function ([owner, userAccount]) {

	const DOB = Moment("1983-09-19");
	let user, registry, savingGoal, personalData;

	before(async function () {
		registry = await FundManagerRegistry.deployed();
		personalData = await PersonalDataOracle.deployed();
    savingGoal = await SavingGoal.new(65, 2200);
	});

	it('should create a user', async function () {
		user = await User.new(DOB.unix(), 0x0, savingGoal.address, personalData.address, {from:userAccount});
		(await user.getDateOfBirth()).should.be.bignumber.equal(DOB.unix());
		(await user.savingGoal()).should.be.equal(savingGoal.address);
	});

  it('should save saving goal', async function () {
    let savedGoal = SavingGoal.at(await user.savingGoal());

    (await savedGoal.age()).should.be.bignumber.equal(65);
    (await savedGoal.monthlyIncome()).should.be.bignumber.equal(2200);
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