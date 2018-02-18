pragma solidity ^0.4.18;

import './MintableAsset.sol';
import './PricedAsset.sol';
import './Asset.sol';

/**
 * @title Share
 * @dev Contract representing shares of a fund
 */
contract Shares is MintableAsset, PricedAsset {

    function Shares(bytes32 _symbol)
        Asset(_symbol) public {

    }

    function issueShares(address _shareHolder, uint256 _amount) public onlyOwner returns(bool) {
        //Connect fund controller, compliance and audit proxies
        return super.mint(_shareHolder, _amount);
    }

}