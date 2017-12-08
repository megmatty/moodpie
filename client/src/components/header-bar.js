import React from 'react';
import {connect} from 'react-redux';
import {setCurrentUser, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {Link, Redirect} from 'react-router-dom';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(setCurrentUser(null));
        this.props.dispatch(setAuthToken(null));
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
            );
        }
        return (
            <div className="header-bar">
                <h1>MoodPie</h1>
                {logOutButton}
                <br />
                <div className="dashboard-username">
                    Email: {this.props.email}
                </div>
                <br />
                <div>
                    <Link to="/">Home</Link>
                    <br />
                    <Link to="/dashboard">Dashboard</Link>
                    <br />
                    <Link to="/add">Add Entry</Link>
                    <br />
                    <Link to="/profile">Profile</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        loggedIn: state.auth.currentUser !== null,
        email: currentUser ? state.auth.currentUser.email : ''
    }
};

export default connect(mapStateToProps)(HeaderBar);
