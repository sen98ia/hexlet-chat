import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getChannels } from '../../store/api/channelsApi.js';

const RemoveChannelModal = ({
  submitHandler, showModalHandler, closeModalHandler, channelId,
}) => {
  const { isLoading } = getChannels();

  return (
    <Modal
      show={showModalHandler}
      onHide={closeModalHandler}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Уверены?</p>
        <Container className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={closeModalHandler}>
            Отменить
          </Button>
          <Button
            variant="danger"
            type="submit"
            onClick={() => submitHandler(channelId)}
            disabled={isLoading}
          >
            Удалить
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
