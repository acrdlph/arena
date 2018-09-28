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

  render () {
    let width = Math.min(600, (window.innerWidth < 480 ? window.innerWidth : 480) - 30);
    let height = width * 2/3;
    return (
      <div >
        <ComposedChart
          style={{margin:'auto'}}
          width={width}
          height={height}
          margin={{top: 10, right: 30, left: 0, bottom: 0}}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="supply" type={'number'} />
          <YAxis dataKey="value" type={'number'} />
          <Tooltip/>
          <ReferenceDot
            isFront={true}
            alwaysShow={true}
            // label={'current price'}
            x={1}
            y={1}
            r={8}
            fill="blue"
            stroke="none"
          />
        </ComposedChart>
      </div>
    )
  }
}

export default CurveChart;