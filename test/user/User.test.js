'use strict'

const User = artifacts.require('./User.sol')
const Moment = require('moment');
const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('User', function ([]) {

	const DOB = Moment("1983-09-19");
	let user;

	it('should create a user', async function () {
		user = await User.new(DOB.unix());
		(await user.dateOfBirth()).should.be.bignumber.equal(DOB.unix());
	});

});