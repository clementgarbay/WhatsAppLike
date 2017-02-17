(() => {
  'use strict'

  angular
    .module('whatsapp.controllers')
    .controller('ChatCtrl', ChatCtrl)

  function ChatCtrl($stateParams, $q, $ionicPopup, $ionicScrollDelegate, Auth, Firebase, Loader) {
    const vm = this
    vm.sendMessage = sendMessage

    const chatId = $stateParams.chatId

    const Message = Immutable.Record({
      sender: null,
      senderId: null,
      text: '',
      date: null
    })

    vm.newMessage = new Message().toJS()

    init()

    function init() {
      Loader.show()

      vm.user = Auth.getUser()
      vm.chat = Firebase.getChatSynchronized(chatId)
      vm.messages = Firebase.getMessagesSynchronized(chatId)

      $q.all([vm.chat.$loaded(), vm.messages.$loaded()])
        .then(() => Loader.hide())

      vm.messages.$watch(() => scrollBottom())
    }

    function sendMessage() {
      Firebase
        .addMessage(chatId, Object.assign({}, vm.newMessage, {
          sender: vm.user.displayName,
          senderId: vm.user.id,
          date: new Date().toISOString()
        }))
        .then(() => {
          vm.newMessage = new Message().toJS()
        }, () => {
          $ionicPopup.alert({
            title: 'Oups!',
            template: 'Une erreur est survenue. Veuillez réessayer...'
          })
        })
    }

    function scrollBottom() {
      $ionicScrollDelegate.scrollBottom()
    }
  }

})()
