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
