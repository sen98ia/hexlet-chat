import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSignUp } from '../../store/api/usersApi.js';
import useAuth from '../../hooks/index.jsx';
import routes from '../../routes.js';

const RegistrationForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const [signUp] = useSignUp();
  const { t } = useTranslation();

  const censorshipDictionary = filter.list();

  const userValidationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('registrationForm.errors.username'))
      .max(20, t('registrationForm.errors.username'))
      .notOneOf(censorshipDictionary, t('censorship'))
      .required(t('requiredField')),
    password: Yup.string()
      .min(6, t('registrationForm.errors.password'))
      .required(t('requiredField')),
    passwordConfirmation: Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        t('registrationForm.errors.passwordConfirmation'),
      )
      .required(t('requiredField')),
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
        navigate(routes.pages.chat());
      } catch (error) {
        formik.setSubmitting(false);
        if (error.status === 409) {
          setErrorMessage(t('registrationForm.errors.existingUser'));
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
      <h1 className="text-center mb-4">{t('registrationForm.title')}</h1>
      <FloatingLabel
        className="mb-4"
        controlId="username"
        label={t('registrationForm.fields.username')}
      >
        <Form.Control
          type="text"
          name="username"
          placeholder={t('registrationForm.fields.username')}
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={formik.touched.username && (formik.errors.username || errorMessage)}
          onBlur={formik.handleBlur}
          ref={inputRef}
          required
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.username || errorMessage}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel
        className="mb-4"
        controlId="password"
        label={t('registrationForm.fields.password')}
      >
        <Form.Control
          type="password"
          name="password"
          placeholder={t('registrationForm.fields.password')}
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={formik.touched.password && formik.errors.password}
          onBlur={formik.handleBlur}
          required
        />
        <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel
        className="mb-4"
        controlId="passwordConfirmation"
        label={t('registrationForm.fields.passwordConfirmation')}
      >
        <Form.Control
          type="password"
          name="passwordConfirmation"
          placeholder={t('registrationForm.fields.passwordConfirmation')}
          onChange={formik.handleChange}
          value={formik.values.passwordConfirmation}
          isInvalid={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
          required
        />
        <Form.Control.Feedback type="invalid" tooltip>{formik.errors.passwordConfirmation}</Form.Control.Feedback>
      </FloatingLabel>
      <Button variant="outline-primary" type="submit" className="w-100">
        {t('registrationForm.submit')}
      </Button>
    </Form>
  );
};

export default RegistrationForm;
