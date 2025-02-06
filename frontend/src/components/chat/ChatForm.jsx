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

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Введите сообщение..."
          aria-label="Новое сообщение"
          name="textMessage"
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
