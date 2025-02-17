import { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import EditChannelModal from './EditChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
// import { setActive } from '../../store/slices/channelsSlice.js';

const ChannelItem = ({ channel, handlers }) => {
  // модалка для эдита
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
  // модалка для удаления
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const handleCloseRemoveModal = () => setShowRemoveModal(false);
  const handleShowRemoveModal = () => setShowRemoveModal(true);

  const { t } = useTranslation();

  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const activeClassName = 'w-100 text-start text-truncate rounded-0 active';
  const className = 'w-100 text-start text-truncate rounded-0';

  if (!channel.removable) {
    return (
      <Nav.Item className="w-100">
        <Nav.Link
          eventKey={channel.name}
          // ref={buttonRef}
          onClick={() => handlers.handleSetActive(channel)}
          className={activeChannel.id === channel.id ? activeClassName : className}
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
          // ref={buttonRef}
          eventKey={channel.name}
          className={activeChannel.id === channel.id ? activeClassName : className}
          onClick={() => handlers.handleSetActive(channel)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
        <Dropdown.Toggle split id="splitNavElement">
          <span className="visually-hidden">{t('channelItem.control')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleShowRemoveModal}>{t('channelItem.remove')}</Dropdown.Item>
          <Dropdown.Item onClick={handleShowEditModal}>{t('channelItem.rename')}</Dropdown.Item>
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
