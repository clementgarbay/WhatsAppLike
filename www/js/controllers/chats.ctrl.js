(() => {
  'use strict'

  angular
    .module('starter.controllers')
    .controller('ChatsCtrl', ChatsCtrl)

  function ChatsCtrl(Chats) {
    const vm = this

    init();

    function init() {
      vm.chats = Chats.getAll()
    }

  }

})()
