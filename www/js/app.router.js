(() => {
  'use strict'

  angular
    .module('whatsapp')
    .config(Router)

  function Router($stateProvider, $urlRouterProvider) {

    // See: https://github.com/angular-ui/ui-router
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
      url: '/chats/new?contactId',
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

    .state('tab.settings', {
      url: '/settings',
      cache: false,
      views: {
        'tab-settings': {
          templateUrl: 'templates/settings.html',
          controller: 'SettingsCtrl',
          controllerAs: 'vm'
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

    $urlRouterProvider.otherwise('/login');

  }

})()
