import {
    FIND_ALL_DATA_SUCCESS
} from '../actions/findAll';

const initialState = {
    data: '',
    error: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FIND_ALL_DATA_SUCCESS:
            console.log(action.data, 'string beans');
            return Object.assign({}, state, {
                data: action.data,
                error: null,
                pieData: action.moodCount,
                barData: action.barData
            });  
        case 'REALTIME_REFRESH':
          console.log(action);
          console.log('pineapple');
          let pieData = countKeys(action.payload, "mood", state.pieData.map(a => ({...a})));
          let barData = countKeys(action.payload, "activity", state.barData.map(a => ({...a})));
          console.log(barData);
          return {
            ...state,
            pieData: pieData,
            barData: barData
          }
    }


    // if (action.type === FIND_ALL_DATA_SUCCESS) {
    //     console.log(action.data, 'string beans');
    //     return Object.assign({}, state, {
    //         data: action.data,
    //         error: null,
    //         pieData: action.moodCount,
    //         barData: action.barData
    //     });
    // } 
    return state;
}

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