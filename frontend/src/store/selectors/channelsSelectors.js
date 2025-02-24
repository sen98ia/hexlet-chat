const getActiveChannelSelector = (state) => state.channels.activeChannel;
const getActiveChannelIdSelector = (state) => state.channels.activeChannel.id;
const getActiveChannelNameSelector = (state) => state.channels.activeChannel.name;

export { getActiveChannelSelector, getActiveChannelIdSelector, getActiveChannelNameSelector };
