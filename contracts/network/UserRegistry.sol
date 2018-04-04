pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../user/User.sol';
import '../user/UserFactory.sol';
import '../user/SavingGoal.sol';


/**
 * @title UserRegistry
 * @dev Holds records for all of the registered users
 */
contract UserRegistry is Ownable {

    UserFactory public userFactory;

    event Registered(address indexed accountAddress, address indexed userContract);

    mapping(address => User) users;

    function UserRegistry(FundManagerRegistry _pensionFundsRegistry, PaymentGateway _paymentGateway) public {
        userFactory = new UserFactory(_pensionFundsRegistry, _paymentGateway);
    }

    function createUser(uint256 _dateOfBirth, uint256 _retirementAge, uint256 _monthlyIncome) public {
        SavingGoal savingGoal = new SavingGoal(_retirementAge, _monthlyIncome);
        User user = userFactory.createUser(_dateOfBirth, savingGoal);
        user.transferOwnership(msg.sender);
        user.wallet().transferOwnership(user);
        registerUser(msg.sender, user);
    }

    function registerUser(address _userAddress, User _userContract) public {
        require(msg.sender == owner || msg.sender == _userAddress);
        users[_userAddress] = _userContract;
        Registered(_userAddress, _userContract);
    }

    function removeSelf() public {
        delete users[msg.sender];
    }

    function getUserContract(address _userAddress) view public returns(User) {
        return users[_userAddress];
    }

}