pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './Wallet.sol';
import './SavingsAccount.sol';
import '../network/PensionFundsRegistry.sol';


/**
 * @title User
 * @dev User that holds pension savings
 */
contract User is Ownable {

    uint256 public dateOfBirth;
    Wallet public wallet;

    mapping(bytes32 => SavingsAccount) savingAccounts;
    bytes32[] savingAccountsList;

    function User(uint256 _dateOfBirth, Wallet _wallet) public {
        dateOfBirth = _dateOfBirth;
        wallet = _wallet;
    }


    function openSavingAccount(bytes32 _name, PensionFundsRegistry _pensionFundsRegistry) public onlyOwner {
        require(savingAccountsList.length < 16);
        require(address(savingAccounts[_name]) == 0x0);
        SavingsAccount account = new SavingsAccount(_pensionFundsRegistry);
        savingAccounts[_name] = account;
        savingAccountsList.push(_name);
    }

    function createDefaultAccounts(PensionFundsRegistry _pensionFundsRegistry) public onlyOwner {
        openSavingAccount("VOLUNTARY", _pensionFundsRegistry);
        openSavingAccount("EMERGENCY", _pensionFundsRegistry);
        openSavingAccount("SHORT_TERM", _pensionFundsRegistry);
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

}