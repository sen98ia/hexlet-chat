import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import EditChannelModal from './EditChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';

const ChannelItem = ({ channel, handlers }) => {
  // модалка для эдита
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
  // модалка для удаления
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const handleCloseRemoveModal = () => setShowRemoveModal(false);
  const handleShowRemoveModal = () => setShowRemoveModal(true);

  if (!channel.removable) {
    return (
      <Nav.Item className="w-100">
        <Nav.Link
          eventKey={channel.name}
          onClick={() => handlers.handleSetActive(channel)}
          className="w-100 text-start text-truncate rounded-0"
        >
          <span className="me-1">#</span>
          {channel.name}
        </Nav.Link>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item className="w-100">
      <Dropdown as={ButtonGroup} className="w-100">
        <Button
          id="removableNavElement"
          as={Nav.Link}
          eventKey={channel.name}
          className="w-100 text-start text-truncate rounded-0"
          onClick={() => handlers.handleSetActive(channel)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
        <Dropdown.Toggle split id="splitNavElement" />
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleShowRemoveModal}>Удалить</Dropdown.Item>
          <Dropdown.Item onClick={handleShowEditModal}>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <EditChannelModal
        channelId={channel.id}
        showModalHandler={showEditModal}
        closeModalHandler={handleCloseEditModal}
        submitHandler={handlers.handleEdit}
      />
      <RemoveChannelModal
        channelId={channel.id}
        showModalHandler={showRemoveModal}
        closeModalHandler={handleCloseRemoveModal}
        submitHandler={handlers.handleRemove}
      />
    </Nav.Item>
  );
};

export default ChannelItem;
