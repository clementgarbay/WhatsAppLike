(() => {
  'use strict'

  angular
    .module('whatsapp.controllers')
    .controller('LoginCtrl', LoginCtrl)

  function LoginCtrl($state, Auth) {
    const vm = this
    vm.login = login

    init()

    function init() {
      Auth
        .isAuthenticated()
        .then(() => $state.go('tab.contacts'))
    }

    function login(email, password) {
      Auth
        .login(email, password)
        .then(() => {
          $state.go('tab.contacts')
        })
    }
  }

})()
