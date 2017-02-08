(() => {
  'use strict'

  angular
    .module('starter.controllers')
    .controller('ChatDetailsCtrl', ChatDetailsCtrl)

  function ChatDetailsCtrl($stateParams, Auth, Chats, Messages) {
    const vm = this

    init()

    function init() {
      vm.user = Auth.getUser()
      vm.chat = Chats.get($stateParams.chatId)
      vm.messages = Messages.getMessages(vm.chat.id)
    }

  }

})()
