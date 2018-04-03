'use strict'

const AkropolisExternalToken = artifacts.require('./AkropolisExternalToken.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Akropolis External Token', function ([owner, holder]) {

	let token;

	beforeEach(async function () {
		token = await AkropolisExternalToken.new()
	});


	it('should have the correct setup', async function () {
		(await token.name()).should.be.equal("Akropolis External Token");
		(await token.decimals()).should.be.bignumber.equal(18);
		(await token.symbol()).should.be.equal("AET");
		(await token.version()).should.be.equal("AET 1.0");
	});


	it('should allow minting', async function () {
		await token.mint(holder, 100, {from: owner});

		(await token.balanceOf(holder)).should.be.bignumber.equal(100);
	});

});