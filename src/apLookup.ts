/// <reference path="../typings/tsd.d.ts" />
module ap.formly {
    'use strict';

    /* @ngInject */
    export function APFormlyLookup() {

        var directive = {
            scope: {
                key: '=',
                listItem: '=',
                multi: '=',
                options: '='

            },
            controller: APLookupController,
            controllerAs: 'vm',
            template: '' +
            `<div ng-if="!vm.loading">
                <div ng-if="vm.multi">
                    <div ui-select multiple ng-model="vm.listItem[vm.key]">
                        <div ui-select-match>{{ $item.lookupValue }}</div>
                        <div ui-select-choices data-repeat="lookup in vm.options | filter:{lookupValue: $select.search}
                            track by lookup.lookupId">{{ lookup.lookupValue }}</div>
                    </div>
                </div>
                <div ng-if="!vm.multi">
                    <div ui-select ng-model="vm.listItem[vm.key]">
                        <div ui-select-match>{{ $select.selected.lookupValue }}</div>
                        <div ui-select-choices data-repeat="lookup in vm.options | filter:{lookupValue: $select.search}
                            track by lookup.lookupId">{{ lookup.lookupValue }}</div>
                    </div>
                </div>
            </div>
            <span ng-if="vm.loading">loading...</span>`

        };
        return directive;
    }

    interface IControllerScope extends ng.IScope {
        key: string;
        listItem: ListItem<any>;
        multi: boolean;
        options: Object[]| IndexedCache<ListItem<any>> | ng.IPromise<Object[]| IndexedCache<ListItem<any>>>;
    }


    function createLookupArray(options, lookupProperty = 'title'): Lookup[] {
        var sortedLookupValues;
        var sampleListItem = _.sample(options);
        if ( sampleListItem.hasOwnProperty('lookupId') ) {
            /** Already valid lookup objects */
            sortedLookupValues = _.sortBy(options, 'lookupValue');
        } else {
            /** List items not yet converted into Lookup objects so convert and sort */
            var sortedOptions = _.sortBy(options, lookupProperty);
            sortedLookupValues = _.map(sortedOptions, function(listItem) {
                return { lookupValue: listItem[lookupProperty], lookupId: listItem.id };
            });
        }
        return sortedLookupValues;
    }


    class APLookupController {
        key: string;
        listItem: Object;
        loading = true;
        multi: boolean;
        options: Lookup[];
        constructor($scope: IControllerScope) {
            var vm = this;

            vm.listItem = $scope.listItem;
            vm.key = $scope.key;
            vm.multi = $scope.multi;

            if ($scope.options.then) {
                /** Options aren't resolved yet */
                $scope.options.then(function(options) {
                    vm.options = createLookupArray(options);
                    vm.loading = false;
                });
            } else {
                vm.options = createLookupArray($scope.options);
                vm.loading = false;
            }

        }
    }

}