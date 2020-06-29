import {SET_VERSIONS} from "./../ActionTypes";

const initialState = {
    vanilla: {
        name: 'Vanilla',
        versions: []
    },
    forge: {
        name: 'Forge',
        versions: {}
    },
    fabric: {
        name: 'Fabric',
        versions: {}
    }
};

export default function(state = initialState, action) {
    let newState = {...state};

    if (action.type === SET_VERSIONS) {
        let loader = action.payload.loader;
        let versions = action.payload.versions;

        if (Array.isArray(versions)) {
            newState[loader].versions.push(...versions);
        } else {
            for (let key in versions) {
                let entry = versions[key];
                if(!newState[loader].versions[key]) newState[loader].versions[key] = [];
                newState[loader].versions[key].push(...entry);
            }
        }
    }

    return newState;
}