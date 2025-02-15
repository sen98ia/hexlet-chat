import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getChannels } from '../../store/api/channelsApi.js';

const RemoveChannelModal = ({
  submitHandler, showModalHandler, closeModalHandler, channelId,
}) => {
  const { isLoading } = getChannels();
  const { t } = useTranslation();

  return (
    <Modal
      show={showModalHandler}
      onHide={closeModalHandler}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('modal.confirm')}</p>
        <Container className="d-flex justify-content-end px-0">
          <Button variant="secondary" className="me-2" onClick={closeModalHandler}>
            {t('modal.cancel')}
          </Button>
          <Button
            variant="danger"
            type="submit"
            onClick={() => submitHandler(channelId)}
            disabled={isLoading}
          >
            {t('modal.send')}
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
