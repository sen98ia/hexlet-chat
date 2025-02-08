import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import EditChannelModal from './EditChannelModal.jsx';

const ChannelItem = ({ channel, handlers }) => {
  // работа с модалкой
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  if (!channel.removable) {
    return (
      <Nav.Item className="w-100">
        <Nav.Link eventKey={channel.name} className="w-100 text-start text-truncate">
          <span className="me-1">#</span>
          {channel.name}
        </Nav.Link>
      </Nav.Item>
    );
  }
  return (
    <Nav.Item className="w-100">
      <Dropdown split as={ButtonGroup} className="w-100">
        <Button
          as={Nav.Link}
          eventKey={channel.name}
          className="w-100 text-start text-truncate"
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
        <Dropdown.Toggle split />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handlers.handleRemove(channel.id)}>Удалить</Dropdown.Item>
          <Dropdown.Item onClick={handleShowModal}>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <EditChannelModal
        channelId={channel.id}
        showModalHandler={showModal}
        closeModalHandler={handleCloseModal}
        submitHandler={handlers.handleEdit}
      />
    </Nav.Item>
  );
};

export default ChannelItem;
