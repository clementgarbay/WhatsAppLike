(() => {
  'use strict'

  angular
    .module('starter.controllers')
    .controller('ChatNewCtrl', ChatNewCtrl)

  function ChatNewCtrl(Contacts) {
    const vm = this

    init()

    function init() {
      vm.contacts = Contacts.getAll()
    }

  }

})()
