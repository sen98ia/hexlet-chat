import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socket from '../socket.js';
import { channelsApi } from '../store/api/channelsApi.js';
import { messagesApi } from '../store/api/messagesApi.js';
import ChatLayout from '../components/layout/ChatLayout.jsx';
import ChatContainer from '../components/chat/ChatContainer.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleNewMessage = (payload) => {
      dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
        draft.push(payload);
      }));
    };

    // const handleNewMessage = (payload) => {
    //   console.log(payload);
    //   dispatch(messagesApi.util.invalidateTags(['Message']));
    // };

    const handleNewChannel = (payload) => {
      console.log(`newChannel: ${JSON.stringify(payload)}`);
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(payload);
      }));
    };

    const handleRemoveChannel = (payload) => {
      const { id } = payload;
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        const newDraft = draft.filter((el) => el.id !== id);
        return newDraft;
      }));
    };
    const handleRenameChannel = (payload) => {
      const { id, name } = payload;
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        const index = draft.findIndex((el) => el.id === id);
        draft[index].name = name;
      }));
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
