import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channelsSlice',
  initialState: { activeChannel: { id: '1', name: 'general', removable: false } },
  reducers: {
    setActive: (state, { payload }) => {
      const channel = payload;
      Object.assign(state, { activeChannel: channel });
    },
    setDefault: (state) => {
      Object.assign(state, { activeChannel: { id: '1', name: 'general', removable: false } });
    },
  },
});

export const { setActive, setDefault } = channelsSlice.actions;
export const selectors = channelsSlice.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
