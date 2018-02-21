pragma solidity ^0.4.18;

import '../oracle/PricingOracle.sol';
import './Asset.sol';

/**
 * @title Asset
 * @dev Abstract asset implementation
 */
contract PricedAsset is Asset {

    PricingOracle pricingOracle;

    function PricedAsset(PricingOracle _pricingOracle) public {
        pricingOracle = _pricingOracle;
    }

    function calculateReferencePrice(Asset _reference) public view returns(uint256) {
        if (keccak256(this.symbol()) == keccak256(_reference.symbol())) {
            return 1;
        } else {
            return pricingOracle.getRelativePrice(this, _reference);
        }
    }
}