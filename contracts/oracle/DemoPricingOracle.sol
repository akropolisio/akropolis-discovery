pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../assets/Asset.sol';

/**
 * @title DemoPricingOracle
 * @dev Demo version of pricing oracle with 1:1 ratios of all of the assets
 */
contract DemoPricingOracle is Ownable {

    function getRelativePrice(Asset _subject, Asset _reference) public pure returns(uint256) {
        return 1;
    }

}