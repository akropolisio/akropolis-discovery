'use strict'

const Moment = require('moment');

const User = artifacts.require('./IndividualUser.sol');
const UserRegistry = artifacts.require('./UserRegistry.sol');
const FundRegistry = artifacts.require('./FundManagerRegistry.sol');
const FundManager = artifacts.require('./FundManager.sol');
const PaymentGateway = artifacts.require('./PaymentGateway.sol');
const AkropolisExternalToken = artifacts.require('./AkropolisExternalToken.sol');
const Wallet = artifacts.require('./Wallet.sol');
const SavingsAccount = artifacts.require('./SavingsAccount.sol');
const AkropolisInternalToken = artifacts.require('./AkropolisInternalToken.sol');
const InvestmentStrategy = artifacts.require('./InvestmentStrategy.sol');
const ComplianceOracle = artifacts.require('./ComplianceOracle.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Investment with strategy scenario', function ([owner, userAccount, fund1Account, fund2Account]) {

	const DOB = Moment("1983-09-19");

	let userRegistry, user, fundRegistry, fund1, fund2, aet, ait, savingsAccount, compliance;

	before(async function () {
		userRegistry = await UserRegistry.deployed();
		fundRegistry = await FundRegistry.deployed();
		compliance = await ComplianceOracle.deployed();
		aet = await AkropolisExternalToken.deployed();
		var paymentGateway = await PaymentGateway.deployed();
		ait = AkropolisInternalToken.at(await paymentGateway.ait());
	});


	it('should create a user', async function () {
		await userRegistry.createUser(DOB.unix(), 65, 2200, {from: userAccount});
		user = User.at(await userRegistry.getUserContract(userAccount));
		var walletAddress = await user.wallet();
		await aet.mint(walletAddress, web3.toWei(100, "ether"), {from: owner});

		(await user.getDateOfBirth()).should.be.bignumber.equal(DOB.unix());
		(await user.owner()).should.be.equal(userAccount);
	});


	it('should create first pension fund', async function () {
		await aet.mint(fund1Account, web3.toWei(100, "ether"), {from: owner});
		await aet.approve(fundRegistry.address, web3.toWei(100, "ether"), {from: fund1Account});
		await fundRegistry.createAndRegisterFundManager("FUND_1", {from: fund1Account});
		await compliance.approveLicense("FUND_1");

		fund1 = FundManager.at(await fundRegistry.getFund("FUND_1"));

		(await fund1.owner()).should.be.equal(fund1Account);
	});


	it('should create second pension fund', async function () {
		await aet.mint(fund2Account, web3.toWei(100, "ether"), {from: owner});
		await aet.approve(fundRegistry.address, web3.toWei(100, "ether"), {from: fund2Account});
		await fundRegistry.createAndRegisterFundManager("FUND_2", {from: fund2Account});
		await compliance.approveLicense("FUND_2");

		fund2 = FundManager.at(await fundRegistry.getFund("FUND_2"));

		(await fund2.owner()).should.be.equal(fund2Account);
	});


	it('should create saving accounts and investment strategy', async function () {
		await user.createAccountsWithFixedStrategy(["FUND_1", "FUND_2"], [80, 20], {from: userAccount});
		var strategy = InvestmentStrategy.at(await user.investmentStrategy());
		savingsAccount = SavingsAccount.at(await user.getSavingAccountByName("VOLUNTARY"));

		(await strategy.getNumberOfRecommendations()).should.be.bignumber.equal(2);
		(await user.getSavingAccountsCount()).should.be.bignumber.equal(3);
	});


	it('should invest and get shares', async function () {
		var wallet = Wallet.at(await user.wallet());
		(await wallet.balance(aet.address)).should.be.bignumber.equal(web3.toWei(100, "ether"));

		await user.invest(100, "VOLUNTARY", {from: userAccount});

		(await wallet.balance(aet.address)).should.be.bignumber.equal(web3.toWei(98, "ether"));
		(await savingsAccount.totalValue(ait.address)).should.be.bignumber.equal(100);
	});


});