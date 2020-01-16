import { combineReducers } from 'redux';
import isLoggedIn from './isLoggedIn';
import username from './username';
import saveSettings from './saveSettings';

export default combineReducers({ isLoggedIn, username, saveSettings });
