import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import AddChannelModal from './AddChannelModal.jsx';

const ChannelsPanelHeader = ({ submitHandler }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const { t } = useTranslation();

  return (
    <>
      <b>{t('channelsPanelHeader.title')}</b>
      <Button
        variant="outline-primary"
        id="addChannelButton"
        className="p-0 mx-1"
        onClick={handleShowModal}
        aria-label={t('channelsPanelHeader.addButtonLabel')}
      >
        {t('channelsPanelHeader.addButton')}
      </Button>
      <AddChannelModal
        submitHandler={submitHandler}
        showModalHandler={showModal}
        closeModalHandler={handleCloseModal}
      />
    </>
  );
};

export default ChannelsPanelHeader;
