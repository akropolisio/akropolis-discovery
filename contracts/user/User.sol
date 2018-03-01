pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './Wallet.sol';


/**
 * @title User
 * @dev User that holds pension savings
 */
contract User is Ownable {

    uint256 public dateOfBirth;
    Wallet public wallet;

    function User(uint256 _dateOfBirth, Wallet _wallet) public {
        dateOfBirth = _dateOfBirth;
        wallet = _wallet;
    }

}