(() => {
  'use strict'

  angular
    .module('whatsapp.controllers')
    .controller('SignupCtrl', SignupCtrl)

  function SignupCtrl($state, Popup, Auth) {
    const vm = this

    const User = Immutable.Record({
      firstName: null,
      lastName: null,
      email: null,
      password: null
    })

    vm.newUser = new User().toJS()

    vm.signup = signup

    function signup() {
      Auth
        .signup(vm.newUser.firstName, vm.newUser.lastName, vm.newUser.email, vm.newUser.password)
        .then(() => {
          vm.newUser = new User().toJS()
          $state.go('tab.contacts')
        }, error => {
          Popup.alert('Oups!', 'Une erreur est survenue. ' + error)
        })
    }

  }

})()
