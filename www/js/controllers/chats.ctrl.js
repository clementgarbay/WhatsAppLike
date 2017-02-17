(() => {
  'use strict'

  angular
    .module('whatsapp.controllers')
    .controller('ChatsCtrl', ChatsCtrl)

  function ChatsCtrl(Firebase, Loader) {
    const vm = this
    vm.remove = remove

    init()

    function init() {
      Loader.show()
      vm.chats = Firebase.getChatsSynchronized()
      vm.chats.$loaded().then(() => Loader.hide())
    }

    function remove(chatId) {
      Firebase.removeChat(chatId)
    }
  }

})()
