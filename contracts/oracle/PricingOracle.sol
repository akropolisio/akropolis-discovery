pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../assets/Asset.sol';

/**
 * @title PricingOracle
 * @dev Provides pricing for assets
 */
contract PricingOracle is Ownable {

    function getRelativePrice(Asset _subject, Asset _reference) public view returns(uint256);

}