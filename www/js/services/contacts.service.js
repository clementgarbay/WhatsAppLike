(() => {
  'use strict'

  angular
    .module('whatsapp.services')
    .service('Contacts', Contacts)

  function Contacts() {

    const contacts = [
      {
        'id': '1',
        'email': 'alfred.jean@gmail.com',
        'firstName': 'Alfred',
        'lastName': 'Jean'
      },
      {
        'id': '2',
        'email': 'alfreda.fleur@gmail.com',
        'firstName': 'Alfreda',
        'lastName': 'Fleur'
      }
    ]

    this.getAll = getAll
    this.get = get

    function getAll() {
      return contacts
    }

    function get(contactId) {
      return contacts.find(contact => contact.id === contactId)
    }
  }

})()
