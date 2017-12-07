//something is wrong with this chart

import React, { Component }  from 'react';

import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class SimplePieChart extends Component {

	constructor(props) {
		super();

		this.state={
		    initialState: {}
		}	

	}
	
	render () {
		let cells;
			if (this.props.pie) {
				cells = this.props.pie.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
			}

  	return (
			<PieChart width={400} height={400} className="chart" onMouseEnter={this.onPieEnter} pie={this.props.pie}>
				<Pie
				  onClick={this.setData}
				  data={this.props.pie} 
				  cx={200} 
				  cy={200} 
				  labelLine={false}
				  label={renderCustomizedLabel}
				  outerRadius={120} 
				  fill="#8884d8"
				  dataKey="value"
				>
				{cells}
				</Pie>
		  </PieChart>
    );
}}

export default SimplePieChart;