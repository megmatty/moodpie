import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import moment from 'moment';

import io from 'socket.io-client'; 
console.log(io);

const socket = io.connect(API_BASE_URL);

export const FIND_ALL_DATA_SUCCESS = 'FIND_ALL_DATA_SUCCESS';
export const findAllSuccess = data => { 
  // console.log(data);
  let moodCount = countKeys(data, "mood");
  let barData = countKeys(data, "activity");
  let lineData = countKeys(data, 'date', 'MMM');
  return {
    type: FIND_ALL_DATA_SUCCESS,
    data,
    moodCount,
    barData,
    lineData
} };

// export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
// export const fetchProtectedDataError = error => ({
//     type: FETCH_PROTECTED_DATA_ERROR,
//     error
// });

export const findAll = (entries) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/dashboard`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(findAllSuccess(data)))
        .catch(err => {
            // dispatch(findAllError(err));
        });
};

export const updateChart = (time) => {
  return (dispatch) => {
    console.log('lime');
    console.log(time);

      dispatch({
        type: 'REFORMAT_DATA',
        time: time
      });
  }
}

export const switchChart = (mood, time) => {
  return (dispatch) => {
    console.log('lemon');
    console.log(mood);

      dispatch({
        type: 'SWITCH_MOOD',
        mood: mood,
        time: time
      });
  }
}



export const refreshData = (time) => {
  return (dispatch) => {
    console.log('mango');
    socket.removeListener('new entry');
    socket.on('new entry', function(response) {
      console.log('peach');
      // console.log(response);
      dispatch({
        type: 'REALTIME_REFRESH',
        payload: [response],
        time: time
      })
    });
  }
}

export const findUserEntries = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(findAllSuccess(data)))
        .catch(err => {
            // dispatch(findAllError(err));
        });
};


export function countKeys(yourArray, key, timeFormat, array=[] ) {
  // let array = [];
  // console.log(yourArray);
//
  yourArray.forEach(function(obj) {
      let ok = timeFormat ? moment( obj[key] ).format(timeFormat) :  obj[key];  
      if (ok && ok !== '' && ok.length > 0) {
        // const object = {'mood': 'happy', 'value': 45}
       for (var i = 0; i < array.length + 1; i++) {
          if (array[i] && ok === array[i][key]  ) {
            array[i].value++;
            break;
          }
          if (array.length === i) {
            array.push({[key]: ok, 'value': 1});
            break;
          }
       } 

      }
  });
  console.log(array);
  return array;
}




// export function countKeys(yourArray, key, array=[]) {
//   // let array = [];
//   console.log(yourArray);
// //something is wrong here
//   yourArray.forEach(function(obj) {
//       if (obj[key] && obj[key] !== '' && obj[key].length > 0) {
//         // const object = {'mood': 'happy', 'value': 45}
//        for (var i = 0; i < array.length + 1; i++) {
//           if (array[i] && obj[key] === array[i][key]  ) {
//             array[i].value++;
//             break;
//           }
//           if (array.length === i) {
//             array.push({[key]: obj[key], 'value': 1});
//             break;
//           }
//        } 

//       }
//   });
//   console.log(array);
//   return array;
// }