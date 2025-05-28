import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  organization: string | null;
  username: string | null;
  isAuthenticated: boolean;
}

const defaultOrg = 'Innovasense';
const defaultUser = 'admin';

const persisted = localStorage.getItem('auth');
const initialState: AuthState =
  persisted
    ? JSON.parse(persisted)
    : { organization: null, username: null, isAuthenticated: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ organization: string; username: string }>
    ) => {
      state.organization = action.payload.organization;
      state.username = action.payload.username;
      state.isAuthenticated =
        action.payload.organization === defaultOrg &&
        action.payload.username === defaultUser;
      localStorage.setItem(
        'auth',
        JSON.stringify({
          organization: state.organization,
          username: state.username,
          isAuthenticated: state.isAuthenticated,
        })
      );
    },
    logout: (state) => {
      state.organization = null;
      state.username = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;