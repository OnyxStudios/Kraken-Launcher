import {ADD_PACK, REMOVE_PACK} from "./ActionTypes";

export const addPack = (pack) => {
    return {
        type: ADD_PACK,
        payload: pack
    };
};

export const removePack = (pack) => {
    return {
        type: REMOVE_PACK,
        payload: pack
    };
};