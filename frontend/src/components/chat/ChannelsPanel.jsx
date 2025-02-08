import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Spinner from 'react-bootstrap/Spinner';
import ChannelsPanelHeader from './ChannelsPanelHeader.jsx';
import СhannelItem from './ChannelItem.jsx';
import { getChannels, addChannel, removeChannel, editChannel } from '../../store/api/channelsApi.js';

const ChannelsPanel = () => {
  const { data: channels, isLoading, refetch } = getChannels();
  const [add] = addChannel();

  const handleSubmitForm = (channelName) => {
    add({ name: channelName });
    refetch();
  };

  const renderHeader = () => {
    // почему каналы ререндерятся только, если я вызываю рефетч тут?
    // refetch();
    return (<ChannelsPanelHeader submitHandler={handleSubmitForm} />);
  };

  const [remove] = removeChannel();
  const [edit] = editChannel();

  const handleRemove = (id) => {
    remove(id);
    refetch();
  };

  const handleEdit = (id, newChannelName) => {
    const editedChannel = { name: newChannelName };
    console.log(editedChannel);
    edit(id, editedChannel);
    refetch();
  };

  if (isLoading) {
    return (
      <Container className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="h-100 d-flex flex-column">
      <Row>
        <Col className="d-flex ps-4 pe-2 p-4 mt-1 mb-2 justify-content-between">
          {renderHeader()}
        </Col>
      </Row>
      <Row className="overflow-auto h-100">
        <Col className="px-2 flex-column">
          <Nav fill variant="pills" defaultActiveKey="general" className="flex-column">
            {channels.map((channel) => (
              <СhannelItem
                key={channel.id}
                channel={channel}
                handlers={{ handleRemove, handleEdit }}
              />
            ))}
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default ChannelsPanel;
