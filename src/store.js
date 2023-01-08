import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

/**
 * A module for creating store using redux
 */

/**
 * Middleware that allows to return functions, rather than just actions, within Redux
 */
const middleware = [thunk];

/**
 * Creates a Redux store that holds the complete state tree of the app
 */
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
