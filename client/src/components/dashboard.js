import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
// import {fetchProtectedData} from '../actions/protected-data';
import {findAll, refreshData} from '../actions/findAll';
import Log from './Log';
import SimplePieChart from './SimplePieChart';
import SimpleBarChart from './SimpleBarChart';

//map dispatch to props

export class Dashboard extends React.Component {
    componentDidMount() {
        if (!this.props.loggedIn) {
            return;
        }
        this.props.dispatch(findAll());
    }

    componentWillMount() {
        this.props.dispatch(refreshData());
    }

    render() {
        // Only visible to logged in users
        if (!this.props.loggedIn) {
            return <Redirect to="/" />;
        }

        return (
            <div className="dashboard">
                <br />
                <div className="dashboard-username">
                    Email: {this.props.email}
                </div>
                <br />
                <Link to="/add">Add Entry</Link>
                <br />
                <br />
                <SimplePieChart pie={this.props.pieData}/>
                <SimpleBarChart bar={this.props.barData}/>
                <Log data={this.props.entries}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        loggedIn: currentUser !== null,
        email: currentUser ? state.auth.currentUser.email : '',
        protectedData: state.protectedData.data,
        entries: state.findAll.data,
        pieData: state.findAll.pieData,
        barData: state.findAll.barData
    };
};

export default connect(mapStateToProps)(Dashboard);
