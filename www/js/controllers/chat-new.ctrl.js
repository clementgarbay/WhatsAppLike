(() => {
  'use strict'

  angular
    .module('whatsapp.controllers')
    .controller('ChatNewCtrl', ChatNewCtrl)

  function ChatNewCtrl($state, Popup, Firebase, Auth) {
    const vm = this

    const contactId = $state.params.contactId

    const Chat = Immutable.Record({
      name: null,
      description: null,
      isPrivate: false
    })

    vm.newChat = (contactId) ? new Chat({isPrivate: true}).toJS() : new Chat().toJS()

    vm.createNewChat = createNewChat
    vm.isSelectedContact = isSelectedContact
    vm.selectContact = selectContact

    init()

    function init() {
      vm.user = Auth.getUser()
      vm.contacts = Firebase.getUsersSynchronized()
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
          Popup.alert()
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
