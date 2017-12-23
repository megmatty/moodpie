// import axios from 'axios';
import io from 'socket.io-client'; 
console.log(io);

import {API_BASE_URL} from '../config';
const socket = io.connect(API_BASE_URL);


export const sendEntry = (entry) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    console.log(authToken);
    console.log(entry);
    return fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        body: JSON.stringify(entry),
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        console.log(response);
        socket.emit('add entry', entry);
      })
}

export const GET_MOOD_SUCCESS = 'GET_MOOD_SUCCESS';
export const getMoodSuccess = data => { 
  // console.log(data);
  return {
    type: GET_MOOD_SUCCESS,
    data
} };

export const GET_ACTIVITY_SUCCESS = 'GET_ACTIVITY_SUCCESS';
export const getActivitySuccess = data => { 
  // console.log(data);
  return {
    type: GET_ACTIVITY_SUCCESS,
    data
} };



export const getMoods = () => (dispatch, getState) => {
    return fetch(`${API_BASE_URL}/moods`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            // Authorization: `Bearer ${authToken}`,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then((response) => {
        dispatch(getMoodSuccess(response))
      })
    .catch(err => {
        // dispatch(findAllError(err));
    });

}


export const getActivities = () => (dispatch, getState) => {
    console.log('this is showing up');
    return fetch(`${API_BASE_URL}/activities`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            // Authorization: `Bearer ${authToken}`,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then((response) => {
        dispatch(getActivitySuccess(response))
      })
    .catch(err => {
        // dispatch(findAllError(err));
    });
}



