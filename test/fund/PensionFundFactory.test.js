'use strict'

const AkropolisExternalToken = artifacts.require('./AkropolisExternalToken.sol');
const FundManagerFactory = artifacts.require('./FundManagerFactory.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Pension Fund Factory', function ([owner, wallet]) {

	let factory, token;

	before(async function () {
		token = await AkropolisExternalToken.deployed();
		factory = await FundManagerFactory.new(token.address);
	});

	it('should create a Pension Fund', async function () {
		await factory.createFundManager("FUND");
	});


});