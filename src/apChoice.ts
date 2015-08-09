/// <reference path="../typings/tsd.d.ts" />

module ap.formly {
  'use strict';

  export function APFormlyChoice() {

    var directive = {
      scope: {
        key: '=',
        listItem: '=',
        multi: '=',
        to: '=' //Template Options
      },
      bindToController: true,
      controller: APChoiceController,
      controllerAs: 'vm',
      template: '' +
      `<div ng-if="!vm.loading">
          <div ng-if="vm.multi">
              <div ui-select multiple ng-model="vm.listItem[vm.key]">
                  <div ui-select-match placeholder="{{ vm.placeholder }}">{{ $item }}</div>
                  <div ui-select-choices data-repeat="choice in vm.options | filter:$select.search">{{ choice }}</div>
              </div>
          </div>
          <div ng-if="!vm.multi">
              <div ui-select ng-model="vm.listItem[vm.key]">
                  <div ui-select-match placeholder="{{ vm.placeholder }}">{{ $select.selected }}</div>
                  <div ui-select-choices data-repeat="choice in vm.options | filter:$select.search">{{ choice }}</div>
              </div>
          </div>
      </div>
      <span class="form-control" ng-if="vm.loading">loading...</span>`

    };
    return directive;
  }

  function createChoiceArray(options: string[] = []) {
    return options.sort();
  }

  interface ITemplateOptions extends AngularFormly.ITemplateOptions {
    lookupIdProperty: { (listItem: ListItem<any>): string } | string;
    lookupValueProperty: { (listItem: ListItem<any>): string } | string;
    options: Object[]| IndexedCache<ListItem<any>> | ng.IPromise<Object[]| IndexedCache<ListItem<any>>>;
  }


  class APChoiceController {
    key: string;
    loading = true;
    listItem: ListItem<any>;
    multi: boolean;
    options: string[];
    placeholder: string | number;
    to: ITemplateOptions;
    constructor() {
      var vm = this;
      vm.placeholder = vm.to.placeholder || '';
      var fieldDefinition = vm.listItem.getFieldDefinition(vm.key);

      if (vm.to.options) {
        if (vm.to.options.then) {
          /** Options aren't resolved yet */
          vm.to.options.then(function(options: string[]) {
            vm.options = createChoiceArray(options);
            vm.loading = false;
          });
        } else {
          /** Options passed through directly */
          vm.options = createChoiceArray(vm.to.options);
          vm.loading = false;
        }
      } else if (fieldDefinition.choices || fieldDefinition.Choices) {
        /** Options available on field definition within model */
        vm.options = createChoiceArray(fieldDefinition.choices || fieldDefinition.Choices);
        vm.loading = false;
      } else {
        /** Last chance, get list definition from server and look for choices */
        var model = vm.listItem.getModel();

        model.extendListMetadata()
          .then(function() {
            if (fieldDefinition.choices || fieldDefinition.Choices) {
              vm.options = createChoiceArray(fieldDefinition.choices || fieldDefinition.Choices);
              vm.loading = false;
            }
          })
      }

    }
  }


}