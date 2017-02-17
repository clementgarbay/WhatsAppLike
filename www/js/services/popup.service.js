(() => {
  'use strict'

  angular
    .module('whatsapp.services')
    .service('Popup', Popup)

  function Popup($ionicPopup) {

    const defaultTitle = 'Oups!'
    const defaultMessage = 'Une erreur est survenue. Veuillez réessayer...'

    this.alert = alert

    function alert(title = defaultTitle, message = defaultMessage) {
      $ionicPopup.alert({
        title: title,
        template: message
      })
    }

  }

})()
