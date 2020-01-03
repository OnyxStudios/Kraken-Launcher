import {SET_VERSIONS} from "./../ActionTypes";
const fs = require('fs');

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
    if (action.type === SET_VERSIONS) {
        let loader = action.payload.loader;
        let versions = action.payload.versions;

        if (Array.isArray(versions)) {
            state[loader].versions.push(...versions);
        } else {
            for (let key in versions) {
                let entry = versions[key];
                if(!state[loader].versions[key]) state[loader].versions[key] = [];
                state[loader].versions[key].push(...entry);
            }
        }
    }

    return state;
}
