import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FIND_ALL_DATA_SUCCESS = 'FIND_ALL_DATA_SUCCESS';
export const findAllSuccess = data => { 
  console.log(data);
  let moodCount = countKeys(data, "mood");
  let barData = countKeys(data, "activity");
  return {
    type: FIND_ALL_DATA_SUCCESS,
    data,
    moodCount,
    barData
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


// export const findAll = (entries) => {
//    console.log('banana');
//   return (dispatch) => {
//     axios.get(`${API_URL}/dashboard`)
//       .then((response) => {
//         console.log(response);

//         let moodCount = countKeys(response.data.entries, "mood");
//         let barData = countKeys(response.data.entries, "activity");
//         console.log(moodCount);
//           dispatch({
//             type: 'FIND_ALL',
//             payload: response.data,
//             moodCount: moodCount,
//             barData: barData
//           })
//       })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }
// }
export function countKeys(yourArray, key, array=[]) {
  // let array = [];
  console.log(yourArray);
//something is wrong here
  yourArray.forEach(function(obj) {
      if (obj[key] && obj[key] !== '' && obj[key].length > 0) {
        // const object = {'mood': 'happy', 'value': 45}
       for (var i = 0; i < array.length + 1; i++) {
          if (array[i] && obj[key] === array[i][key]  ) {
            array[i].value++;
            break;
          }
          if (array.length === i) {
            array.push({[key]: obj[key], 'value': 1});
            break;
          }
       } 

      }
  });
  console.log(array);
  return array;
}