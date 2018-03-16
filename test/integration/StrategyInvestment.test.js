'use strict'

const Moment = require('moment');

const User = artifacts.require('./User.sol');
const UserRegistry = artifacts.require('./UserRegistry.sol');
const FundRegistry = artifacts.require('./PensionFundsRegistry.sol');
const PensionFund = artifacts.require('./PensionFund.sol');
const PaymentGateway = artifacts.require('./PaymentGateway.sol');
const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const Wallet = artifacts.require('./Wallet.sol');
const SavingsAccount = artifacts.require('./SavingsAccount.sol');
const DigitalUSD = artifacts.require('./DigitalUSD.sol');
const InvestmentStrategy = artifacts.require('./InvestmentStrategy.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Investment with strategy scenario', function ([owner, userAccount, fund1Account, fund2Account]) {

	const DOB = Moment("1983-09-19");

	let userRegistry, user, fundRegistry, fund1, fund2, aet, usd, savingsAccount;

	before(async function () {
		userRegistry = await UserRegistry.deployed();
		fundRegistry = await FundRegistry.deployed();
		aet = await AkropolisToken.deployed();
		var paymentGateway = await PaymentGateway.deployed();
		usd = DigitalUSD.at(await paymentGateway.usdToken());
	});


	it('should create a user', async function () {
		await userRegistry.createUser(DOB.unix(), 65, 2200, {from: userAccount});
		user = User.at(await userRegistry.getUserContract(userAccount));
		var walletAddress = await user.wallet();
		await aet.mint(walletAddress, web3.toWei(100, "ether"), {from: owner});
		await user.createDefaultAccounts({from: userAccount});
		savingsAccount = SavingsAccount.at(await user.getSavingAccountByName("VOLUNTARY"));

		(await user.dateOfBirth()).should.be.bignumber.equal(DOB.unix());
		(await user.owner()).should.be.equal(userAccount);
		(await user.getSavingAccountsCount()).should.be.bignumber.equal(3);
	});


	it('should create first pension fund', async function () {
		await aet.mint(fund1Account, web3.toWei(100, "ether"), {from: owner});
		await aet.approve(fundRegistry.address, web3.toWei(100, "ether"), {from: fund1Account});
		await fundRegistry.createAndRegisterPensionFund("FUND_1", {from: fund1Account});
		fund1 = PensionFund.at(await fundRegistry.getFund("FUND_1"));

		(await fund1.owner()).should.be.equal(fund1Account);
	});


	it('should create second pension fund', async function () {
		await aet.mint(fund2Account, web3.toWei(100, "ether"), {from: owner});
		await aet.approve(fundRegistry.address, web3.toWei(100, "ether"), {from: fund2Account});
		await fundRegistry.createAndRegisterPensionFund("FUND_2", {from: fund2Account});
		fund2 = PensionFund.at(await fundRegistry.getFund("FUND_2"));

		(await fund2.owner()).should.be.equal(fund2Account);
	});


	it('should create investment strategy', async function () {
		await user.createFixedAllocationInvestmentStrategy(["FUND_1", "FUND_2"], [80, 20], {from: userAccount});
		var strategy = InvestmentStrategy.at(await user.investmentStrategy());

		(await strategy.getNumberOfRecommendations()).should.be.bignumber.equal(2);
	});


	it('should invest and get shares', async function () {
		var wallet = Wallet.at(await user.wallet());
		(await wallet.balance(aet.address)).should.be.bignumber.equal(web3.toWei(100, "ether"));

		await user.invest(100, "VOLUNTARY", {from: userAccount});

		(await wallet.balance(aet.address)).should.be.bignumber.equal(web3.toWei(98, "ether"));
		(await savingsAccount.totalValue(usd.address)).should.be.bignumber.equal(100);
	});


});