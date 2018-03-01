pragma solidity ^0.4.18;

import './User.sol';
import '../network/PensionFundsRegistry.sol';
import '../network/UserRegistry.sol';
import '../oracle/PaymentGateway.sol';

/**
 * @title UserFactory
 * @dev A helper contract that orchestrate user creation and registration
 */
contract UserFactory is Ownable {

    event Created(address indexed accountAddress, address indexed userContract);

    UserRegistry public userRegistry;
    PensionFundsRegistry public pensionFundsRegistry;
    PaymentGateway public paymentGateway;


    function UserFactory(PensionFundsRegistry _pensionFundsRegistry, PaymentGateway _paymentGateway) public {
        userRegistry = new UserRegistry();
        pensionFundsRegistry = _pensionFundsRegistry;
        paymentGateway = _paymentGateway;
    }


    function createUser(uint256 _dateOfBirth) public returns(User) {
        Wallet wallet = new Wallet(pensionFundsRegistry, paymentGateway);
        User user = new User(_dateOfBirth, Wallet(0x0));
        wallet.transferOwnership(msg.sender);
        user.transferOwnership(msg.sender);
        userRegistry.registerUser(msg.sender, user);
        return user;
    }

}
