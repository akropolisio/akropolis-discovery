pragma solidity ^0.4.18;

import '../tokens/AkropolisToken.sol';
import '../network/StakingPool.sol';
import './FeesCollector.sol';
import './FlatFeesCollector.sol';
import './PensionFund.sol';


/**
 * @title PensionFundFactory
 * @dev Pension fund factory that orchestrates creation of pension funds
 */
contract PensionFundFactory {

    AkropolisToken public akropolisToken;
    FeesCollector public feesCollector;


    function PensionFundFactory(AkropolisToken _akropolisToken) public {
        akropolisToken = _akropolisToken;
        feesCollector = new FlatFeesCollector(akropolisToken);
    }


    //Consider passing feesCollector type as a parameter
    function createPensionFund(bytes32 _symbol) public {
        PensionFund fund = new PensionFund(akropolisToken, _symbol);
        fund.setFeesCollector(feesCollector);
        fund.transferOwnership(msg.sender);
    }

}