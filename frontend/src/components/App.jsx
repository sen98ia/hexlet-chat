import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/index.js';
import AuthProvider from '../contexts/AuthProvider.jsx';
import useAuth from '../hooks/index.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegistrationPage from '../pages/RegistrationPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import ChatPage from '../pages/ChatPage.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.isAuth ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<ChatPage />} /> */}
          <Route path="/" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);

export default App;
