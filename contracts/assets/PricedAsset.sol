pragma solidity ^0.4.18;

import './Asset.sol';

/**
 * @title Asset
 * @dev Abstract asset implementation
 */
contract PricedAsset is Asset {

    function calculateReferencePrice(Asset _reference) public view returns(uint256) {
        if (keccak256(this.symbol()) == keccak256(_reference.symbol())) {
            return 1;
        } else {
            //Connect Pricing Oracle - currently under dev
            assert(false);
        }
    }
}