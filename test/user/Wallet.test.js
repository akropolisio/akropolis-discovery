'use strict'

const AkropolisExternalToken = artifacts.require('./AkropolisExternalToken.sol');
const AkropolisInternalToken = artifacts.require('./AkropolisInternalToken.sol');
const StakingPool = artifacts.require('./StakingPool.sol');
const FundManagerRegistry = artifacts.require('./FundManagerRegistry.sol');
const FundManager = artifacts.require('./FundManager.sol');
const Wallet = artifacts.require('./Wallet.sol');
const PaymentGateway = artifacts.require('./PaymentGateway.sol');
const ComplianceOracle = artifacts.require('./ComplianceOracle.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Wallet', function ([owner]) {

	let registry, pool, token, fund, ait, wallet, paymentGateway, compliance;

	before(async function () {
		token = await AkropolisExternalToken.new();
		pool = await StakingPool.new(token.address);
		compliance = await ComplianceOracle.new();
		registry = await FundManagerRegistry.new(token.address, pool.address, compliance.address);
		fund = await FundManager.new(token.address, "FUND");
		paymentGateway = await PaymentGateway.new();
		ait = AkropolisInternalToken.at(await paymentGateway.ait());
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

		(await ait.balanceOf(wallet.address)).should.be.bignumber.equal(100);
	});


});