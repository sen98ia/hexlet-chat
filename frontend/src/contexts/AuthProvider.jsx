import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AuthContext from './index.jsx';
import { setLogIn, setLogOut } from '../store/authSlice.js';

const AuthProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);
  const dispatch = useDispatch();

  const handleLogIn = (authData) => {
    dispatch(setLogIn(authData));
    setAuth(true);
  };
  const handleLogOut = () => {
    dispatch(setLogOut());
    setAuth(false);
  };

  // вроде бы и нужна перерисовка всего, еслиа авторизация изменяется
  return (
    <AuthContext.Provider value={{ isAuth, handleLogIn, handleLogOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
