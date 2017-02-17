(() => {
  'use strict'

  angular
    .module('whatsapp.services')
    .service('Firebase', Firebase)

  function Firebase(FirebaseConfig, $firebaseObject, $firebaseArray) {

    let dbRef = null

    this.init = init

    this.getUsersSynchronized = getUsersSynchronized
    this.getUserSynchronized = getUserSynchronized
    this.addUser = addUser

    this.getChatsSynchronized = getChatsSynchronized
    this.getChatSynchronized = getChatSynchronized
    this.addChat = addChat
    this.removeChat = removeChat

    this.getMessagesSynchronized = getMessagesSynchronized
    this.addMessage = addMessage

    function init() {
      firebase.initializeApp(FirebaseConfig);
      dbRef = firebase.database().ref();
    }

    function getUsersSynchronized() {
      return $firebaseArray(dbRef.child('users'))
    }

    function getUserSynchronized(userId) {
      return $firebaseArray(dbRef.child('users').child(userId))
    }

    function addUser(id, firstName, lastName, email) {
      return dbRef.child('users').child(id).set({
        firstName,
        lastName,
        email
      })
    }

    function getChatsSynchronized() {
      return $firebaseArray(dbRef.child('chats'))
    }

    function getChatSynchronized(chatId) {
      return $firebaseObject(dbRef.child('chats').child(chatId))
    }

    function addChat(chat) {
      return getChatsSynchronized().$add(chat)
    }

    function removeChat(chatId) {
      return getChatSynchronized(chatId).$remove()
    }

    function getMessagesSynchronized(chatId) {
      return $firebaseArray(dbRef.child('messages').child(chatId))
    }

    function addMessage(chatId, message) {
      return getMessagesSynchronized(chatId).$add(message)
    }
  }

})()
