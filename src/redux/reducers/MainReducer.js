import {combineReducers} from "redux";
import ModpacksReducer from './ModpacksReducer';

export default combineReducers({
    modpacks: ModpacksReducer
});