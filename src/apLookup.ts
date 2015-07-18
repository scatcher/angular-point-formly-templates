/// <reference path="../typings/tsd.d.ts" />

module ap.formly {
    'use strict';

    /* @ngInject */
    export function APFormlyLookup() {

        var directive = {
            scope: {
                key: '=',
                listItem: '=',
                lookupIdProperty: '=',
                lookupValueProperty: '=',
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
        lookupIdProperty: { (listItem: ListItem<any>): string } | string;
        lookupValueProperty: { (listItem: ListItem<any>): string } | string;
        multi: boolean;
        options: Object[] | IndexedCache<ListItem<any>> | ng.IPromise<Object[] | IndexedCache<ListItem<any>>>;
    }


    function createLookupArray(options, lookupIdProperty: { (listItem: ListItem<any>): string } | string, lookupValueProperty: { (listItem: ListItem<any>): string } | string): Lookup[] {
        var sortedLookupValues;
        var sampleListItem = _.sample(options);
        if (sampleListItem.hasOwnProperty('lookupId')) {
            /** Already valid lookup objects */
            sortedLookupValues = _.sortBy(options, 'lookupValue');
        } else {
            sortedLookupValues = _.chain(options)
                .map(function(listItem: ListItem<any>) {
                    return {
                        //Default is to use title for lookupValue and id for lookupId but optionally can pass in the property to use for either or
                        //a funtion to return the value
                        lookupId: _.isFunction(lookupIdProperty) ? lookupIdProperty(listItem) : listItem[lookupIdProperty],
                        //can be calculated with either a function or a property name
                        lookupValue: _.isFunction(lookupValueProperty) ? lookupValueProperty(listItem) : listItem[lookupValueProperty]
                    }
                })
                .sortBy('lookupValue')
                .value();
        }
        return sortedLookupValues;
    }


    class APLookupController {
        key: string;
        listItem: Object;
        lookupValueProperty: string;
        loading = true;
        multi: boolean;
        options: Lookup[];
        constructor($scope: IControllerScope) {
            var vm = this;
            //The property to use as the lookupValue if we need to build a Lookup[]
            var lookupIdProperty = $scope.lookupIdProperty || 'id';
            var lookupValueProperty = $scope.lookupValueProperty || 'title';

            vm.listItem = $scope.listItem;
            vm.key = $scope.key;
            vm.multi = $scope.multi;

            if ($scope.options.then) {
                /** Options aren't resolved yet */
                $scope.options.then(function(options) {
                    vm.options = createLookupArray(options, lookupIdProperty, lookupValueProperty);
                    vm.loading = false;
                });
            } else {
                vm.options = createLookupArray($scope.options, lookupIdProperty, lookupValueProperty);
                vm.loading = false;
            }

        }
    }

}