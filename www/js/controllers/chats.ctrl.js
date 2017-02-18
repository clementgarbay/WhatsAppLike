(() => {
  'use strict'

  angular
    .module('whatsapp.controllers')
    .controller('ChatsCtrl', ChatsCtrl)

  function ChatsCtrl($scope, $q, Firebase, Loader, Auth) {
    const vm = this
    vm.remove = remove

    init()

    function init() {
      Loader.show()

      vm.publicChats = Firebase.getPublicChatsSynchronized()
      $q.all([vm.publicChats.$loaded(), fetchPrivateChats()])
        .then(() => Loader.hide())

      $scope.$on('$ionicView.beforeEnter', () => {
        fetchPrivateChats()
      })
    }

    function remove(chatId) {
      Firebase.removeChat(chatId)
    }

    function fetchPrivateChats() {
      return Firebase.getPrivateChats(Auth.getUser().id).then(privateChats => {
        vm.privateChats = privateChats
      })
    }
  }

})()
