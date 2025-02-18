import { useState, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import AuthContext from './index.jsx';
import { setLogOut } from '../store/slices/authSlice.js';

const AuthProvider = ({ children }) => {
  const user = localStorage.getItem('user');
  const [isAuth, setAuth] = useState(!!user);
  const dispatch = useDispatch();

  const handleLogIn = useCallback(() => {
    if (localStorage.getItem('user')) {
      setAuth(true);
    }
  }, []);

  const handleLogOut = useCallback(() => {
    dispatch(setLogOut());
    setAuth(false);
  }, [dispatch]);

  const authMemo = useMemo(
    () => ({ isAuth, handleLogIn, handleLogOut }),
    [isAuth, handleLogIn, handleLogOut],
  );

  return (
    <AuthContext.Provider value={authMemo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
