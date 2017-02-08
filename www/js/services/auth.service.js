(() => {
  'use strict'

  angular
    .module('starter.services')
    .service('Auth', Auth)

  function Auth(Contacts) {

    this.getUser = getUser

    function getUser() {
      return Contacts.get('1')
    }
  }

})()
