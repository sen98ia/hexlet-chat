import { useState } from 'react';
import { useFormik } from 'formik';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { getChannels, addChannel } from '../../store/api/channelsApi.js';

const ChannelsPanel = () => {
  const { data: channels, isLoading, refetch } = getChannels();
  const [add] = addChannel();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: (values, { resetForm }) => {
      add({ name: values.channelName });
      refetch();
      resetForm();
    },
  });

  if (isLoading) {
    return (
      <Container className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container fluid className="h-100 d-flex flex-column">
      <Row>
        <Col className="d-flex ps-4 pe-2 p-4 mt-1 mb-2 justify-content-between">
          <b>Каналы</b>
          <Button
            variant="outline-primary"
            className="p-0 mx-1"
            onClick={handleShowModal}
            style={
              {
                width: '22px',
                height: '22px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '14px',
              }
            }
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
                  type="text"
                  onChange={formik.handleChange}
                  id="channelName"
                  name="channelName"
                  value={formik.values.channelName}
                  autoFocus
                />
                <Button variant="secondary" onClick={handleCloseModal}>
                  Отменить
                </Button>
                <Button variant="primary" type="submit" onClick={handleCloseModal}>
                  Отправить
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col className="px-2">
          <Nav fill variant="pills" defaultActiveKey="general" className="flex-column overflow-auto">
            {channels.map((channel) => (
              <Nav.Item key={channel.id} className="w-100">
                <Nav.Link eventKey={channel.name} className="w-100 text-start">
                  <span className="me-1">#</span>
                  {channel.name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default ChannelsPanel;
