import {ADD_PACK, REMOVE_PACK, SET_VERSIONS} from "./ActionTypes";

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

export const setVersions = (loader, versions) => {
    return {
        type: SET_VERSIONS,
        payload: {
            loader,
            versions
        }
    }
};