import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  isAuth: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      localStorage.setItem('authToken', action.payload.token);
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth = false;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('authToken');
    },
    restoreSession: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { loginStart, loginSuccess, loginError, logout, restoreSession } = authSlice.actions;

export const selectIsAuth = (state: any) => state.auth.isAuth;
export const selectUser = (state: any) => state.auth.user;
export const selectAuthLoading = (state: any) => state.auth.loading;

export default authSlice.reducer;
