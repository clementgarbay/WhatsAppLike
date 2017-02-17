(() => {
  'use strict'

  angular
    .module('whatsapp')
    .config(Router)

  function Router($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      resolve: {
        'currentAuth': function(Auth) {
          return Auth.isAuthenticated()
        }
      }
    })

    .state('tab.contacts', {
      url: '/contacts',
      views: {
        'tab-contacts': {
          templateUrl: 'templates/contacts.html',
          controller: 'ContactsCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chats.html',
          controller: 'ChatsCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('tab.chat-new', {
      url: '/chats/new',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-new.html',
          controller: 'ChatNewCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('tab.chat', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat.html',
          controller: 'ChatCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/account.html',
          controller: 'AccountCtrl'
        }
      }
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'vm'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignupCtrl',
      controllerAs: 'vm'
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/contacts');

  }

})()
