import StarredUserReducer from "./StarredUserReducer";
import UserReducer from "./UserReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ UserReducer, StarredUserReducer });

export default rootReducer;
