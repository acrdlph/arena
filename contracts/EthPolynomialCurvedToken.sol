/*pragma solidity ^0.4.23*/

import "./EthBondingCurvedToken.sol";


/// @title  EthPolynomialCurvedToken - A polynomial bonding curve
///         implementation that is backed by ether.
contract EthPolynomialCurvedToken is EthBondingCurvedToken {

    // uint256 constant private PRECISION = 10000000000;
    string public name = "Achill-Attention-Token";
    string public symbol = "ACH";
    uint8 public exponent = 2;
    uint32 public invSlope = 1000;
    uint8 public decimals = 18;
    //bool initalized = false;

    // @dev constructor        Initializes the bonding curve
    // constructor() public {
    // }

    // @dev initContract        Initializes the bonding curve
    // need to make sure this function is only called once
    // @param _name             The name of the token
    // @param _decimals         The number of decimals to use
    // @param _symbol           The symbol of the token
    // @param _exponent         The exponent of the curve
    // @param _hash             digest produced by hashing content using hash function
    // @param _hashFunction     code for the hash function used
    // @param _size             length of the digest

    // fixed above for testing

    // function initContract(
    //     string _name,
    //     uint8 _decimals,
    //     string _symbol,
    //     uint8 _exponent,
    //     uint32 _slope
    // ) public payable {
    //     require(!initalized);
    //     // extra precautions
    //     require(poolBalance == 0 && totalSupply_ == 0);
    //     initalized = false;
    //     name = _name;
    //     decimals = _decimals;
    //     symbol = _symbol;
    //     exponent = _exponent;
    //     slope = _slope;
    // }

    /// @dev        Calculate the integral from 0 to t
    /// @param t    The number to integrate to
    function curveIntegral(uint256 t) internal returns (uint256) {
        uint256 nexp = exponent + 1;
        return (t ** nexp).div(nexp).div(invSlope).div((10 ** (uint256(decimals) * uint256(exponent))));
    }

    function priceToMint(uint256 numTokens) public returns(uint256) {
        return curveIntegral(totalSupply_.add(numTokens)).sub(poolBalance);
    }

    function rewardForBurn(uint256 numTokens) public returns(uint256) {
        return poolBalance.sub(curveIntegral(totalSupply_.sub(numTokens)));
    }
}
