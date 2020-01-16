import { LOGIN, SAVE_SETTINGS } from '../actionTypes';

export default function(state, action) {
  switch (action.type) {
    case SAVE_SETTINGS: {
      return state;
    }
    case LOGIN: {
      return action.username;
    }
    default:
      return '';
  }
}
