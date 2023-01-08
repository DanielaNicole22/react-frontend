import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

/**
 * A module that manages message-related state
 */

const initialState = {};

/**
 * Method that take the current state and an action as arguments, and return a new state result
 */
export default function messageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}
