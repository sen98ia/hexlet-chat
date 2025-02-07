import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { username: null, token: null },
  reducers: {
    setLogIn: (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload));
      Object.assign(state, payload);
    },
    setLogOut: (state) => {
      localStorage.removeItem('user');
      Object.assign(state, { username: null, token: null });
    },
  },
});

export const { setLogIn, setLogOut } = authSlice.actions;
export default authSlice.reducer;
