import { useState, useMemo } from 'react';
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

  const authMemo = useMemo(
    () => ({ isAuth, handleLogIn, handleLogOut }),
    [isAuth],
  );

  return (
    <AuthContext.Provider value={authMemo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
