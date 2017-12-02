import React, { Component }  from 'react';

class Log extends Component {
	constructor(props) {
		super();
	}

	render() {
		if (!this.props.data) {
			return <div>Loading...</div>;
		}

		return(
			<div>			
				{this.props.data.map((data, i) => (
					<div key={i}>
						<div>{data.mood}</div>
						<div>{data.activity}</div>
						<div>{data.journal}</div>
						<hr />
					</div>
				))}
		 </div>
		);
	}

}

export default Log;