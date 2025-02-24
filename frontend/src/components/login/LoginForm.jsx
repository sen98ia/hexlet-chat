import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useLogin } from '../../store/api/usersApi.js';
import useAuth from '../../hooks/index.jsx';
import routes from '../../routes.js';

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const [login] = useLogin();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        await login(values).unwrap();
        setAuthFailed(false);
        setErrorMessage('');
        auth.handleLogIn();
        navigate(routes.pages.chat());
      } catch (error) {
        console.log(error);
        formik.setSubmitting(false);
        setAuthFailed(true);
        if (error.status === 401) {
          setErrorMessage(t('loginForm.error'));
        } else {
          setErrorMessage(t('networkError'));
          toast.error(t('networkError'));
        }
      }
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit} className="mt-3 mt-md-0">
      <h1 className="text-center mb-4">{t('loginForm.title')}</h1>
      <FloatingLabel
        className="mb-4"
        controlId="username"
        label={t('loginForm.fields.username')}
      >
        <Form.Control
          type="text"
          name="username"
          placeholder={t('loginForm.fields.username')}
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
        label={t('loginForm.fields.password')}
      >
        <Form.Control
          type="password"
          name="password"
          placeholder={t('loginForm.fields.password')}
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={authFailed}
          required
        />
        <Form.Control.Feedback type="invalid" tooltip>{errorMessage}</Form.Control.Feedback>
      </FloatingLabel>
      <Button variant="outline-primary" type="submit" className="w-100">
        {t('loginForm.submit')}
      </Button>
    </Form>
  );
};

export default LoginForm;
