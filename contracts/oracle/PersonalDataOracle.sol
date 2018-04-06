pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../assets/Asset.sol';

/**
 * @title PricingOracle
 * @dev This contract demonstrates the separation of public/private data storage.
 * For simplicity the raw data is stored on-chain but it's only for demo purpose.
 * In the final version the contract will contain only a path to an encrypted off-chain storage
 */
contract PersonalDataOracle is Ownable {

    mapping(address => uint256) private userDateOfBirth;

    function putUserDateOfBirth(uint256 _dob) public {
        userDateOfBirth[msg.sender] = _dob;
    }

    function getUserDateOfBirth() public view returns(uint256) {
        return userDateOfBirth[msg.sender];
    }

}