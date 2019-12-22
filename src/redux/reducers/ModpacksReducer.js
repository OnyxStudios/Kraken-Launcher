import {ADD_PACK, REMOVE_PACK} from "./../ActionTypes";
const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_PACK:
            state.push(action.payload);
            return state;
        case REMOVE_PACK:
            let index = state.indexOf(action.payload);
            if(index > -1) {
                state.splice(index, 1)
            }
            return state;
        default:
            return state;
    }
}