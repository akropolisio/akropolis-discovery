'use strict'

const UserRegistry = artifacts.require('./UserRegistry.sol');
const Moment = require('moment');
const User = artifacts.require('./User.sol');


const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('User Registry', function ([owner, userAccount]) {

	const DOB = Moment("1983-09-19");

	let registry, user;

	before(async function () {
		user = await User.new(DOB.unix(), {from: userAccount});
		registry = await UserRegistry.new();
	});

	it('should register a user', async function () {
		await registry.registerUser(userAccount, user.address);
	});

	it('should return contract for a user address', async function () {
		var userContract = await registry.getUserContract(userAccount);
		userContract.should.be.equal(user.address);
	});

});