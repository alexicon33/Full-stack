import { LOGIN, LOGOUT, SAVE_SETTINGS } from './actionTypes';

export const login = username => ({
  type: LOGIN,
  username: username
});

export const logout = () => ({ type: LOGOUT });

export const saveSettings = settings => ({
  type: SAVE_SETTINGS,
  settings: settings
});
