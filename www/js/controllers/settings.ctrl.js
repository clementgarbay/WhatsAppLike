(() => {
  'use strict'

  angular
    .module('whatsapp.controllers')
    .controller('SettingsCtrl', SettingsCtrl)

  function SettingsCtrl($state, Auth) {
    const vm = this
    vm.logout = logout

    init()

    function init() {
      vm.user = Auth.getUser()
    }

    function logout() {
      Auth
        .logout()
        .then(() => $state.go('login'))
    }
  }

})()
