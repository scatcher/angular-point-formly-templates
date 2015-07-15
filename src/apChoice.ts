/// <reference path="../typings/tsd.d.ts" />

module ap.formly {
  'use strict';

  export function APFormlyChoice() {

    var directive = {
      scope: {
        key: '=',
        listItem: '=',
        multi: '=',
        options: '='
      },
      controller: APChoiceController,
      controllerAs: 'vm',
      template: '' +
      `<div ng-if="!vm.loading">
          <div ng-if="vm.multi">
              <div ui-select multiple ng-model="vm.listItem[vm.key]">
                  <div ui-select-match placeholder="{{ vm.placeholder }}">{{ $item }}</div>
                  <div ui-select-choices data-repeat="choice in vm.options | filter:$select.search
                      track by $index">{{ choice }}</div>
              </div>
          </div>
          <div ng-if="!vm.multi">
              <div ui-select ng-model="vm.listItem[vm.key]">
                  <div ui-select-match>{{ $select.selected }}</div>
                  <div ui-select-choices data-repeat="choice in vm.options | filter:$select.search
                      track by $index">{{ choice }}</div>
              </div>
          </div>
      </div>
      <span class="form-control" ng-if="vm.loading">loading...</span>`

    };
    return directive;
  }

  interface IControllerScope extends ng.IScope {
    listItem: ListItem<any>;
    options: ng.IPromise<string[]> | string[];
    key: string;
    multi: boolean;
  }


  function createLookupArray(options: string[]) {
    return options.sort();
  }


  class APChoiceController {
    key: string;
    loading = true;
    listItem: ListItem<any>;
    multi: boolean;
    options: ng.IPromise<string[]> | string[];
    constructor($scope: IControllerScope) {
      var vm = this;

      vm.listItem = $scope.listItem;
      vm.key = $scope.key;
      vm.multi = $scope.multi;
      var fieldDefinition = vm.listItem.getFieldDefinition(vm.key);

      if ($scope.options) {
        if ($scope.options.then) {
          /** Options aren't resolved yet */
          $scope.options.then(function(options: string[]) {
            vm.options = createLookupArray(options);
            vm.loading = false;
          });
        } else {
          /** Options passed through directly */
          vm.options = createLookupArray($scope.options);
          vm.loading = false;
        }
      } else if (fieldDefinition.choices || fieldDefinition.Choices) {
        /** Options available on field definition within model */
        vm.options = createLookupArray(fieldDefinition.choices || fieldDefinition.Choices);
        vm.loading = false;
      } else {
        /** Last chance, get list definition from server and look for choices */
        var model = vm.listItem.getModel();

        model.extendListMetadata()
          .then(function() {
            if (fieldDefinition.choices || fieldDefinition.Choices) {
              vm.options = createLookupArray(fieldDefinition.choices || fieldDefinition.Choices);
              vm.loading = false;
            }
          })
      }

    }
  }


}