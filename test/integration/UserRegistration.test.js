'use strict'

const Moment = require('moment');

const UserRegistry = artifacts.require('./UserRegistry.sol');
const User = artifacts.require('./User.sol');
const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const AETFaucet = artifacts.require('./AETFaucet.sol');


const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('User Registry', function ([owner, userAccount]) {

	const DOB = Moment("1983-09-19");

	let registry, user, token, faucet;

	before(async function () {
		registry = await UserRegistry.deployed();
		token = await AkropolisToken.deployed();
		faucet = await AETFaucet.new(token.address);
		token.mint(faucet.address, web3.toWei(1000000, "ether"));
	});

	it('should crate a user contract', async function () {
		await registry.createUser(DOB.unix(), {from: userAccount});
		user = User.at(await registry.getUserContract(userAccount));

		(await user.dateOfBirth()).should.be.bignumber.equal(DOB.unix());
	});

	it('should fund it with AET Tokens', async function () {
		await faucet.getTokens(user.address, {from: userAccount, value: web3.toWei(0.1, "ether")});

		(await token.balanceOf(user.address)).should.be.bignumber.equal(web3.toWei(100, "ether"));
	});


});