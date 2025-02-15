import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

const ChatForm = ({ submitHandler, channelId }) => {
  const { username } = JSON.parse(localStorage.getItem('user'));

  const formik = useFormik({
    initialValues: { textMessage: '' },
    onSubmit: (values, { resetForm }) => {
      submitHandler(channelId, values.textMessage, username);
      resetForm();
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { t } = useTranslation();

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder={t('chatForm.placeholder')}
          name="textMessage"
          aria-label={t('chatForm.placeholder')}
          ref={inputRef}
          value={formik.values.textMessage}
          onChange={formik.handleChange}
        />
        <Button variant="primary" type="submit">
          {t('chatForm.sendButton')}
        </Button>
      </InputGroup>
    </Form>
  );
};

export default ChatForm;
