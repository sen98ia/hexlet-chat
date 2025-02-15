export default {
  translation: {
    header: {
      title: 'Hexlet Chat',
      logOut: 'Выйти',
    },
    loginForm: {
      title: 'Войти',
      submit: 'Войти',
      fields: {
        username: 'Ваш ник',
        password: 'Пароль',
      },
      error: 'Неверные имя пользователя или пароль',
    },
    loginCard: {
      text: 'Нет аккаута? ',
      link: 'Регистрация',
    },
    registrationForm: {
      title: 'Регистрация',
      submit: 'Зарегистрироваться',
      fields: {
        username: 'Имя пользователя',
        password: 'Пароль',
        passwordConfirmation: 'Подтвердите пароль',
      },
      errors: {
        existingUser: 'Такой пользователь уже существует',
        username: 'От 3 до 20 символов',
        password: 'Не менее 6 символов',
        passwordConfirmation: 'Пароли должны совпадать',
      },
    },
    registrationCard: {
      text: 'Уже есть аккаунт? ',
      link: 'Войти',
    },
    channelsPanelHeader: {
      title: 'Каналы',
      addButton: '+',
      addButtonLabel: 'Добавить канал',
    },
    channelItem: {
      control: 'Управление каналом',
      remove: 'Удалить',
      rename: 'Переименовать',
    },
    modal: {
      addTitle: 'Добавить канал',
      editTitle: 'Переименовать канал',
      removeTitle: 'Удалить канал',
      label: 'Имя канала',
      send: 'Отправить',
      cancel: 'Отменить',
      confirm: 'Уверены?',
      errors: {
        existingChannel: 'Должно быть уникальным',
        channelName: 'От 3 до 20 символов',
      },
    },
    messagesCount: {
      count_one: '{{count}} сообщение',
      count_few: '{{count}} сообщения',
      count_many: '{{count}} сообщений',
    },
    chatForm: {
      placeholder: 'Введите сообщение...',
      sendButton: '→',
    },
    notFoundError: 'Страница не найдена.',
    networkError: 'Ошибка сети',
    requiredField: 'Обязательное поле',
  },
};
