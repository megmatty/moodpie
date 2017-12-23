
import moment from 'moment';

import {
    FIND_ALL_DATA_SUCCESS
} from '../actions/findAll';

import {
    GET_MOOD_SUCCESS,
    GET_ACTIVITY_SUCCESS
} from '../actions/addNew';


const initialState = {
    data: '',
    error: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FIND_ALL_DATA_SUCCESS:
            return Object.assign({}, state, {
                data: action.data,
                error: null,
                pieData: action.moodCount,
                barData: action.barData,
                lineData: action.lineData
            });  
        case 'REALTIME_REFRESH':
          let pieData = countKeys(action.payload, "mood", null, state.pieData.map(a => ({...a})));
          let barData = countKeys(action.payload, "activity", null, state.barData.map(a => ({...a})));
          return {
            ...state,
            pieData: pieData,
            barData: barData
          }
        case 'REFORMAT_DATA':
          return {
            ...state,
            lineData: countKeys(state.data.map(a => ({...a})), "date", action.time)
          }
        case 'SWITCH_MOOD':
        let o = groupBy(state.data.map(a => ({...a})), 'mood');
        let total = [];
        total.push(countKeys(o['happy'], "date", 'MMM'));
        total.push(countKeys(o['nervous'], "date", 'MMM'));
        console.log(total);
        console.log(o);
          return {
            ...state,
            total: total
          }
        case 'GET_MOOD_SUCCESS':
          return {
            ...state,
            moodList: action.data.moodList
          }
        case 'GET_ACTIVITY_SUCCESS':
          console.log(action);
          return {
            ...state,
            activityList: action.data.activityList
          }
        default:
            return state
    }

}

//map total as props to linechart
//loop through total length to make new lines

function groupBy(arr, property) {
  return arr.reduce(function(memo, x) {
    if (!memo[x[property]]) { memo[x[property]] = []; }
    memo[x[property]].push(x);
    return memo;
  }, {});
}



export function countKeys(yourArray, key, timeFormat, array=[] ) {
  // let array = [];
  console.log(yourArray);
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