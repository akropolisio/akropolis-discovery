'use strict'

const Moment = require('moment');

const User = artifacts.require('./User.sol');
const UserRegistry = artifacts.require('./UserRegistry.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Investment', function ([owner, userAccount]) {

	const DOB = Moment("1983-09-19");

	let registry, user;

	before(async function () {
		registry = await UserRegistry.deployed();
	});


	it('should create a user', async function () {
		await registry.createUser(DOB.unix(), {from: userAccount});
		user = User.at(await registry.getUserContract(userAccount));

		(await user.dateOfBirth()).should.be.bignumber.equal(DOB.unix());
	});


});