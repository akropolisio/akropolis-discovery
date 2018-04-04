pragma solidity ^0.4.18;

import './User.sol';
import '../network/FundManagerRegistry.sol';
import '../network/UserRegistry.sol';
import '../oracle/PaymentGateway.sol';

/**
 * @title UserFactory
 * @dev A helper contract that orchestrate user creation and registration
 */
contract UserFactory is Ownable {

    event Created(address indexed accountAddress, address indexed userContract);

    FundManagerRegistry public pensionFundsRegistry;
    PaymentGateway public paymentGateway;
    PersonalDataOracle public personalDataOracle;


    function UserFactory(FundManagerRegistry _pensionFundsRegistry, PaymentGateway _paymentGateway, PersonalDataOracle _personalDataOracle) public {
        pensionFundsRegistry = _pensionFundsRegistry;
        paymentGateway = _paymentGateway;
        personalDataOracle = _personalDataOracle;
    }


    function createUser(uint256 _dateOfBirth, SavingGoal _savingGoal) public returns (User) {

        Wallet wallet = new Wallet(pensionFundsRegistry, paymentGateway);
        User user = new User(_dateOfBirth, wallet, _savingGoal, personalDataOracle);
        user.setFundManagerRegistry(pensionFundsRegistry);
        wallet.transferOwnership(msg.sender);
        user.transferOwnership(msg.sender);

        return user;
    }

}
