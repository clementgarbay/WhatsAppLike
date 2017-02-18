(() => {
  'use strict'

  angular
    .module('whatsapp.services')
    .service('Firebase', Firebase)

  function Firebase($q, $firebaseObject, $firebaseArray, FirebaseConfig) {

    let dbRef = null

    this.init = init

    this.getUsersSynchronized = getUsersSynchronized
    this.getUserSynchronized = getUserSynchronized
    this.addUser = addUser

    this.getChatsSynchronized = getChatsSynchronized
    this.getPublicChatsSynchronized = getPublicChatsSynchronized
    this.getPrivateChats = getPrivateChats
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

    function getPublicChatsSynchronized() {
      return $firebaseArray(dbRef
        .child('chats')
        .orderByChild('isPrivate')
        .equalTo(false)
      )
    }

    // TODO: transform this function in a synchronized version (to use three-way binding)
    function getPrivateChats(userId) {
      return $firebaseArray(dbRef
        .child('members')
        .orderByChild(userId)
        .equalTo(true)
      ).$loaded(chatsForMember => {
        return chatsForMember.map(chatForMember => {
          return getChatSynchronized(chatForMember.$id)
        })
      })
    }

    function getChatSynchronized(chatId) {
      return $firebaseObject(dbRef.child('chats').child(chatId))
    }

    function addChat(chat) {
      const keepChatProperties = ({name, description, isPrivate, creationDate}) => ({name, description, isPrivate, creationDate})

      return getChatsSynchronized().$add(keepChatProperties(chat)).then(res => {
        if (chat.isPrivate) {
          const promises = chat.contactIds.map(contactId => {
            return dbRef.child('members').child(res.key).child(contactId).set(true)
          })
          return $q.all(promises).then(() => res.key)
        }
        return res.key
      })
    }

    function removeChat(chatId) {
      return getChatSynchronized(chatId).$remove()
    }

    function getMessagesSynchronized(chatId) {
      return $firebaseArray(dbRef.child('messages').child(chatId))
    }

    function addMessage(chatId, message) {
      return getMessagesSynchronized(chatId).$add(message).then(() => {
        return dbRef.child('chats').child(chatId).update({
          lastMessage: message.text,
          lastMessageDate: message.date
        })
      })
    }
  }

})()
