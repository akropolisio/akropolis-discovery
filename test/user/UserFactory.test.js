'use strict'

const Moment = require('moment');

const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const DigitalUSD = artifacts.require('./DigitalUSD.sol');
const StakingPool = artifacts.require('./StakingPool.sol');
const PensionFundsRegistry = artifacts.require('./PensionFundsRegistry.sol');
const Wallet = artifacts.require('./Wallet.sol');
const PaymentGateway = artifacts.require('./PaymentGateway.sol');
const UserFactory = artifacts.require('./UserFactory.sol');
const User = artifacts.require('./User.sol');
const UserRegistry = artifacts.require('./UserRegistry.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('User Factory', function ([owner, userAccount]) {

	const DOB = Moment("1983-09-19");

	let registry, pool, token, factory, usd, wallet, paymentGateway, user;

	before(async function () {
		token = await AkropolisToken.new();
		pool = await StakingPool.new(token.address);
		registry = await PensionFundsRegistry.new(pool.address);
		paymentGateway = await PaymentGateway.new();
		usd = await DigitalUSD.at(await paymentGateway.usdToken());
		factory = await UserFactory.new(registry.address, paymentGateway.address);
	});


	it('should create a user', async function () {
		await factory.createUser(DOB.unix(), {from: userAccount});
		var userRegistry = UserRegistry.at(await factory.userRegistry());
		user = User.at(await userRegistry.getUserContract(userAccount));

		(await user.dateOfBirth()).should.be.bignumber.equal(DOB.unix());
	});


});