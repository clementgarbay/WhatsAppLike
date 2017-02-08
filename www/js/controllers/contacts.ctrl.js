(() => {
  'use strict'

  angular
    .module('starter.controllers')
    .controller('ContactsCtrl', ContactsCtrl)

  function ContactsCtrl(Contacts) {
    const vm = this

    init()

    function init() {
      vm.contacts = Contacts.getAll()
    }

  }

})()
