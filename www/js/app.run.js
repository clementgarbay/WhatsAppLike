(() => {
  'use strict'

  angular
    .module('whatsapp')
    .run(WhatsAppRun)

  function WhatsAppRun($rootScope, $state, $ionicPlatform, Firebase) {

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });

    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
      if (error === 'AUTH_REQUIRED') {
        $state.go('login')
      }
    })

    Firebase.init();

  }

})()



