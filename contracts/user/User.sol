pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';


/**
 * @title User
 * @dev User that holds pension savings
 */
contract User is Ownable {

    uint256 public dateOfBirth;

    function User(uint256 _dateOfBirth) public {
        dateOfBirth = _dateOfBirth;
    }

}