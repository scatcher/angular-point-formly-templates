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
                    options: '='
                },
                controller: APChoiceController,
                controllerAs: 'vm',
                template: '' +
                    "<div ng-if=\"!vm.loading\">\n          <div ng-if=\"vm.multi\">\n              <div ui-select multiple ng-model=\"vm.listItem[vm.key]\">\n                  <div ui-select-match placeholder=\"{{ vm.placeholder }}\">{{ $item }}</div>\n                  <div ui-select-choices data-repeat=\"choice in vm.options | filter:$select.search\n                      track by $index\">{{ choice }}</div>\n              </div>\n          </div>\n          <div ng-if=\"!vm.multi\">\n              <div ui-select ng-model=\"vm.listItem[vm.key]\">\n                  <div ui-select-match>{{ $select.selected }}</div>\n                  <div ui-select-choices data-repeat=\"choice in vm.options | filter:$select.search\n                      track by $index\">{{ choice }}</div>\n              </div>\n          </div>\n      </div>\n      <span class=\"form-control\" ng-if=\"vm.loading\">loading...</span>"
            };
            return directive;
        }
        formly.APFormlyChoice = APFormlyChoice;
        function createLookupArray(options) {
            return options.sort();
        }
        var APChoiceController = (function () {
            function APChoiceController($scope) {
                this.loading = true;
                var vm = this;
                vm.listItem = $scope.listItem;
                vm.key = $scope.key;
                vm.multi = $scope.multi;
                var fieldDefinition = vm.listItem.getFieldDefinition(vm.key);
                if ($scope.options) {
                    if ($scope.options.then) {
                        /** Options aren't resolved yet */
                        $scope.options.then(function (options) {
                            vm.options = createLookupArray(options);
                            vm.loading = false;
                        });
                    }
                    else {
                        /** Options passed through directly */
                        vm.options = createLookupArray($scope.options);
                        vm.loading = false;
                    }
                }
                else if (fieldDefinition.choices || fieldDefinition.Choices) {
                    /** Options available on field definition within model */
                    vm.options = createLookupArray(fieldDefinition.choices || fieldDefinition.Choices);
                    vm.loading = false;
                }
                else {
                    /** Last chance, get list definition from server and look for choices */
                    var model = vm.listItem.getModel();
                    model.extendListMetadata()
                        .then(function () {
                        if (fieldDefinition.choices || fieldDefinition.Choices) {
                            vm.options = createLookupArray(fieldDefinition.choices || fieldDefinition.Choices);
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
                    options: '='
                },
                controller: APLookupController,
                controllerAs: 'vm',
                template: '' +
                    "<div ng-if=\"!vm.loading\">\n                <div ng-if=\"vm.multi\">\n                    <div ui-select multiple ng-model=\"vm.listItem[vm.key]\">\n                        <div ui-select-match>{{ $item.lookupValue }}</div>\n                        <div ui-select-choices data-repeat=\"lookup in vm.options | filter:{lookupValue: $select.search}\n                            track by lookup.lookupId\">{{ lookup.lookupValue }}</div>\n                    </div>\n                </div>\n                <div ng-if=\"!vm.multi\">\n                    <div ui-select ng-model=\"vm.listItem[vm.key]\">\n                        <div ui-select-match>{{ $select.selected.lookupValue }}</div>\n                        <div ui-select-choices data-repeat=\"lookup in vm.options | filter:{lookupValue: $select.search}\n                            track by lookup.lookupId\">{{ lookup.lookupValue }}</div>\n                    </div>\n                </div>\n            </div>\n            <span ng-if=\"vm.loading\">loading...</span>"
            };
            return directive;
        }
        formly.APFormlyLookup = APFormlyLookup;
        function createLookupArray(options, lookupProperty) {
            if (lookupProperty === void 0) { lookupProperty = 'title'; }
            var sortedLookupValues;
            var sampleListItem = _.sample(options);
            if (sampleListItem.hasOwnProperty('lookupId')) {
                /** Already valid lookup objects */
                sortedLookupValues = _.sortBy(options, 'lookupValue');
            }
            else {
                /** List items not yet converted into Lookup objects so convert and sort */
                var sortedOptions = _.sortBy(options, lookupProperty);
                sortedLookupValues = _.map(sortedOptions, function (listItem) {
                    return { lookupValue: listItem[lookupProperty], lookupId: listItem.id };
                });
            }
            return sortedLookupValues;
        }
        var APLookupController = (function () {
            function APLookupController($scope) {
                this.loading = true;
                var vm = this;
                vm.listItem = $scope.listItem;
                vm.key = $scope.key;
                vm.multi = $scope.multi;
                if ($scope.options.then) {
                    /** Options aren't resolved yet */
                    $scope.options.then(function (options) {
                        vm.options = createLookupArray(options);
                        vm.loading = false;
                    });
                }
                else {
                    vm.options = createLookupArray($scope.options);
                    vm.loading = false;
                }
            }
            return APLookupController;
        })();
    })(formly = ap.formly || (ap.formly = {}));
})(ap || (ap = {}));

/// <reference path="apLookup.ts" />
/// <reference path="apChoice.ts" />
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
                    template: "<ap-lookup list-item=\"model\" key=\"options.key\" multi=\"false\" options=\"to.options\"></ap-lookup>"
                });
                formlyConfigProvider.setType({
                    name: 'lookup-multi',
                    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                    template: "<ap-lookup list-item=\"model\" key=\"options.key\" multi=\"true\" options=\"to.options\"></ap-lookup>"
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
                    template: "<ap-choice list-item=\"model\" key=\"options.key\" options=\"to.options\"></ap-choice>"
                });
                formlyConfigProvider.setType({
                    name: 'choice-multi',
                    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                    template: "<ap-choice list-item=\"model\" key=\"options.key\" options=\"to.options\" multi=\"true\"></ap-choice>"
                });
                formlyConfigProvider.setType({
                    name: 'attachments',
                    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                    template: "<span ap-attachments data-list-item=\"model\"></span>" //TODO: Convert apAttachments to use element selector instead of attribute
                });
                formlyConfigProvider.setType({
                    name: 'boolean',
                    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                    template: "\n                <button class=\"btn btn-link\"\n                        ng-click=\"model[options.key] = !model[options.key]\">\n                    <i class=\"fa fa-2x {{ model[options.key] ? 'fa-check-square-o' : 'fa-square-o' }}\"></i>\n                </button>\n                <!--Hidden checkbox handles validation-->\n                <input type=\"checkbox\"\n                       class=\"hidden\"\n                       ng-model=\"model[options.key]\"\n                       ui-validate=\"'validate($value)'\">"
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