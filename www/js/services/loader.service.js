(() => {
  'use strict'

  angular
    .module('whatsapp.services')
    .service('Loader', Loader)

  function Loader($ionicLoading) {

    this.show = show
    this.hide = hide

    function show() {
      $ionicLoading.show({
        template: 'Chargement...',
        noBackdrop: true
      })
    }

    function hide() {
      $ionicLoading.hide()
    }
  }

})()
