'use strict'

const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const DigitalUSD = artifacts.require('./DigitalUSD.sol');
const StakingPool = artifacts.require('./StakingPool.sol');
const PensionFundsRegistry = artifacts.require('./PensionFundsRegistry.sol');
const PensionFund = artifacts.require('./PensionFund.sol');
const Wallet = artifacts.require('./Wallet.sol');
const PaymentGateway = artifacts.require('./PaymentGateway.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Wallet', function ([owner]) {

	let registry, pool, token, fund, usd, wallet, paymentGateway;

	before(async function () {
		token = await AkropolisToken.new();
		pool = await StakingPool.new(token.address);
		registry = await PensionFundsRegistry.new(token.address, pool.address);
		fund = await PensionFund.new(token.address, "FUND");
		paymentGateway = await PaymentGateway.new();
		usd = DigitalUSD.at(await paymentGateway.usdToken());
	});


	it('should register fund', async function () {
		await token.mint(fund.address, 100, {from: owner});
		await registry.setMinStake(100, {from: owner});
		await fund.stake(pool.address, 100);
		await fund.register(registry.address);

		(await registry.getFund("FUND")).should.be.equal(fund.address);
	});


	it('should create a wallet and fund it with fiat tokens', async function () {
		wallet = await Wallet.new(registry.address, paymentGateway.address);
		await wallet.makeDeposit(100);

		(await usd.balanceOf(wallet.address)).should.be.bignumber.equal(100);
	});


});