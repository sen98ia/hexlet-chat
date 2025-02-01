// import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx';
import RegistrationPage from '../pages/RegistrationPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
// import ChatPage from './pages/ChatPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <PrivateRoute>
          <Route path="/" element={<ChatPage />} />
        </PrivateRoute> */}
        {/* <Route path="/" element={<LoginPage />} /> */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
