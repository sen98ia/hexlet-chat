import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { username: null, token: null },
  reducers: {
    setLogIn: (state, { payload }) => {
      localStorage.setItem('userId', JSON.stringify(payload));
      Object.assign(state, payload);
    },
    setLogOut: (state) => {
      localStorage.removeItem('userId');
      Object.assign(state, { username: null, token: null });
    },
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
