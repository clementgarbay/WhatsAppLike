(() => {
  'use strict'

  angular
    .module('whatsapp.controllers')
    .controller('ChatNewCtrl', ChatNewCtrl)

  function ChatNewCtrl($ionicPopup, $state, Contacts, Firebase) {
    const vm = this

    const Chat = Immutable.Record({
      name: null,
      description: null,
      isPrivate: false
    })

    vm.newChat = new Chat().toJS()

    vm.createNewChat = createNewChat
    vm.isSelectedContact = isSelectedContact
    vm.selectContact = selectContact

    init()

    function init() {
      vm.contacts = Contacts.getAll()
    }

    function createNewChat() {
      Firebase
        .addChat(Object.assign({}, vm.newChat, {
          creationDate: new Date().toISOString()
        }))
        .then(res => {
          vm.newChat = new Chat().toJS()
          $state.go('tab.chat', { chatId: res.key })
        }, () => {
          $ionicPopup.alert({
            title: 'Oups!',
            template: 'Une erreur est survenue. Veuillez réessayer...'
          })
        })
    }

    function isSelectedContact(contactId) {
      // TODO
    }

    function selectContact(contactId) {
      // TODO
    }
  }

})()
