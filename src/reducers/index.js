import { combineReducers } from "redux";
import auth from "reducers/auth";
import message from "reducers/message";

/**
 * A module that combines and manages all state
 */

/**
 * Method that takes the current state and an action as arguments, and return a new state result
 */
export default combineReducers({
  auth,
  message,
});
