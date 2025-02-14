import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useSignUp } from '../../store/api/usersApi.js';
import useAuth from '../../hooks/index.jsx';

const RegistrationForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const [signUp] = useSignUp();

  const userValidationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Минимально 6 символов')
      .required('Обязательное поле'),
    passwordConfirmation: Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        'Пароли должны совпадать',
      )
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        await signUp({ username, password }).unwrap();
        setErrorMessage('');
        auth.handleLogIn(true);
        navigate('/');
      } catch (error) {
        formik.setSubmitting(false);
        console.log(error);
        if (error.status === 409) {
          setErrorMessage('такой пользователь уже существует');
        } else {
          setErrorMessage('ошибка сети');
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
      <h1 className="text-center mb-4">Регистрация</h1>
      <FloatingLabel
        className="mb-4"
        controlId="username"
        label="Имя пользователя"
      >
        <Form.Control
          type="text"
          name="username"
          placeholder="Ваш ник"
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={formik.touched.username && (formik.errors.username || errorMessage)}
          onBlur={formik.handleBlur}
          ref={inputRef}
          required
        />
        <Form.Control.Feedback type="invalid">{formik.errors.username || errorMessage}</Form.Control.Feedback>
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
          isInvalid={formik.touched.password && formik.errors.password}
          onBlur={formik.handleBlur}
          required
        />
        <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel
        className="mb-4"
        controlId="passwordConfirmation"
        label="Подтверждение пароля"
      >
        <Form.Control
          type="password"
          name="passwordConfirmation"
          placeholder="Подтверждение пароля"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirmation}
          isInvalid={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
          required
        />
        <Form.Control.Feedback type="invalid">{formik.errors.passwordConfirmation}</Form.Control.Feedback>
      </FloatingLabel>
      <Button variant="outline-primary" type="submit" className="w-100">
        Зарегистрироваться
      </Button>
    </Form>
  );
};

export default RegistrationForm;
