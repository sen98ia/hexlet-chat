import { useFormik } from 'formik';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { getChannels } from '../../store/api/channelsApi.js';

const EditChannelModal = ({ submitHandler, showModalHandler, closeModalHandler, channelId }) => {
  const { data: channels } = getChannels();
  const channelNames = channels.map((channel) => channel.name);

  const channelNameValidationSchema = Yup.object().shape({
    channelName: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelNames, 'Должно быть уникальным')
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelNameValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      submitHandler(channelId, values.channelName);
      console.log(values.channelName);
      closeModalHandler();
      resetForm();
    },
  });

  return (
    <Modal
      show={showModalHandler}
      onHide={closeModalHandler}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            className="mb-3"
            type="text"
            onChange={formik.handleChange}
            id="channelName"
            name="channelName"
            value={formik.values.channelName}
            isInvalid={formik.errors.channelName}
            autoFocus
          />
          <Form.Control.Feedback type="invalid">{formik.errors.channelName}</Form.Control.Feedback>
          <Container className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={closeModalHandler}>
              Отменить
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Отправить
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditChannelModal;
