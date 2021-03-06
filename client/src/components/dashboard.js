import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
// import {fetchProtectedData} from '../actions/protected-data';
import {findAll, refreshData} from '../actions/findAll';
import Log from './Log';
import SimplePieChart from './SimplePieChart';
import SimpleBarChart from './SimpleBarChart';
import SimpleLineChart from './SimpleLineChart';

export class Dashboard extends React.Component {
    componentDidMount() {
        if (!this.props.loggedIn) {
            return;
        }
        this.props.findAll();
    }

    componentWillMount() {
        this.props.refreshData();
    }

    render() {
        // Only visible to logged in users
        if (!this.props.loggedIn) {
            return <Redirect to="/" />;
        }

        return (
            <div className="dashboard">
                <br />
                <br />
                <SimplePieChart pie={this.props.pieData}/>
                <SimpleBarChart bar={this.props.barData}/>
                <SimpleLineChart line={this.props.lineData}/>
                <Log data={this.props.entries}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        loggedIn: currentUser !== null,
        entries: state.findAll.data,
        pieData: state.findAll.pieData,
        barData: state.findAll.barData,
        lineData: state.findAll.lineData
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findAll: () => {
      dispatch(findAll())
    },
    refreshData: () => {
      dispatch(refreshData())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
