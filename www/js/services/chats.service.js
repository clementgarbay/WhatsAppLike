(() => {
  'use strict'

  angular
    .module('whatsapp.services')
    .service('Chats', Chats)

  function Chats() {

    const chats = [
      {
        'id': '12345',
        'name': 'Conversation 1',
        'description': 'Description de la conversation 1',
        'creationDate': '2016-02-12T08:10:56.054Z',
        'private': true,
        'lastMessageDate': '2016-02-12T08:10:56.054Z',
        'lastMessage': 'Dernier message 1 ...'
      },
      {
        'id': '54321',
        'name': 'Conversation 2',
        'description': 'Description de la conversation 2',
        'creationDate': '2016-02-12T08:10:56.054Z',
        'private': true,
        'lastMessageDate': '2016-02-12T08:10:56.054Z',
        'lastMessage': 'Dernier message 2 ...'
      }
    ]

    this.getAll = getAll
    this.get = get

    function getAll() {
      return chats
    }

    function get(chatId) {
      return chats.find(chat => chat.id === chatId)
    }
  }

})()
