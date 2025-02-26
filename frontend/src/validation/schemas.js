import * as Yup from 'yup';

const createChannelSchema = (channelNames, filter, t) => Yup.object().shape({
  channelName: Yup.string()
    .transform((value) => filter.clean(value))
    .min(3, t('modal.errors.channelName'))
    .max(20, t('modal.errors.channelName'))
    .notOneOf(channelNames, t('modal.errors.existingChannel'))
    .required(t('requiredField')),
});

export default createChannelSchema;
