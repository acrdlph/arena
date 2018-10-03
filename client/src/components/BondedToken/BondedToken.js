import React, {Component} from 'react';
import CurveChart from './Chart/Chart';
import BondedTokenTransact from './BondedTokenTransact/BondedTokenTransact';
import BondedTokenStats from './BondedTokenStats/BondedTokenStats';


class BondedToken extends Component {
    render() {
      return (
      <div >
        <BondedTokenStats 
          supply={this.props.supply} 
          currentPrice={this.props.curveData.currentPrice} 
          poolBalance={this.props.curveData.poolBalance}/>          
        <CurveChart curveData={this.props.curveData}/>
        <BondedTokenTransact buy={this.props.buy} sell={this.props.sell} change={this.props.change}/>
      </div>
      )
    }
  }



export default BondedToken;