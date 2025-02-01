import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    onSubmit: (values) => console.log(values),
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="name"
          id="name"
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
