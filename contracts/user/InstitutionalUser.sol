pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './Wallet.sol';
import './SavingsAccount.sol';
import '../network/FundManagerRegistry.sol';
import '../oracle/PersonalDataOracle.sol';
import './InvestmentStrategy.sol';
import "./SavingGoal.sol";


/**
 * @title InstitutionalUser
 * @dev Contract designed for institutional players to manage a group of users with common goals and investment strategy
 */
contract InstitutionalUser is Ownable {

    Wallet public wallet;
    InvestmentStrategy public investmentStrategy;
    FundManagerRegistry public fundManagerRegistry;
    SavingGoal public savingGoal;
    PersonalDataOracle personalDataOracle;

    mapping(address => mapping(bytes32 => SavingsAccount)) savingAccounts;

    mapping(address => bytes32[]) savingAccountsList;

    function InstitutionalUser(Wallet _wallet, SavingGoal _savingGoal) public {
        wallet = _wallet;
        savingGoal = _savingGoal;
    }

    function registerUser(address _user) public onlyOwner {
        openSavingAccount(_user, "VOLUNTARY");
        openSavingAccount(_user, "EMERGENCY");
        openSavingAccount(_user, "SHORT_TERM");
    }

    function openSavingAccount(address _user, bytes32 _name) public onlyOwner {
        require(savingAccountsList[_user].length < 16);
        require(address(savingAccounts[_user][_name]) == 0x0);
        SavingsAccount account = new SavingsAccount(fundManagerRegistry);
        savingAccounts[_user][_name] = account;
        savingAccountsList[_user].push(_name);

    }

    function createFixedAllocationInvestmentStrategy(bytes32[] _fundNames, uint256[] _allocations) onlyOwner public {
        investmentStrategy = new FixedAllocationInvestmentStrategy(_fundNames, _allocations);
    }

    function invest(address _user, uint256 _amount, bytes32 _accountName) public onlyOwner {
        for(uint256 i=0; i <investmentStrategy.getNumberOfRecommendations(); i++) {
            bytes32 fundName;
            uint256 fundAmount;
            (fundName, fundAmount) = investmentStrategy.getRecommendedInvestment(i, _amount);
            investIntoFund(_user, fundName, fundAmount, _accountName);
        }
    }

    function investIntoFund(address _user, bytes32 _fundName, uint256 _amount, bytes32 _accountName) public onlyOwner {
        wallet.makeDeposit(_amount);
        SavingsAccount account = savingAccounts[_user][_accountName];
        account.addFund(_fundName);
        wallet.invest(_fundName, _amount, account);
    }

    function getSavingAccountByName(address _user, bytes32 _name) public view returns(SavingsAccount) {
        return savingAccounts[_user][_name];
    }

    function getSavingAccountByIndex(address _user, uint256 _index) public view returns(SavingsAccount) {
        return savingAccounts[_user][savingAccountsList[_user][_index]];
    }

    function getSavingAccountsCount(address _user) public view returns(uint256) {
        return savingAccountsList[_user].length;
    }

    function getSavingAccountValue(address _user, bytes32 _name) public view returns(uint256) {
        return savingAccounts[_user][_name].totalValue(wallet.ait());
    }

    function setFundManagerRegistry(FundManagerRegistry _fundManagerRegistry) public onlyOwner {
        fundManagerRegistry = _fundManagerRegistry;
    }

}