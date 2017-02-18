(() => {
  'use strict'

  angular
    .module('whatsapp.controllers')
    .controller('ChatsCtrl', ChatsCtrl)

  function ChatsCtrl(Firebase, Loader, Auth) {
    const vm = this
    vm.remove = remove

    init()

    function init() {
      Loader.show()
      vm.chats = Firebase.getChatsSynchronized()
      vm.chats.$loaded().then(() => Loader.hide())

      vm.publicChats = Firebase.getPublicChatsSynchronized()
      Firebase.getPrivateChats(Auth.getUser().id).then(privateChats => {
        vm.privateChats = privateChats
      })
    }

    function remove(chatId) {
      Firebase.removeChat(chatId)
    }
  }

})()
