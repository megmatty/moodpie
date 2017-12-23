import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
// import { add } from '../actions/auth';
// import { testFetch } from '../actions/protected-data';
import { sendEntry, getMoods, getActivities } from '../actions/addNew';
// import {required, nonEmpty} from '../validators';
import Emojify from 'react-emojione';
import {emojify} from 'react-emojione';

export class Add extends React.Component {

    componentDidMount() {
       // this.props.dispatch(testFetch());
       this.props.getMoods();
       this.props.getActivities();
    }


    onSubmit(values) {
        let submission = {
            journal: values.journal,
            mood: values.mood,
            activity: values.activity
        };
        console.log(submission);
        return this.props.dispatch(sendEntry(submission));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }

        if (!this.props.loggedIn) {
            return <Redirect to="/" />;
        }

        const options = {
            // this click handler will be set on every emoji
            onClick: event => {console.log(event.target); event.target.title = ':wink:'}
        };

        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <br />
                
                <p>Welcome back, {this.props.email}</p>
                <Link to="/dashboard">Need Redirect to Dashboard</Link>
                
                <p>Mood</p>
                {this.props.moodList.map((item, i) => (
                  <label key={i}>
                        <Field name="mood" component="input" type="radio" value={item.mood} />
                        <span className='emoji'> {emojify(item.emoji, options)} </span>
                    {item.mood}
                    </label>  
                ))}

                <p>Activity</p>
                {this.props.activityList.map((item, i) => (
                  <label key={i}>
                        <Field name="activity" component="input" type="radio" value={item.activity} />
                        <span className='emoji'> {emojify(item.emoji, options)} </span>
                    {item.activity}
                    </label>  
                ))}
                  <br />
                  <br />
                  <label htmlFor="journal">Journal</label>
                  <br />
                    <Field name="journal" component="textarea" type="textarea" />
                <br />
                <button disabled={this.props.pristine || this.props.submitting}>
                    Submit
                </button>
            </form>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    console.log(state);
    return {
        loggedIn: currentUser !== null,
        email: currentUser ? state.auth.currentUser.email : '',
        moodList: state.findAll.moodList,
        activityList: state.findAll.activityList
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMoods: () => {
      dispatch(getMoods())
    },
    getActivities: () => {
      dispatch(getActivities())
    }
  }
}



Add = connect(
    mapStateToProps, mapDispatchToProps
    )(Add);

export default reduxForm({
    form: 'add',
    onSubmitFail: (errors, dispatch) => dispatch(focus('add', 'email'))
})(Add);






