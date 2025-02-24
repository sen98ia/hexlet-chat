import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import EditChannelModal from './EditChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import { getActiveChannelIdSelector } from '../../store/selectors/channelsSelectors.js';

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

  const activeChannelId = useSelector(getActiveChannelIdSelector);

  if (!channel.removable) {
    return (
      <Nav.Item as="li" className="w-100">
        <Button
          variant={activeChannelId === channel.id ? 'secondary' : ''}
          onClick={() => handlers.handleSetActive(channel)}
          className="w-100 rounded-0 text-start text-truncate"
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item as="li" className="w-100">
      <Dropdown as={ButtonGroup} className="w-100">
        <Button
          variant={activeChannelId === channel.id ? 'secondary' : ''}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => handlers.handleSetActive(channel)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
        <Dropdown.Toggle split variant={activeChannelId === channel.id ? 'secondary' : ''}>
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
