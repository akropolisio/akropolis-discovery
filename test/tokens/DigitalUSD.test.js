'use strict';

const DigitalUSD = artifacts.require('./DigitalUSD.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should()

contract('DigitalUSD Token', function ([owner, holder]) {

	let token;

	before(async function () {
		token = await DigitalUSD.new()
	});


	it('should have the correct setup', async function () {
		(await token.name()).should.be.equal("Digital USD");
		(await token.decimals()).should.be.bignumber.equal(18);
		(await token.symbol()).should.be.equal("dUSD");
		(await token.version()).should.be.equal("dUSD 1.0");
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