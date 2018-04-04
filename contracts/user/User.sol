pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './Wallet.sol';
import './SavingsAccount.sol';
import '../network/FundManagerRegistry.sol';
import './InvestmentStrategy.sol';
import "./SavingGoal.sol";


/**
 * @title User
 * @dev User that holds pension savings
 */
contract User is Ownable {

    uint256 public dateOfBirth;
    Wallet public wallet;
    InvestmentStrategy public investmentStrategy;
    FundManagerRegistry public pensionFundsRegistry;
    SavingGoal public savingGoal;

    mapping(bytes32 => SavingsAccount) savingAccounts;
    bytes32[] savingAccountsList;

    function User(uint256 _dateOfBirth, Wallet _wallet, SavingGoal _savingGoal) public {
        dateOfBirth = _dateOfBirth;
        wallet = _wallet;
        savingGoal = _savingGoal;
    }

    function createAccountsWithFixedStrategy(bytes32[] _fundNames, uint256[] _allocations) onlyOwner public {
        createFixedAllocationInvestmentStrategy(_fundNames, _allocations);
        createDefaultAccounts();
    }

    function createDefaultAccounts() public onlyOwner {
        openSavingAccount("VOLUNTARY");
        openSavingAccount("EMERGENCY");
        openSavingAccount("SHORT_TERM");
    }

    function openSavingAccount(bytes32 _name) public onlyOwner {
        require(savingAccountsList.length < 16);
        require(address(savingAccounts[_name]) == 0x0);
        SavingsAccount account = new SavingsAccount(pensionFundsRegistry);
        savingAccounts[_name] = account;
        savingAccountsList.push(_name);
    }

    function createFixedAllocationInvestmentStrategy(bytes32[] _fundNames, uint256[] _allocations) onlyOwner public {
        investmentStrategy = new FixedAllocationInvestmentStrategy(_fundNames, _allocations);
    }

    function invest(uint256 _amount, bytes32 _accountName) public onlyOwner {
        for(uint256 i=0; i <investmentStrategy.getNumberOfRecommendations(); i++) {
            bytes32 fundName;
            uint256 fundAmount;
            (fundName, fundAmount) = investmentStrategy.getRecommendedInvestment(i, _amount);
            investIntoFund(fundName, fundAmount, _accountName);
        }
    }

    function investIntoFund(bytes32 _fundName, uint256 _amount, bytes32 _accountName) public onlyOwner {
        wallet.makeDeposit(_amount);
        SavingsAccount account = savingAccounts[_accountName];
        account.addFund(_fundName);
        wallet.invest(_fundName, _amount, savingAccounts[_accountName]);
    }

    function getSavingAccountByName(bytes32 _name) public view returns(SavingsAccount) {
        return savingAccounts[_name];
    }


    function getSavingAccountByIndex(uint256 _index) public view returns(SavingsAccount) {
        return savingAccounts[savingAccountsList[_index]];
    }

    function getSavingAccountsCount() public view returns(uint256) {
        return savingAccountsList.length;
    }

    function getSavingAccountValue(bytes32 _name) public view returns(uint256) {
        return savingAccounts[_name].totalValue(wallet.ait());
    }

    function setFundManagerRegistry(FundManagerRegistry _pensionFundsRegistry) public onlyOwner {
        pensionFundsRegistry = _pensionFundsRegistry;
    }

}