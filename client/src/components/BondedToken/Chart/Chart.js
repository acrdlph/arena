import React from 'react';
const Recharts = require('recharts');

const {
  Area,
  // Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  ReferenceDot,
  ComposedChart
} = Recharts;

class CurveChart extends React.Component {
  
  getChartData() {
    let { totalSupply, poolBalance, invSlope, exponent, currentPrice } = this.props.curveData;
    console.log(currentPrice)
    poolBalance = parseFloat(poolBalance) || 0;
    totalSupply = parseFloat(totalSupply) || 0;

    let currentPoint = { supply: totalSupply, value: currentPrice };

    let data = [];
    let step = (totalSupply || 50) / 100;


    for (let i = step; i < (totalSupply || 50) * 1.5; i += step) {
      let price = 1 / invSlope * (i ** exponent);
      if (i < totalSupply) {
        data.push({ supply: i, sell: price.toFixed(4), value: parseFloat(price.toFixed(4)) });
      } else if (i >= totalSupply) {
        data.push({ supply: i, buy: price.toFixed(4), value: parseFloat(price.toFixed(4)) });
      }
    }
    return { data, currentPoint };
  }

  render () {
    let { data, currentPoint } = this.getChartData();
    let width = Math.min(600, (window.innerWidth < 480 ? window.innerWidth : 480) - 30);
    let height = width * 2/3;

    console.log(data, currentPoint);
    return (
      <div >

        <ComposedChart
          style={{ margin: 'auto' }}
          width={width}
          height={height}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="supply" type={'number'} />
          <YAxis dataKey="value" type={'number'} />
          <Tooltip/>

          <Area isAnimationActive={false} dots={false} stackOffset={'none'} dataKey="value" name={'price'} key={'price'} stroke='blue' fill='none'/>

          <Area isAnimationActive={false} stackOffset={'none'} dataKey="sell" stroke="blue" fill='blue' />

          <ReferenceDot
            isFront={true}
            ifOverflow="extendDomain"
            x={currentPoint.supply}
            y={currentPoint.value}
            r={16}
            // fill="blue"
            stroke="blue"
            label={currentPoint.value}
          />

        </ComposedChart>


      </div>
    )
  }
}

export default CurveChart;