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
                to: '='

            },
            bindToController: true,
            controller: APLookupController,
            controllerAs: 'vm',
            template: '' +
            `<div ng-if="!vm.loading">
                <div ng-if="vm.multi">
                    <div ui-select multiple ng-model="vm.listItem[vm.key]">
                        <div ui-select-match placeholder="{{ vm.placeholder }}">{{ $item.lookupValue }}</div>
                        <div ui-select-choices data-repeat="lookup in vm.options | filter:{lookupValue: $select.search}
                            track by lookup.lookupId">{{ lookup.lookupValue }}</div>
                    </div>
                </div>
                <div ng-if="!vm.multi">
                    <div ui-select ng-model="vm.listItem[vm.key]">
                        <div ui-select-match placeholder="{{ vm.placeholder }}">{{ $select.selected.lookupValue }}</div>
                        <div ui-select-choices data-repeat="lookup in vm.options | filter:{lookupValue: $select.search}
                            track by lookup.lookupId">{{ lookup.lookupValue }}</div>
                    </div>
                </div>
            </div>
            <span ng-if="vm.loading">loading...</span>`

        };
        return directive;
    }

    function createLookupArray(options, lookupIdProperty: { (listItem: ListItem<any>): string } | string, lookupValueProperty: { (listItem: ListItem<any>): string } | string): Lookup[] {
        var sortedLookupValues = [];
        var sampleListItem = _.sample(options);
        if (sampleListItem && sampleListItem.hasOwnProperty('lookupId')) {
            /** Already valid lookup objects */
            sortedLookupValues = _.sortBy(options, 'lookupValue');
        } else if (sampleListItem) {
            /** List items that need to ve converted into lookup objects */
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
    
    interface ITemplateOptions extends AngularFormly.ITemplateOptions {
        lookupIdProperty: { (listItem: ListItem<any>): string } | string;
        lookupValueProperty: { (listItem: ListItem<any>): string } | string;
        options: Object[] | IndexedCache<ListItem<any>> | ng.IPromise<Object[] | IndexedCache<ListItem<any>>>;
    }


    class APLookupController {
        key: string;
        listItem: Object;
        loading = true;
        multi: boolean;
        options: Lookup[];
        placeholder: string | number;
        to: ITemplateOptions;
        constructor() {
            var vm = this;
            //The property to use as the lookupValue if we need to build a Lookup[]
            var lookupIdProperty = vm.to.lookupIdProperty || 'id';
            var lookupValueProperty = vm.to.lookupValueProperty || 'title';
            
            vm.placeholder = vm.to.placeholder || '';

            if (vm.to.options.then) {
                /** Options aren't resolved yet */
                vm.to.options.then(function(options) {
                    vm.options = createLookupArray(options, lookupIdProperty, lookupValueProperty);
                    vm.loading = false;
                });
            } else {
                vm.options = createLookupArray(vm.to.options, lookupIdProperty, lookupValueProperty);
                vm.loading = false;
            }

        }
    }

}