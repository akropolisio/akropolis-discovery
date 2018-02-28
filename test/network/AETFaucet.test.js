'use strict'

const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const AETFaucet = artifacts.require('./AETFaucet.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('AET Faucet', function ([owner, user]) {

	let token, faucet;

	before(async function () {
		token = await AkropolisToken.new();
		faucet = await AETFaucet.new(token.address);
		token.mint(faucet.address, web3.toWei(1000000, "ether"));
	});

	it('should grant tokens', async function () {
		await faucet.getTokens({from: user, value: web3.toWei(0.1, "ether")});

		(await token.balanceOf(user)).should.be.bignumber.equal(web3.toWei(100, "ether"));
	});

});