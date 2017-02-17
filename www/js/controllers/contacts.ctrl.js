(() => {
  'use strict'

  angular
    .module('whatsapp.controllers')
    .controller('ContactsCtrl', ContactsCtrl)

  function ContactsCtrl(Firebase, Auth) {
    const vm = this

    init()

    function init() {
      vm.user = Auth.getUser()
      vm.contacts = Firebase.getUsersSynchronized()
    }

  }

})()
