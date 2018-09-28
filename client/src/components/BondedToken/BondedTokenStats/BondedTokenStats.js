import React, { Component } from 'react';

class BondedTokenStats extends Component {
    render() {
        return (
            <div>
                <p>Total Supply: {this.props.supply}</p>
                <p>Market Cap: </p>
            </div>
        );
    }
}

export default BondedTokenStats;