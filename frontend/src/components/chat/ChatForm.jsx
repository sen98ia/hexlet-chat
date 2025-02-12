import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

const ChatForm = () => {
  const formik = useFormik({
    initialValues: { textMessage: '' },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Введите сообщение..."
          aria-label="Новое сообщение"
          name="textMessage"
          ref={inputRef}
          value={formik.values.textMessage}
          onChange={formik.handleChange}
        />
        <Button variant="primary" type="submit">
          →
        </Button>
      </InputGroup>
    </Form>
  );
};

export default ChatForm;
