'use strict'

const AkropolisExternalToken = artifacts.require('./AkropolisExternalToken.sol');
const PensionFundFactory = artifacts.require('./PensionFundFactory.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Pension Fund Factory', function ([owner, wallet]) {

	let factory, token;

	before(async function () {
		token = await AkropolisExternalToken.deployed();
		factory = await PensionFundFactory.new(token.address);
	});

	it('should create a Pension Fund', async function () {
		await factory.createPensionFund("FUND");
	});


});