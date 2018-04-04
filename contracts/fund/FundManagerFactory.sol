pragma solidity ^0.4.18;

import '../tokens/AkropolisExternalToken.sol';
import '../network/StakingPool.sol';
import './FlatFeesCollector.sol';
import './FundManager.sol';


/**
 * @title FundManagerFactory
 * @dev Pension fund factory that orchestrates creation of pension funds
 */
contract FundManagerFactory {

    AkropolisExternalToken public aet;
    FeesCollector public feesCollector;


    function FundManagerFactory(AkropolisExternalToken _aet) public {
        aet = _aet;
        feesCollector = new FlatFeesCollector(aet);
    }


    //Consider passing feesCollector type as a parameter
    function createFundManager(bytes32 _symbol) public returns(FundManager) {
        FundManager fund = new FundManager(aet, _symbol);
        fund.setFeesCollector(feesCollector);
        return fund;
    }

}