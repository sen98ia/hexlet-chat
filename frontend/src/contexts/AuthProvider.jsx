import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AuthContext from './index.jsx';
import { setLogOut } from '../store/slices/authSlice.js';

const AuthProvider = ({ children }) => {
  const user = localStorage.getItem('user');
  const [isAuth, setAuth] = useState(!!user);
  const dispatch = useDispatch();

  const handleLogIn = () => {
    if (localStorage.getItem('user')) {
      setAuth(true);
    }
  };

  const handleLogOut = () => {
    dispatch(setLogOut());
    setAuth(false);
  };

  // нужно ли useMemo?
  return (
    <AuthContext.Provider value={{ isAuth, handleLogIn, handleLogOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
