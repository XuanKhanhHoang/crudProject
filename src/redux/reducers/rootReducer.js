import { combineReducers } from "redux";
import userReducer from "./userReducer";
import languageReducer from "./languageReducer";
const rootReducer = combineReducers({
  user: userReducer,
  language: languageReducer,
});

export default rootReducer;
