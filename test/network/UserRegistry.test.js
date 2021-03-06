'use strict'

const Moment = require('moment');

const User = artifacts.require('./IndividualUser.sol');
const UserRegistry = artifacts.require('./UserRegistry.sol');
const SavingGoal = artifacts.require('./SavingGoal.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('User Registry', function ([owner, userAccount]) {

	const DOB = Moment("1983-09-19");

	let registry, user;

	before(async function () {
		registry = await UserRegistry.deployed();
	});


	it('should create a user', async function () {
		await registry.createUser(DOB.unix(), 65, 2200, {from: userAccount});
		// user = User.at(await registry.getUserContract(userAccount));
		// let savingGoal = SavingGoal.at(await user.savingGoal());
		//
		// (await user.dateOfBirth()).should.be.bignumber.equal(DOB.unix());
		// (await savingGoal.age()).should.be.bignumber.equal(65);
		// (await savingGoal.monthlyIncome()).should.be.bignumber.equal(2200);
	});

	it('should remove a user', async function () {
		await registry.removeSelf({from: userAccount});
		var userAddress = await registry.getUserContract(userAccount);

		(userAddress).should.be.equal("0x0000000000000000000000000000000000000000");
	});


});