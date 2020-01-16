import { LOGIN, LOGOUT, SAVE_SETTINGS } from '../actionTypes';

export default function(state, action) {
  switch (action.type) {
    case LOGIN: {
      return state;
    }
    case LOGOUT: {
      return state;
    }
    case SAVE_SETTINGS: {
      return {
        betView: action.settings.betView,
        navbarDesign: action.settings.navbarDesign,
        bank: action.settings.bank
      };
    }
    default:
      return state ? state : null;
  }
}
