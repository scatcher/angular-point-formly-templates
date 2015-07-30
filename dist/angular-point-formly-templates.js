/// <reference path="../typings/tsd.d.ts" />
var ap;
(function (ap) {
    var formly;
    (function (formly) {
        'use strict';
        function APFormlyChoice() {
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
                    "<div ng-if=\"!vm.loading\">\n          <div ng-if=\"vm.multi\">\n              <div ui-select multiple ng-model=\"vm.listItem[vm.key]\">\n                  <div ui-select-match placeholder=\"{{ vm.placeholder }}\">{{ $item }}</div>\n                  <div ui-select-choices data-repeat=\"choice in vm.options | filter:$select.search\">{{ choice }}</div>\n              </div>\n          </div>\n          <div ng-if=\"!vm.multi\">\n              <div ui-select ng-model=\"vm.listItem[vm.key]\">\n                  <div ui-select-match placeholder=\"{{ vm.placeholder }}\">{{ $item }}</div>\n                  <div ui-select-choices data-repeat=\"choice in vm.options | filter:$select.search\">{{ choice }}</div>\n              </div>\n          </div>\n      </div>\n      <span class=\"form-control\" ng-if=\"vm.loading\">loading...</span>"
            };
            return directive;
        }
        formly.APFormlyChoice = APFormlyChoice;
        function createChoiceArray(options) {
            if (options === void 0) { options = []; }
            return options.sort();
        }
        var APChoiceController = (function () {
            function APChoiceController() {
                this.loading = true;
                var vm = this;
                vm.placeholder = vm.to.placeholder || '';
                var fieldDefinition = vm.listItem.getFieldDefinition(vm.key);
                if (vm.to.options) {
                    if (vm.to.options.then) {
                        /** Options aren't resolved yet */
                        vm.to.options.then(function (options) {
                            vm.options = createChoiceArray(options);
                            vm.loading = false;
                        });
                    }
                    else {
                        /** Options passed through directly */
                        vm.options = createChoiceArray(vm.to.options);
                        vm.loading = false;
                    }
                }
                else if (fieldDefinition.choices || fieldDefinition.Choices) {
                    /** Options available on field definition within model */
                    vm.options = createChoiceArray(fieldDefinition.choices || fieldDefinition.Choices);
                    vm.loading = false;
                }
                else {
                    /** Last chance, get list definition from server and look for choices */
                    var model = vm.listItem.getModel();
                    model.extendListMetadata()
                        .then(function () {
                        if (fieldDefinition.choices || fieldDefinition.Choices) {
                            vm.options = createChoiceArray(fieldDefinition.choices || fieldDefinition.Choices);
                            vm.loading = false;
                        }
                    });
                }
            }
            return APChoiceController;
        })();
    })(formly = ap.formly || (ap.formly = {}));
})(ap || (ap = {}));

/// <reference path="../typings/tsd.d.ts" />
var ap;
(function (ap) {
    var formly;
    (function (formly) {
        'use strict';
        /* @ngInject */
        function APFormlyLookup() {
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
                    "<div ng-if=\"!vm.loading\">\n                <div ng-if=\"vm.multi\">\n                    <div ui-select multiple ng-model=\"vm.listItem[vm.key]\">\n                        <div ui-select-match placeholder=\"{{ vm.placeholder }}\">{{ $item.lookupValue }}</div>\n                        <div ui-select-choices data-repeat=\"lookup in vm.options | filter:{lookupValue: $select.search}\n                            track by lookup.lookupId\">{{ lookup.lookupValue }}</div>\n                    </div>\n                </div>\n                <div ng-if=\"!vm.multi\">\n                    <div ui-select ng-model=\"vm.listItem[vm.key]\">\n                        <div ui-select-match placeholder=\"{{ vm.placeholder }}\">{{ $select.selected.lookupValue }}</div>\n                        <div ui-select-choices data-repeat=\"lookup in vm.options | filter:{lookupValue: $select.search}\n                            track by lookup.lookupId\">{{ lookup.lookupValue }}</div>\n                    </div>\n                </div>\n            </div>\n            <span ng-if=\"vm.loading\">loading...</span>"
            };
            return directive;
        }
        formly.APFormlyLookup = APFormlyLookup;
        function createLookupArray(options, lookupIdProperty, lookupValueProperty) {
            var sortedLookupValues;
            var sampleListItem = _.sample(options);
            if (sampleListItem.hasOwnProperty('lookupId')) {
                /** Already valid lookup objects */
                sortedLookupValues = _.sortBy(options, 'lookupValue');
            }
            else {
                sortedLookupValues = _.chain(options)
                    .map(function (listItem) {
                    return {
                        //Default is to use title for lookupValue and id for lookupId but optionally can pass in the property to use for either or
                        //a funtion to return the value
                        lookupId: _.isFunction(lookupIdProperty) ? lookupIdProperty(listItem) : listItem[lookupIdProperty],
                        //can be calculated with either a function or a property name
                        lookupValue: _.isFunction(lookupValueProperty) ? lookupValueProperty(listItem) : listItem[lookupValueProperty]
                    };
                })
                    .sortBy('lookupValue')
                    .value();
            }
            return sortedLookupValues;
        }
        var APLookupController = (function () {
            function APLookupController() {
                this.loading = true;
                var vm = this;
                //The property to use as the lookupValue if we need to build a Lookup[]
                var lookupIdProperty = vm.to.lookupIdProperty || 'id';
                var lookupValueProperty = vm.to.lookupValueProperty || 'title';
                vm.placeholder = vm.to.placeholder || '';
                if (vm.to.options.then) {
                    /** Options aren't resolved yet */
                    vm.to.options.then(function (options) {
                        vm.options = createLookupArray(options, lookupIdProperty, lookupValueProperty);
                        vm.loading = false;
                    });
                }
                else {
                    vm.options = createLookupArray(vm.to.options, lookupIdProperty, lookupValueProperty);
                    vm.loading = false;
                }
            }
            return APLookupController;
        })();
    })(formly = ap.formly || (ap.formly = {}));
})(ap || (ap = {}));

