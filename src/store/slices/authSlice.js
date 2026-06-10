import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('zonova_admin_token') || null;
const user = localStorage.getItem('zonova_admin_user') 
  ? JSON.parse(localStorage.getItem('zonova_admin_user')) 
  : null;

const initialState = {
  token,
  user,
  isAuthenticated: !!token,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('zonova_admin_token', action.payload.token);
      localStorage.setItem('zonova_admin_user', JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('zonova_admin_token');
      localStorage.removeItem('zonova_admin_user');
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
