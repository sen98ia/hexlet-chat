import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socket from '../socket.js';
import { channelsApi } from '../store/api/channelsApi.js';
import ChatLayout from '../components/layout/ChatLayout.jsx';
import ChatContainer from '../components/chat/ChatContainer.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleNewMessage = (payload) => {
      console.log(payload);
    };
    // через тэги
    const handleNewChannel = (payload) => {
      console.log(`newChannel: ${JSON.stringify(payload)}`);
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(payload);
      }));
    };
    // через апдейт квери
    const handleRemoveChannel = (payload) => {
      console.log(`removeChannel: ${JSON.stringify(payload)}`);
      dispatch(channelsApi.util.invalidateTags(['Channel']));
    };
    const handleRenameChannel = (payload) => {
      console.log(`renameChannel: ${JSON.stringify(payload)}`);
      dispatch(channelsApi.util.invalidateTags(['Channel']));
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);
    socket.on('renameChannel', handleRenameChannel);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('removeChannel', handleRemoveChannel);
      socket.off('renameChannel', handleRenameChannel);
    };
  });

  return (
    <ChatLayout>
      <ChatContainer />
    </ChatLayout>
  );
};

export default ChatPage;
