import {
    FIND_ALL_DATA_SUCCESS
} from '../actions/findAll';

const initialState = {
    data: '',
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === FIND_ALL_DATA_SUCCESS) {
        console.log(action.data, 'string beans');
        return Object.assign({}, state, {
            data: action.data,
            error: null,
            pieData: action.moodCount,
            barData: action.barData
        });
    }
    return state;
}
