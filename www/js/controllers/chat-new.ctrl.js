(() => {
  'use strict'

  angular
    .module('whatsapp.controllers')
    .controller('ChatNewCtrl', ChatNewCtrl)

  function ChatNewCtrl($state, Popup, Firebase, Auth) {
    const vm = this

    const userId = Auth.getUser().id
    const contactIdFromUrl = $state.params.contactId

    const Chat = Immutable.Record({
      name: null,
      description: null,
      isPrivate: false,
      contactIds: [] // an array of contact ids who partake in the chat (without the connected user)
    })

    vm.newChat = (contactIdFromUrl) ? new Chat({isPrivate: true, contactIds: [contactIdFromUrl]}).toJS() : new Chat().toJS()

    vm.createNewChat = createNewChat
    vm.idSelector = idSelector
    vm.usernameSelector = usernameSelector

    init()

    function init() {
      Firebase.getUsersSynchronized().$loaded(contacts => {
        vm.contacts = contacts.filter(contact => contact.$id !== userId)
      })
    }

    function createNewChat() {
      Firebase
        .addChat(Object.assign({}, vm.newChat, {
          contactIds: [...vm.newChat.contactIds, userId],
          creationDate: new Date().toISOString()
        }))
        .then(chatId => {
          vm.newChat = new Chat().toJS()
          $state.go('tab.chat', { chatId })
        }, () => {
          Popup.alert()
        })
    }

    // Helpers for checkbox-list

    function idSelector(element) {
      return element.$id
    }

    function usernameSelector(element) {
      return `${element.firstName} ${element.lastName}`
    }
  }

})()
