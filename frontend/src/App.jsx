import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer, Bounce } from 'react-toastify';
import filter from 'leo-profanity';
import store from './store/index.js';
// import store from './store/index.js';
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
                  element={<PrivateRoute><ChatPage /></PrivateRoute>}
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
