import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: {
    phone1: '9324707261',
    phone2: '9335088060',
    email: 'zonovatechnologies@gmail.com',
    address: 'Zonova HQ, Venture Building Hub, Mumbai, India',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/zonova',
      twitter: 'https://twitter.com/zonova',
      facebook: 'https://facebook.com/zonova'
    }
  },
  loading: false,
  error: null
};

const settingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.settings = action.payload;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSuccess: (state, action) => {
      state.settings = action.payload;
    }
  }
});

export const { fetchStart, fetchSuccess, fetchFailure, updateSuccess } = settingSlice.actions;
export default settingSlice.reducer;
