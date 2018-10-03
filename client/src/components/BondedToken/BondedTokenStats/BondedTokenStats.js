import React, { Component } from 'react';

class BondedTokenStats extends Component {
    render() {
        return (
            <div>
                <p>Total Supply: {this.props.supply} ACH</p>
                <p>Market Cap: {this.props.poolBalance} ETH</p>
                <p> Current Price: {this.props.currentPrice} ETH</p>
            </div>
        );
    }
}

export default BondedTokenStats;