/// <reference path="apLookup.ts" />
/// <reference path="apChoice.ts" />
/// <reference path="../typings/tsd.d.ts" />
var ap;
(function (ap) {
    var formly;
    (function (formly) {
        'use strict';
        var FormlyTemplates = (function () {
            function FormlyTemplates(formlyConfigProvider) {
                formlyConfigProvider.setType({
                    name: 'lookup',
                    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                    template: "<ap-lookup list-item=\"model\" key=\"options.key\" multi=\"false\" to=\"to\"></ap-lookup>"
                });
                formlyConfigProvider.setType({
                    name: 'lookup-multi',
                    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                    template: "<ap-lookup list-item=\"model\" key=\"options.key\" multi=\"true\" to=\"to\"></ap-lookup>"
                });
                formlyConfigProvider.setType({
                    name: 'ui-date',
                    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                    template: "<input ui-date class=\"form-control\" ng-model=\"model[options.key]\">"
                });
                formlyConfigProvider.setType({
                    name: 'note',
                    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                    template: "<textarea class=\"form-control\" msd-elastic ng-model=\"model[options.key]\"></textarea>"
                });
                formlyConfigProvider.setType({
                    name: 'html',
                    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                    template: "<div text-angular ng-model=\"model[options.key]\"></div>"
                });
                formlyConfigProvider.setType({
                    name: 'choice',
                    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                    template: "<ap-choice list-item=\"model\" key=\"options.key\" to=\"to\"></ap-choice>"
                });
                formlyConfigProvider.setType({
                    name: 'choice-multi',
                    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                    template: "<ap-choice list-item=\"model\" key=\"options.key\" multi=\"true\" to=\"to\"></ap-choice>"
                });
                formlyConfigProvider.setType({
                    name: 'attachments',
                    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                    template: "<span ap-attachments data-list-item=\"model\"></span>" //TODO: Convert apAttachments to use element selector instead of attribute
                });
                formlyConfigProvider.setType({
                    name: 'boolean',
                    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                    template: "<br/><button class=\"btn btn-link\"\n                            ng-click=\"model[options.key] = !model[options.key]\">\n                        <i class=\"fa fa-2x {{ model[options.key] ? 'fa-check-square-o' : 'fa-square-o' }}\"></i>\n                    </button>\n                    <!--Hidden checkbox handles validation-->\n                    <input type=\"checkbox\"\n                           class=\"hidden\"\n                           ng-model=\"model[options.key]\"\n                           ui-validate=\"'validate($value)'\">"
                });
            }
            return FormlyTemplates;
        })();
        formly.FormlyTemplates = FormlyTemplates;
    })(formly = ap.formly || (ap.formly = {}));
})(ap || (ap = {}));

/// <reference path="formlyTemplates.ts" />
var ap;
(function (ap) {
    var formly;
    (function (formly) {
        'use strict';
        angular
            .module('angularPoint')
            .config(ap.formly.FormlyTemplates)
            .directive('apLookup', ap.formly.APFormlyLookup)
            .directive('apChoice', ap.formly.APFormlyChoice);
    })(formly = ap.formly || (ap.formly = {}));
})(ap || (ap = {}));

//# sourceMappingURL=angular-point-formly-templates.js.map