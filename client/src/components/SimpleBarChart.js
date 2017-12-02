import React, { Component }  from 'react';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class SimpleBarChart extends Component {
	render () {
  	return (
    	<BarChart className="chart" width={400} height={400} data={this.props.bar}>
       <XAxis dataKey="activity"/>
       <YAxis dataKey="value"/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    );
  }
}

export default SimpleBarChart;
