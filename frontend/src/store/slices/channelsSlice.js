import { createSlice, current } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channelsSlice',
  initialState: { activeChannel: { id: '1', name: 'general', removable: false } },
  reducers: {
    setActive: (state, { payload }) => {
      const channel = payload;
      Object.assign(state, { activeChannel: channel });
      console.log('i worked');
      console.log(channel);
      console.log(JSON.stringify(current(state)));
    },
    setDefault: (state) => {
      Object.assign(state, { activeChannel: { id: '1', name: 'general', removable: false } });
      console.log('def worked');
      console.log(JSON.stringify(current(state)));
    },
  },
});

export const { setActive, setDefault } = channelsSlice.actions;
export const selectors = channelsSlice.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
