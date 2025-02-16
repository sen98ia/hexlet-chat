import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

const ChatForm = ({ submitHandler, channelId }) => {
  const { username } = JSON.parse(localStorage.getItem('user'));

  const formik = useFormik({
    initialValues: { textMessage: '' },
    onSubmit: (values, { resetForm }) => {
      if (values.textMessage.length === 0) {
        formik.setSubmitting(false);
      } else {
        const censoredMessage = filter.clean(values.textMessage);
        submitHandler(channelId, censoredMessage, username);
        resetForm();
      }
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
          aria-label={t('chatForm.label')}
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
