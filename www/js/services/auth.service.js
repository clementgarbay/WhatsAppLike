(() => {
  'use strict'

  angular
    .module('whatsapp.services')
    .service('Auth', Auth)

  function Auth($firebaseAuth, Firebase) {

    const authObj = $firebaseAuth()

    this.getUser = getUser
    this.isAuthenticated = isAuthenticated
    this.login = login
    this.logout = logout
    this.signup = signup

    function getUser() {
      const {
        uid,
        email,
        displayName
      } = authObj.$getAuth()

      return {
        id: uid,
        email,
        displayName
      }
    }

    function isAuthenticated() {
      return authObj.$requireSignIn()
    }

    function login(email, password) {
      return authObj.$signInWithEmailAndPassword(email, password)
    }

    function logout() {
      return authObj.$signOut()
    }

    function signup(firstName, lastName, email, password) {
      return authObj.$createUserWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
          return firebaseUser.updateProfile({
            displayName: `${firstName} ${lastName}`
          }).then(() => Firebase.addUser(firebaseUser.uid, firstName, lastName, email))
        })
    }
  }

})()
