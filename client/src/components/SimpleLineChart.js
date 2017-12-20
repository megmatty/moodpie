import React, { Component }  from 'react';
import {findAll, refreshData, updateChart, switchChart} from '../actions/findAll';
import {connect} from 'react-redux';

import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

export class SimpleLineChart extends Component {
	
	handleClick = (e) => {
		this.props.dispatch(updateChart(e.target.value));
	}

	switchMood = (e) => {
		this.props.dispatch(switchChart(e.target.value));
	}

	render () {
  	return (
    	<div>
	    	<LineChart width={730} height={250} data={this.props.line}
				  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
				  <CartesianGrid strokeDasharray="3 3" />
				  <XAxis dataKey="date" />
				  <YAxis dataKey="value"/>
				  <Tooltip />
				  <Legend />
				  <Line type="monotone" dataKey="value" stroke="#8884d8" />
				</LineChart>
				<input name="time" type="radio" onChange={this.handleClick.bind(this)} value="MMM"/><label>Month</label>
				<input type="radio" name="time" onChange={this.handleClick.bind(this)} value="ddd"/><label>Day</label>
				<input type="radio" name="time" onChange={this.handleClick.bind(this)} value="m"/><label>Minutes</label>
				<input type="radio" name="time" onChange={this.handleClick.bind(this)} value="s"/><label>Seconds</label>
				<br />
				<input type="checkbox" name="mood" onChange={this.switchMood.bind(this)} value="Happy"/><label>Happy</label>
				<input type="checkbox" name="mood" onChange={this.switchMood.bind(this)} value="Nervous"/><label>Nervous</label>

    	</div>
    );
  }
}


export default connect()(SimpleLineChart);
