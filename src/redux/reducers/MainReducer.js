import {combineReducers} from "redux";
import ModpacksReducer from './ModpacksReducer';
import LoadersReducer from "./LoadersReducer";

export default combineReducers({
    modpacks: ModpacksReducer,
    loaders: LoadersReducer
});