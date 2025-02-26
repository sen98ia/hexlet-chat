import { useRef, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import createChannelSchema from '../../validation/schemas.js';
import { getChannels } from '../../store/api/channelsApi.js';

const AddChannelModal = ({
  submitHandler, showModalHandler, closeModalHandler,
}) => {
  const { data: channels, isLoading } = getChannels();
  const channelNames = useMemo(() => channels.map((channel) => channel.name), [channels]);

  const { t } = useTranslation();

  const channelSchema = useMemo(
    () => createChannelSchema(channelNames, filter, t),
    [channelNames, t],
  );

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      const censoredChannelName = filter.clean(values.channelName);
      submitHandler(censoredChannelName);
      closeModalHandler();
      resetForm();
      toast.success(t('toasts.channelAdded'));
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
        <Modal.Title>{t('modal.addTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Label htmlFor="channelName" className="visually-hidden">{t('modal.label')}</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            onChange={formik.handleChange}
            ref={inputRef}
            id="channelName"
            name="channelName"
            value={formik.values.channelName}
            isInvalid={formik.errors.channelName}
          />
          <Form.Control.Feedback className="pb-2" type="invalid">{formik.errors.channelName}</Form.Control.Feedback>
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

export default AddChannelModal;
