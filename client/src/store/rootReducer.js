import { combineReducers } from "redux";
import auth from "./reducers/auth";
import alert from "./reducers/alert";
const rootReducer = combineReducers({
  auth,
  alert,
});
export default rootReducer;
