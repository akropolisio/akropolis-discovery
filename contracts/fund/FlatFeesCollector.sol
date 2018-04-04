pragma solidity ^0.4.18;

import '../user/Wallet.sol';
import '../fund/FundManager.sol';


/**
 * @title FlatFeesCollector
 * @dev Implementation of a Fees Collector that takes the same fee for every investment
 */
contract FeesCollector {

    AkropolisExternalToken aet;

    function FeesCollector(AkropolisExternalToken _aet) public {
        aet = _aet;
    }

    function collectInvestmentFee(address _investor, ERC20 _token, uint _amount) public;


    function calculateInvestmentFee(ERC20 _token, uint _amount) public view returns(uint256);

}

contract FlatFeesCollector is FeesCollector {

    function FlatFeesCollector(AkropolisExternalToken _aet) public
        FeesCollector(_aet) {
    }

    function collectInvestmentFee(address _investor, ERC20 _token, uint _amount) public {
        uint256 fee = calculateInvestmentFee(_token, _amount);
        aet.transferFrom(_investor, msg.sender, fee);
    }


    function calculateInvestmentFee(ERC20 _token, uint256 _amount) public view returns(uint256) {
        return 1 ether;
    }

}