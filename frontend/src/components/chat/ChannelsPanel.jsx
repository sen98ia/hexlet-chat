import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ChannelsPanelHeader from './ChannelsPanelHeader.jsx';
import СhannelItem from './ChannelItem.jsx';
import {
  getChannels,
  addChannel,
  removeChannel,
  editChannel,
} from '../../store/api/channelsApi.js';
import { setActive } from '../../store/slices/channelsSlice.js';
import SpinnerComponent from '../layout/Spinner.jsx';

const ChannelsPanel = () => {
  const {
    data: channels, isLoading, isError, refetch,
  } = getChannels();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const handleSetActive = (channel) => {
    dispatch(setActive(channel));
  };

  const [add] = addChannel();
  const handleSubmitForm = async (channelName) => {
    await add({ name: channelName });
    refetch();
    toast.success(t('toasts.channelAdded'));
  };

  const [remove] = removeChannel();
  const handleRemove = async (id) => {
    await remove(id);
    refetch();
    toast.success(t('toasts.channelRemoved'));
  };

  const [edit] = editChannel();
  const handleEdit = async (id, newChannelName) => {
    await edit({ id, name: newChannelName });
    refetch();
    toast.success(t('toasts.channelEdited'));
  };

  const renderHeader = () => (<ChannelsPanelHeader submitHandler={handleSubmitForm} />);

  if (isLoading) {
    return (
      <SpinnerComponent />
    );
  }

  if (isError) {
    toast.error(t('networkError'));
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
          <Nav fill variant="pills" as="ul" className="flex-column">
            {channels.map((channel) => (
              <СhannelItem
                key={channel.id}
                channel={channel}
                handlers={{ handleRemove, handleEdit, handleSetActive }}
              />
            ))}
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default ChannelsPanel;
