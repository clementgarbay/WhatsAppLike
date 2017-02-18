(() => {
  'use strict'

  angular
    .module('whatsapp.directives')
    .directive('checkboxList', checkboxList)

  function checkboxList() {

    function CheckboxListCtrl() {
      const vm = this
      vm.handleChange = handleChange

      vm.selectedElements = {} // {id: boolean}

      init()

      function init() {
        vm.selected.forEach(key => {
          vm.selectedElements[key] = true
        })
      }

      function handleChange() {
        vm.selected = Object.keys(vm.selectedElements).filter(key => {
          return vm.selectedElements[key]
        })
      }
    }

    return {
      templateUrl: '../../../templates/checkbox-list.html',
      bindToController: true,
      controller: CheckboxListCtrl,
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        'elements': '=',
        'keySelector': '&',
        'valueSelector': '&',
        'selected': '='
      }
    }
  }

})()
