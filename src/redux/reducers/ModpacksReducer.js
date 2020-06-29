import {ADD_PACK, REMOVE_PACK} from "./../ActionTypes";
const initialState = [];

export default function(state = initialState, action) {
    let newState = [...state];

    switch (action.type) {
        case ADD_PACK:
            newState.push(action.payload);
            return newState;
        case REMOVE_PACK:
            let index = newState.indexOf(action.payload);
            if(index > -1) {
                newState.splice(index, 1)
            }
            return newState;
        default:
            return state;
    }
}