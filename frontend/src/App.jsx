import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
// import { useEffect } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer, Bounce } from 'react-toastify';
import { io } from 'socket.io-client';
import filter from 'leo-profanity';
// import { messagesApi } from './store/api/messagesApi.js';
// import { setActive, setDefault } from './store/slices/channelsSlice.js';
// import { channelsApi } from './store/api/channelsApi.js';
import store from './store/index.js';
import AuthProvider from './contexts/AuthProvider.jsx';
import useAuth from './hooks/index.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import resources from './locales/index.js';
import routes from './routes.js';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.isAuth ? children : <Navigate to={routes.pages.login()} state={{ from: location }} />
  );
};

const App = () => {
  // создание экземпляра i18next
  const i18nextInstance = i18next.createInstance();
  i18nextInstance
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
      debug: false,
    });
  // инициализация сокета
  const socket = io();
  // leo-profanity
  const ru = filter.getDictionary('ru');
  filter.add(ru);
  // rollbar-config
  const rollbarConfig = {
    accessToken: import.meta.env.ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  // useEffect(() => {
  //   const handleNewMessage = (payload) => {
  //     store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
  //       draft.push(payload);
  //     }));
  //   };

  //   const handleNewChannel = (payload) => {
  //     console.log(`newChannel: ${JSON.stringify(payload)}`);
  //     store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
  //       draft.push(payload);
  //     }));
  //   };

  //   const handleRemoveChannel = (payload) => {
  //     const { id } = payload;
  //     store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
  //       const newDraft = draft.filter((el) => el.id !== id);
  //       return newDraft;
  //     }));
  //     const state = store.getState();
  //     const activeChannelId = state.channels.activeChannel.id;
  //     if (activeChannelId === id) {
  //       store.dispatch(setDefault());
  //     }
  //   };
  //   const handleRenameChannel = (payload) => {
  //     const { id } = payload;
  //     store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
  //       const newDraft = draft.map((el) => (el.id === id ? payload : el));
  //       return newDraft;
  //     }));
  //     const state = store.getState();
  //     const activeChannelId = state.channels.activeChannel.id;
  //     if (activeChannelId === id) {
  //       store.dispatch(setActive(payload));
  //     }
  //   };

  //   socket.on('newMessage', handleNewMessage);
  //   socket.on('newChannel', handleNewChannel);
  //   socket.on('removeChannel', handleRemoveChannel);
  //   socket.on('renameChannel', handleRenameChannel);

  //   return () => {
  //     socket.off('newMessage', handleNewMessage);
  //     socket.off('newChannel', handleNewChannel);
  //     socket.off('removeChannel', handleRemoveChannel);
  //     socket.off('renameChannel', handleRenameChannel);
  //   };
  // });

  return (
    <StoreProvider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <AuthProvider>
            <BrowserRouter>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
              />
              <Routes>
                <Route
                  path={routes.pages.chat()}
                  element={<PrivateRoute><ChatPage socketInstance={socket} /></PrivateRoute>}
                />
                <Route path={routes.pages.login()} element={<LoginPage />} />
                <Route path={routes.pages.signUp()} element={<RegistrationPage />} />
                <Route path={routes.pages.notFound()} element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </StoreProvider>
  );
};

export default App;
