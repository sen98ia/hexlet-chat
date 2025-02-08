import { useState } from 'react';
import { useFormik } from 'formik';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';

const ChannelsPanelHeader = ({ submitHandler }) => {
  const channelNameValidationSchema = Yup.object().shape({
    channelName: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
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
      submitHandler(values.channelName);
      resetForm();
    },
  });

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    formik.resetForm();
  };
  const handleShowModal = () => setShowModal(true);
  const addChannelButtonStyle = {
    width: '22px',
    height: '22px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
  };

  return (
    <>
      <b>Каналы</b>
      <Button
        variant="outline-primary"
        className="p-0 mx-1"
        onClick={handleShowModal}
        style={addChannelButtonStyle}
      >
        +
      </Button>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
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
              <Button variant="secondary" className="me-2" onClick={handleCloseModal}>
                Отменить
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.errors.channelName || formik.isSubmitting}
                onClick={formik.errors.channelName && handleCloseModal}
              >
                Отправить
              </Button>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChannelsPanelHeader;
