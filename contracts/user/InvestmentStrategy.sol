pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';


/**
 * @title InvestmentStrategy
 * @dev Contract that recommends the most optimal allocation of investment funds
 */
contract InvestmentStrategy {

    function getNumberOfRecommendations() view public returns(uint256);


    function getRecommendedInvestment(uint256 _index, uint _base) public view returns(bytes32, uint256);

}

contract FixedAllocationInvestmentStrategy is InvestmentStrategy {
    using SafeMath for uint256;

    bytes32[] fundNames;
    uint256[] allocations;


    function FixedAllocationInvestmentStrategy(bytes32[] _fundNames, uint256[] _allocations) public {
        fundNames = _fundNames;
        allocations = _allocations;
    }

    function getNumberOfRecommendations() view public returns(uint256) {
        return fundNames.length;
    }


    function getRecommendedInvestment(uint256 _index, uint _base) public view returns(bytes32, uint256) {
        return (fundNames[_index], allocations[_index].mul(_base).div(100));
    }

}