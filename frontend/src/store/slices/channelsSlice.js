import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ activeChannel: null });

const channelsSlice = createSlice({
  name: 'channelsSlice',
  initialState,
  reducers: {
    setActive: (state, { payload }) => {
      const activeChannel = payload;
      Object.assign(state, activeChannel);
    },
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsSlice.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
