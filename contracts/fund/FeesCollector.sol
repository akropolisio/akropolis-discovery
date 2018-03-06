pragma solidity ^0.4.18;

import '../user/Wallet.sol';
import '../fund/PensionFund.sol';
import '../tokens/AkropolisToken.sol';


/**
 * @title FeesCollector
 * @dev Abstract class that defines fees strategy for different actions
 */
contract FeesCollector {

    AkropolisToken aet;

    function FeesCollector(AkropolisToken _aet) public {
        aet = _aet;
    }

    function collectInvestmentFee(address _investor, ERC20 _token, uint _amount) public;


    function calculateInvestmentFee(ERC20 _token, uint _amount) public view returns(uint256);

}