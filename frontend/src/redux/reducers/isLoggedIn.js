import { LOGIN, SAVE_SETTINGS } from '../actionTypes';

export default function(state, action) {
  switch (action.type) {
    case LOGIN: {
      return true;
    }
    case SAVE_SETTINGS: {
      return state;
    }
    default:
      return false;
  }
}
