import axios from 'axios';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
// добавить сюда экшены

const LoginForm = () => {
  // const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      await axios.post(routes.loginPath(), values)
        .then((response) => {
          setAuthFailed(false);
          const { data } = response;
          localStorage.setItem('userId', JSON.stringify(data));
          // auth.logIn();
          navigate('/');
        })
        .catch((error) => {
          formik.setSubmitting(false);
          setAuthFailed(true);
          // if (error.isAxiosError && error.response.status === 401) {
          //   // state.error = 'ошибка авторизации'
          // } else {
          //   // state.error = 'ошибка сети'
          // }
        });
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
          value={formik.values.username}
          isInvalid={authFailed}
          required
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
          isInvalid={authFailed}
          required
        />
        <Form.Control.Feedback type="invalid">имя или пароль некорректны</Form.Control.Feedback>
      </Form.Group>
      <Button variant="outline-primary" type="submit" className="w-100">
        Войти
      </Button>
    </Form>
  );
};

export default LoginForm;
