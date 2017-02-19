(() => {
  'use strict'

  angular
    .module('whatsapp.controllers')
    .controller('LoginCtrl', LoginCtrl)

  function LoginCtrl($state, Auth, Popup) {
    const vm = this
    vm.login = login

    init()

    function init() {
      Auth
        .isAuthenticated()
        .then(() => $state.go('tab.contacts'), () => reset())
    }

    function login() {
      if (!!vm.email.length && !!vm.password.length) {
        Auth
          .login(vm.email, vm.password)
          .then(() => {
            reset()
            $state.go('tab.contacts')
          }, () => {
            Popup.alert('Oups!', 'Couple email / mot de passe incorrect')
          })
      }
    }

    function reset() {
      vm.email = null
      vm.password = null
    }
  }

})()
