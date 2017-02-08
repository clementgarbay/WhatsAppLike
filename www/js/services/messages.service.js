(() => {
  'use strict'

  angular
    .module('starter.services')
    .service('Messages', Messages)

  function Messages() {

    const messages = [
      {
        'id': '12345',
        'username': 'Alfredo',
        'userId': '1',
        'chatId': '12345',
        'text': 'Incididunt ipsum aliquip consectetur minim.',
        'date': '2016-02-12T08:10:56.054Z'
      },
      {
        'id': '12345',
        'username': 'Alfreda',
        'userId': '2',
        'chatId': '12345',
        'text': 'Incididunt ipsum aliquip consectetur minim.',
        'date': '2016-02-12T08:10:56.054Z'
      }
    ]

    this.getMessages = getMessages

    function getMessages(chatId) {
      return messages.filter(message => message.chatId === chatId)
    }

    function sendMessage(message, chatId) {
      
    }
  }

})()
