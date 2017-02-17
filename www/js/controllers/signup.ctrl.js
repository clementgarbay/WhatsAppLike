(() => {
  'use strict'

  angular
    .module('whatsapp.controllers')
    .controller('SignupCtrl', SignupCtrl)

  function SignupCtrl($state, $ionicPopup, Auth) {
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
          $ionicPopup.alert({
            title: 'Oups!',
            template: 'Une erreur est survenue. ' + error
          })
        })
    }

  }

})()
