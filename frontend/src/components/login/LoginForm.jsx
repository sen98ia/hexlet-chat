import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/index.jsx';
import routes from '../../routes.js';

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      await axios.post(routes.loginPath(), values)
        .then((response) => {
          setAuthFailed(false);
          setErrorMessage('');
          auth.handleLogIn(response.data);
          navigate('/');
        })
        .catch((error) => {
          formik.setSubmitting(false);
          setAuthFailed(true);
          if (error.isAxiosError && error.response.status === 401) {
            setErrorMessage('имя или пароль некорректны');
          } else {
            setErrorMessage('ошибка сети');
          }
        });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="mt-3 mt-md-0">
      <h1 className="text-center mb-4">Войти</h1>
      <FloatingLabel
        className="mb-4"
        controlId="username"
        label="Ваш ник"
      >
        <Form.Control
          type="text"
          name="username"
          placeholder="Ваш ник"
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={authFailed}
          ref={inputRef}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        className="mb-4"
        controlId="password"
        label="Пароль"
      >
        <Form.Control
          type="password"
          name="password"
          placeholder="Пароль"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={authFailed}
          required
        />
        <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
      </FloatingLabel>
      <Button variant="outline-primary" type="submit" className="w-100">
        Войти
      </Button>
    </Form>
  );
};

export default LoginForm;
