import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import * as Yup from 'yup';
import { getChannels } from '../../store/api/channelsApi.js';

const EditChannelModal = ({
  submitHandler, showModalHandler, closeModalHandler, channelId,
}) => {
  const { data: channels, isLoading } = getChannels();
  const channelNames = channels.map((channel) => channel.name);
  const currentChannelName = channels.find((channel) => channel.id === channelId).name;

  const { t } = useTranslation();

  const channelNameValidationSchema = Yup.object().shape({
    channelName: Yup.string()
      .transform((value) => filter.clean(value))
      .min(3, t('modal.errors.channelName'))
      .max(20, t('modal.errors.channelName'))
      .notOneOf(channelNames, t('modal.errors.existingChannel'))
      .required(t('requiredField')),
  });

  const formik = useFormik({
    initialValues: {
      channelName: currentChannelName,
    },
    validationSchema: channelNameValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      const censoredChannelName = filter.clean(values.channelName);
      submitHandler(channelId, censoredChannelName);
      resetForm({ values: { channelName: censoredChannelName } });
      closeModalHandler();
      toast.success(t('toasts.channelEdited'));
    },
  });

  const closeModal = () => {
    closeModalHandler();
    formik.resetForm();
  };

  const inputRef = useRef();
  useEffect(() => {
    if (showModalHandler) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [showModalHandler]);

  return (
    <Modal
      show={showModalHandler}
      onHide={closeModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.editTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Label htmlFor="channelName" hidden>{t('modal.label')}</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            onChange={formik.handleChange}
            id="channelName"
            name="channelName"
            ref={inputRef}
            value={formik.values.channelName}
            isInvalid={formik.errors.channelName}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.channelName}</Form.Control.Feedback>
          <Container className="d-flex justify-content-end px-0">
            <Button variant="secondary" className="me-2" onClick={closeModal}>
              {t('modal.cancel')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting || isLoading}
            >
              {t('modal.send')}
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditChannelModal;
