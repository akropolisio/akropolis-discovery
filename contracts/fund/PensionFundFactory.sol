pragma solidity ^0.4.18;

import '../tokens/AkropolisToken.sol';
import '../network/StakingPool.sol';
import './FlatFeesCollector.sol';
import './PensionFund.sol';


/**
 * @title PensionFundFactory
 * @dev Pension fund factory that orchestrates creation of pension funds
 */
contract PensionFundFactory {

    AkropolisToken public aet;
    FeesCollector public feesCollector;


    function PensionFundFactory(AkropolisToken _aet) public {
        aet = _aet;
        feesCollector = new FlatFeesCollector(aet);
    }


    //Consider passing feesCollector type as a parameter
    function createPensionFund(bytes32 _symbol) public returns(PensionFund) {
        PensionFund fund = new PensionFund(aet, _symbol);
        fund.setFeesCollector(feesCollector);
        return fund;
    }

}