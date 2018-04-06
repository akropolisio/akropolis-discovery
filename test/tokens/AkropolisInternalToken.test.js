'use strict';

const AkropolisInternalToken = artifacts.require('./AkropolisInternalToken.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('AkropolisInternalToken Token', function ([owner, holder]) {

	let token;

	before(async function () {
		token = await AkropolisInternalToken.new()
	});


	it('should have the correct setup', async function () {
		(await token.name()).should.be.equal("Akropolis Internal Token");
		(await token.decimals()).should.be.bignumber.equal(2);
		(await token.symbol()).should.be.equal("AIT");
		(await token.version()).should.be.equal("AIT 1.0");
	});


	it('should allow minting', async function () {
		await token.mint(holder, 100, {from: owner});

		(await token.balanceOf(holder)).should.be.bignumber.equal(100);
	});


	it('should allow burning', async function () {
		await token.burn(holder, 100, {from: owner});

		(await token.balanceOf(holder)).should.be.bignumber.equal(0);
	});


	it('should not allow burning by holder', async function () {
		await token.burn(holder, 100, {from: holder}).should.be.rejectedWith('revert');
	});

});