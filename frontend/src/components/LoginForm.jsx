import axios from 'axios';
// import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
// import { useLocation, useNavigate } from 'react-router-dom';
// import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginForm = () => {
  // const auth = useAuth();
  // const [authFailed, setAuthFailed] = useState(false);
  // const location = useLocation();
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      await axios.post(routes.loginPath(), values)
        .then((response) => {
          // const user = response.data;
          // localStorage.setItem('userId', JSON.stringify(user));
          // setAuthFailed(false);
          console.log(values);
          console.log(response.data);
          // auth.logIn();
        })
        .cath((error) => console.log(error));
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="username"
          id="username"
          placeholder="Ваш ник"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </Form.Group>
      <Button variant="outline-primary" type="submit" className="w-100">
        Войти
      </Button>
    </Form>
  );
};

export default LoginForm;
