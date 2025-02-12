import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import AddChannelModal from './AddChannelModal.jsx';

const ChannelsPanelHeader = ({ submitHandler }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const addChannelButtonStyle = {
    width: '22px',
    height: '22px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
  };

  return (
    <>
      <b>Каналы</b>
      <Button
        variant="outline-primary"
        className="p-0 mx-1"
        onClick={handleShowModal}
        style={addChannelButtonStyle}
      >
        +
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
