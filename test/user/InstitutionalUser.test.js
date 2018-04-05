'use strict'

const InstitutionalUser = artifacts.require('./InstitutionalUser.sol');
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

contract('User', function ([owner, institutionAccount, userAccount]) {

	let institution, registry, savingGoal;

	before(async function () {
		registry = await FundManagerRegistry.deployed();
		savingGoal = await SavingGoal.new(65, 2200);
	});

	it('should create an institutional user', async function () {
		institution = await InstitutionalUser.new(0x0, savingGoal.address, {from: institutionAccount});

		(await institution.savingGoal()).should.be.equal(savingGoal.address);
	});

	it('should save saving goal', async function () {
		let savedGoal = SavingGoal.at(await institution.savingGoal());

		(await savedGoal.age()).should.be.bignumber.equal(65);
		(await savedGoal.monthlyIncome()).should.be.bignumber.equal(2200);
	});


	it('should register a new user', async function () {
		await institution.registerUser(userAccount, {from: institutionAccount});

		(await institution.getSavingAccountsCount(userAccount)).should.be.bignumber.equal(3);
	});

});