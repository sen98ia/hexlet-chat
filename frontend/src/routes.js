const apiPath = '/api/v1';

export default {
  api: {
    loginPath: () => [apiPath, 'login'].join('/'),
    channelsPath: () => [apiPath, 'channels'].join('/'),
    messagesPath: () => [apiPath, 'messages'].join('/'),
    signUpPath: () => [apiPath, 'signup'].join('/'),
    apiPath: () => apiPath,
  },
  pages: {
    login: () => '/login',
    signUp: () => '/signup',
    chat: () => '/',
    notFound: () => '*',
  },
};
