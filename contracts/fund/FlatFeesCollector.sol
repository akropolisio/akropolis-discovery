pragma solidity ^0.4.18;

import '../user/Wallet.sol';
import '../fund/PensionFund.sol';
import './FeesCollector.sol';


/**
 * @title FlatFeesCollector
 * @dev Implementation of a Fees Collector that takes the same fee for every investment
 */
contract FlatFeesCollector {

    AkropolisToken AET;

    function FlatFeesCollector(AkropolisToken _aet) {
        AET = _aet;
    }

    function collectInvestmentFee(Wallet wallet, PensionFund fund, ERC20 _token, uint _amount) public {
        uint256 fee = calculateInvestmentFee(_token, _amount);
        AET.transferFrom(address(wallet), address(fund), fee);
    }


    function calculateInvestmentFee(ERC20 _token, uint256 _amount) public view returns(uint256) {
        return 1;
    }

}