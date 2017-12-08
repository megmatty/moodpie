import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
// import {fetchProtectedData} from '../actions/protected-data';
import {findUserEntries, refreshData} from '../actions/findAll';
import Log from './Log';
import SimplePieChart from './SimplePieChart';
import SimpleBarChart from './SimpleBarChart';


export class Profile extends React.Component {
    componentDidMount() {
        if (!this.props.loggedIn) {
            return;
        }
        this.props.findUserEntries();
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
                <h1>Profile</h1>
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

const mapDispatchToProps = (dispatch) => {
  return {
    findUserEntries: () => {
      dispatch(findUserEntries())
    },
    refreshData: () => {
      dispatch(refreshData())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
