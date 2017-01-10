(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular-point"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["angular-point", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["angular-point-formly-templates"] = factory(require("angular-point"), require("lodash"));
	else
		root["angular-point-formly-templates"] = factory(root["angular-point"], root["lodash"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return APFormlyChoiceComponent; });
function createChoiceArray(options) {
    if (options === void 0) { options = []; }
    return options.sort();
}
var APChoiceController = (function () {
    function APChoiceController() {
        this.loading = true;
    }
    APChoiceController.prototype.$onInit = function () {
        var $ctrl = this;
        $ctrl.placeholder = $ctrl.to.placeholder || '';
        var fieldDefinition = $ctrl.listItem.getFieldDefinition($ctrl.key);
        if ($ctrl.to.options) {
            if ($ctrl.to.options.then) {
                /** Options aren't resolved yet */
                $ctrl.to.options.then(function (options) {
                    $ctrl.options = createChoiceArray(options);
                    $ctrl.loading = false;
                });
            }
            else {
                /** Options passed through directly */
                $ctrl.options = createChoiceArray($ctrl.to.options);
                $ctrl.loading = false;
            }
        }
        else if (fieldDefinition.choices || fieldDefinition.Choices) {
            /** Options available on field definition within model */
            $ctrl.options = createChoiceArray(fieldDefinition.choices || fieldDefinition.Choices);
            $ctrl.loading = false;
        }
        else {
            /** Last chance, get list definition from server and look for choices */
            var model = $ctrl.listItem.getModel();
            model.extendListMetadata()
                .then(function () {
                if (fieldDefinition.choices || fieldDefinition.Choices) {
                    $ctrl.options = createChoiceArray(fieldDefinition.choices || fieldDefinition.Choices);
                    $ctrl.loading = false;
                }
            });
        }
    };
    return APChoiceController;
}());
APChoiceController.$inject = [];
var APFormlyChoiceComponent = {
    bindings: {
        key: '<',
        listItem: '<',
        multi: '<',
        to: '=' //Template Options
    },
    controller: APChoiceController,
    template: '' +
        "<div ng-if=\"!$ctrl.loading\">\n        <div ng-if=\"$ctrl.multi\">\n            <ui-select multiple ng-model=\"$ctrl.listItem[$ctrl.key]\" ng-disabled=\"$ctrl.to.disabled\">\n                <ui-select-match placeholder=\"{{ $ctrl.placeholder }}\">{{ $item }}</ui-select-match>\n                <ui-select-choices data-repeat=\"choice in $ctrl.options | filter:$select.search\">{{ choice }}</ui-select-choices>\n            </ui-select>\n        </div>\n        <div ng-if=\"!$ctrl.multi\">\n            <ui-select ng-model=\"$ctrl.listItem[$ctrl.key]\" ng-disabled=\"$ctrl.to.disabled\">\n                <ui-select-match placeholder=\"{{ $ctrl.placeholder }}\">{{ $select.selected }}</ui-select-match>\n                <ui-select-choices data-repeat=\"choice in $ctrl.options | filter:$select.search\">{{ choice }}</ui-select-choices>\n            </ui-select>\n        </div>\n    </div>\n    <span class=\"form-control\" ng-if=\"$ctrl.loading\">loading...</span>"
};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return APFormlyLookupComponent; });

function createLookupArray(options, lookupIdProperty, lookupValueProperty) {
    var sortedLookupValues = [];
    var sampleListItem = __WEBPACK_IMPORTED_MODULE_0_lodash__["sample"](options);
    if (sampleListItem && sampleListItem.hasOwnProperty('lookupId')) {
        /** Already valid lookup objects */
        sortedLookupValues = __WEBPACK_IMPORTED_MODULE_0_lodash__["sortBy"](options, 'lookupValue');
    }
    else if (sampleListItem) {
        /** List items that need to ve converted into lookup objects */
        sortedLookupValues = __WEBPACK_IMPORTED_MODULE_0_lodash__["chain"](options)
            .map(function (listItem) {
            return {
                // Default is to use title for lookupValue and id for lookupId but optionally can pass in the property
                // to use for either or a function to return the value
                lookupId: __WEBPACK_IMPORTED_MODULE_0_lodash__["isFunction"](lookupIdProperty) ? lookupIdProperty(listItem) : listItem[lookupIdProperty],
                // can be calculated with either a function or a property name
                lookupValue: __WEBPACK_IMPORTED_MODULE_0_lodash__["isFunction"](lookupValueProperty) ? lookupValueProperty(listItem) : listItem[lookupValueProperty]
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
    }
    APLookupController.prototype.$onInit = function () {
        var $ctrl = this;
        // The property to use as the lookupValue if we need to build a Lookup[]
        var lookupIdProperty = $ctrl.to.lookupIdProperty || 'id';
        var lookupValueProperty = $ctrl.to.lookupValueProperty || 'title';
        $ctrl.placeholder = $ctrl.to.placeholder || '';
        if ($ctrl.to.options.then) {
            /** Options aren't resolved yet */
            $ctrl.to.options.then(function (options) {
                $ctrl.options = createLookupArray(options, lookupIdProperty, lookupValueProperty);
                $ctrl.loading = false;
            });
        }
        else {
            $ctrl.options = createLookupArray($ctrl.to.options, lookupIdProperty, lookupValueProperty);
            $ctrl.loading = false;
        }
    };
    return APLookupController;
}());
APLookupController.$inject = [];
var APFormlyLookupComponent = {
    bindings: {
        key: '<',
        listItem: '<',
        multi: '<',
        to: '='
    },
    controller: APLookupController,
    template: '' +
        "<div ng-if=\"!$ctrl.loading\">\n        <div ng-if=\"$ctrl.multi\">\n            <ui-select multiple ng-model=\"$ctrl.listItem[$ctrl.key]\" ng-disabled=\"$ctrl.to.disabled\">\n                <ui-select-match placeholder=\"{{ $ctrl.placeholder }}\">{{ $item.lookupValue }}</ui-select-match>\n                <ui-select-choices data-repeat=\"lookup in $ctrl.options | filter:{lookupValue: $select.search}\n                    track by lookup.lookupId\">{{ lookup.lookupValue }}</ui-select-choices>\n            </ui-select>\n        </div>\n        <div ng-if=\"!$ctrl.multi\">\n            <ui-select ng-model=\"$ctrl.listItem[$ctrl.key]\" ng-disabled=\"$ctrl.to.disabled\">\n                <ui-select-match placeholder=\"{{ $ctrl.placeholder }}\">{{ $select.selected.lookupValue }}</ui-select-match>\n                <ui-select-choices data-repeat=\"lookup in $ctrl.options | filter:{lookupValue: $select.search}\n                    track by lookup.lookupId\">{{ lookup.lookupValue }}</ui-select-choices>\n            </ui-select>\n        </div>\n    </div>\n    <span ng-if=\"$ctrl.loading\">loading...</span>"
};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return FormlyTemplates; });
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
            template: "<ap-attachments list-item=\"model\"></ap-attachments>"
        });
        formlyConfigProvider.setType({
            name: 'boolean',
            wrapper: ['bootstrapLabel', 'bootstrapHasError'],
            template: "<br/>\n\n        <button class=\"btn btn-link\" ng-click=\"model[options.key] = !model[options.key]\">\n              <i class=\"fa fa-2x {{ model[options.key] ? 'fa-check-square-o' : 'fa-square-o' }}\"></i>\n        </button>\n  \n        <!--Hidden checkbox handles validation-->\n        <input type=\"checkbox\"\n                class=\"hidden\"\n                ng-model=\"model[options.key]\"\n                ui-validate=\"'validate($value)'\">"
        });
    }
    return FormlyTemplates;
}());

FormlyTemplates.$inject = ['formlyConfigProvider'];


/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("angular-point");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("lodash");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular_point__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular_point___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular_point__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apLookup__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apChoice__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__formlyTemplates__ = __webpack_require__(2);

// import {AngularPointModule} from '../angular-point/app.module';



// angular
//     .module('angularPoint')
__WEBPACK_IMPORTED_MODULE_0_angular_point__["AngularPointModule"]
    .config(__WEBPACK_IMPORTED_MODULE_3__formlyTemplates__["a" /* FormlyTemplates */])
    .component('apLookup', __WEBPACK_IMPORTED_MODULE_1__apLookup__["a" /* APFormlyLookupComponent */])
    .component('apChoice', __WEBPACK_IMPORTED_MODULE_2__apChoice__["a" /* APFormlyChoiceComponent */]);


/***/ }
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjMTRlZmYzZWY1Njk4MjQwODNiMyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBDaG9pY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwTG9va3VwLnRzIiwid2VicGFjazovLy8uL3NyYy9mb3JtbHlUZW1wbGF0ZXMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYW5ndWxhci1wb2ludFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUN4REE7QUFBQSwyQkFBMkIsT0FBc0I7SUFBdEIsc0NBQXNCO0lBQzdDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDMUIsQ0FBQztBQVNEO0lBQUE7UUFHSSxZQUFPLEdBQUcsSUFBSSxDQUFDO0lBMENuQixDQUFDO0lBbkNHLG9DQUFPLEdBQVA7UUFDSSxJQUFN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Q0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQzs7QUFwRVEsdUJBQU8sR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Ozs7Ozs7QUNINUMsMEM7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7Ozs7QUNFaUQ7QUFDakQsa0VBQWtFO0FBRWI7QUFDQTtBQUNEO0FBR3BELFVBQVU7QUFDViw4QkFBOEI7QUFDOUIsaUVBQWtCO0tBQ2IsTUFBTSxDQUFDLHlFQUFlLENBQUM7S0FDdkIsU0FBUyxDQUFDLFVBQVUsRUFBRSwwRUFBdUIsQ0FBQztLQUM5QyxTQUFTLENBQUMsVUFBVSxFQUFFLDBFQUF1QixDQUFDLENBQUMiLCJmaWxlIjoiYW5ndWxhci1wb2ludC1mb3JtbHktdGVtcGxhdGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhci1wb2ludFwiKSwgcmVxdWlyZShcImxvZGFzaFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhbmd1bGFyLXBvaW50XCIsIFwibG9kYXNoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFuZ3VsYXItcG9pbnQtZm9ybWx5LXRlbXBsYXRlc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImFuZ3VsYXItcG9pbnRcIiksIHJlcXVpcmUoXCJsb2Rhc2hcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFuZ3VsYXItcG9pbnQtZm9ybWx5LXRlbXBsYXRlc1wiXSA9IGZhY3Rvcnkocm9vdFtcImFuZ3VsYXItcG9pbnRcIl0sIHJvb3RbXCJsb2Rhc2hcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb3J5IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vcnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzE0ZWZmM2VmNTY5ODI0MDgzYjMiLCIvLyBpbXBvcnQgeyBMaXN0SXRlbSB9IGZyb20gJy4uL2FuZ3VsYXItcG9pbnQvZmFjdG9yaWVzL2FwTGlzdEl0ZW1GYWN0b3J5Jztcbi8vIGltcG9ydCB7IEluZGV4ZWRDYWNoZSB9IGZyb20gJy4uL2FuZ3VsYXItcG9pbnQvZmFjdG9yaWVzL2FwSW5kZXhlZENhY2hlRmFjdG9yeSc7XG5pbXBvcnQgeyBJbmRleGVkQ2FjaGUsIExpc3RJdGVtIH0gZnJvbSAnYW5ndWxhci1wb2ludCc7XG5cblxuXG5mdW5jdGlvbiBjcmVhdGVDaG9pY2VBcnJheShvcHRpb25zOiBzdHJpbmdbXSA9IFtdKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuc29ydCgpO1xufVxuXG5pbnRlcmZhY2UgSVRlbXBsYXRlT3B0aW9ucyBleHRlbmRzIEFuZ3VsYXJGb3JtbHkuSVRlbXBsYXRlT3B0aW9ucyB7XG4gICAgbG9va3VwSWRQcm9wZXJ0eTogeyAobGlzdEl0ZW06IExpc3RJdGVtPGFueT4pOiBzdHJpbmcgfSB8IHN0cmluZztcbiAgICBsb29rdXBWYWx1ZVByb3BlcnR5OiB7IChsaXN0SXRlbTogTGlzdEl0ZW08YW55Pik6IHN0cmluZyB9IHwgc3RyaW5nO1xuICAgIG9wdGlvbnM6IE9iamVjdFtdIHwgSW5kZXhlZENhY2hlPExpc3RJdGVtPGFueT4+IHwgbmcuSVByb21pc2U8T2JqZWN0W10gfCBJbmRleGVkQ2FjaGU8TGlzdEl0ZW08YW55Pj4+IHwgYW55O1xufVxuXG5cbmNsYXNzIEFQQ2hvaWNlQ29udHJvbGxlciB7XG4gICAgc3RhdGljICRpbmplY3QgPSBbXTtcbiAgICBrZXk6IHN0cmluZztcbiAgICBsb2FkaW5nID0gdHJ1ZTtcbiAgICBsaXN0SXRlbTogTGlzdEl0ZW08YW55PjtcbiAgICBtdWx0aTogYm9vbGVhbjtcbiAgICBvcHRpb25zOiBzdHJpbmdbXTtcbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nIHwgbnVtYmVyO1xuICAgIHRvOiBJVGVtcGxhdGVPcHRpb25zO1xuXG4gICAgJG9uSW5pdCgpIHtcbiAgICAgICAgY29uc3QgJGN0cmwgPSB0aGlzO1xuICAgICAgICAkY3RybC5wbGFjZWhvbGRlciA9ICRjdHJsLnRvLnBsYWNlaG9sZGVyIHx8ICcnO1xuICAgICAgICBjb25zdCBmaWVsZERlZmluaXRpb24gPSAkY3RybC5saXN0SXRlbS5nZXRGaWVsZERlZmluaXRpb24oJGN0cmwua2V5KTtcblxuICAgICAgICBpZiAoJGN0cmwudG8ub3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKCRjdHJsLnRvLm9wdGlvbnMudGhlbikge1xuICAgICAgICAgICAgICAgIC8qKiBPcHRpb25zIGFyZW4ndCByZXNvbHZlZCB5ZXQgKi9cbiAgICAgICAgICAgICAgICAkY3RybC50by5vcHRpb25zLnRoZW4oZnVuY3Rpb24gKG9wdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgICAgICAgICAgICAgICAgICRjdHJsLm9wdGlvbnMgPSBjcmVhdGVDaG9pY2VBcnJheShvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvKiogT3B0aW9ucyBwYXNzZWQgdGhyb3VnaCBkaXJlY3RseSAqL1xuICAgICAgICAgICAgICAgICRjdHJsLm9wdGlvbnMgPSBjcmVhdGVDaG9pY2VBcnJheSgkY3RybC50by5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICAkY3RybC5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZmllbGREZWZpbml0aW9uLmNob2ljZXMgfHwgZmllbGREZWZpbml0aW9uLkNob2ljZXMpIHtcbiAgICAgICAgICAgIC8qKiBPcHRpb25zIGF2YWlsYWJsZSBvbiBmaWVsZCBkZWZpbml0aW9uIHdpdGhpbiBtb2RlbCAqL1xuICAgICAgICAgICAgJGN0cmwub3B0aW9ucyA9IGNyZWF0ZUNob2ljZUFycmF5KGZpZWxkRGVmaW5pdGlvbi5jaG9pY2VzIHx8IGZpZWxkRGVmaW5pdGlvbi5DaG9pY2VzKTtcbiAgICAgICAgICAgICRjdHJsLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qKiBMYXN0IGNoYW5jZSwgZ2V0IGxpc3QgZGVmaW5pdGlvbiBmcm9tIHNlcnZlciBhbmQgbG9vayBmb3IgY2hvaWNlcyAqL1xuICAgICAgICAgICAgY29uc3QgbW9kZWwgPSAkY3RybC5saXN0SXRlbS5nZXRNb2RlbCgpO1xuXG4gICAgICAgICAgICBtb2RlbC5leHRlbmRMaXN0TWV0YWRhdGEoKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkRGVmaW5pdGlvbi5jaG9pY2VzIHx8IGZpZWxkRGVmaW5pdGlvbi5DaG9pY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkY3RybC5vcHRpb25zID0gY3JlYXRlQ2hvaWNlQXJyYXkoZmllbGREZWZpbml0aW9uLmNob2ljZXMgfHwgZmllbGREZWZpbml0aW9uLkNob2ljZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGN0cmwubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBBUEZvcm1seUNob2ljZUNvbXBvbmVudCA9IHtcbiAgICBiaW5kaW5nczoge1xuICAgICAgICBrZXk6ICc8JyxcbiAgICAgICAgbGlzdEl0ZW06ICc8JyxcbiAgICAgICAgbXVsdGk6ICc8JyxcbiAgICAgICAgdG86ICc9JyAvL1RlbXBsYXRlIE9wdGlvbnNcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IEFQQ2hvaWNlQ29udHJvbGxlcixcbiAgICB0ZW1wbGF0ZTogJycgK1xuICAgIGA8ZGl2IG5nLWlmPVwiISRjdHJsLmxvYWRpbmdcIj5cbiAgICAgICAgPGRpdiBuZy1pZj1cIiRjdHJsLm11bHRpXCI+XG4gICAgICAgICAgICA8dWktc2VsZWN0IG11bHRpcGxlIG5nLW1vZGVsPVwiJGN0cmwubGlzdEl0ZW1bJGN0cmwua2V5XVwiIG5nLWRpc2FibGVkPVwiJGN0cmwudG8uZGlzYWJsZWRcIj5cbiAgICAgICAgICAgICAgICA8dWktc2VsZWN0LW1hdGNoIHBsYWNlaG9sZGVyPVwie3sgJGN0cmwucGxhY2Vob2xkZXIgfX1cIj57eyAkaXRlbSB9fTwvdWktc2VsZWN0LW1hdGNoPlxuICAgICAgICAgICAgICAgIDx1aS1zZWxlY3QtY2hvaWNlcyBkYXRhLXJlcGVhdD1cImNob2ljZSBpbiAkY3RybC5vcHRpb25zIHwgZmlsdGVyOiRzZWxlY3Quc2VhcmNoXCI+e3sgY2hvaWNlIH19PC91aS1zZWxlY3QtY2hvaWNlcz5cbiAgICAgICAgICAgIDwvdWktc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBuZy1pZj1cIiEkY3RybC5tdWx0aVwiPlxuICAgICAgICAgICAgPHVpLXNlbGVjdCBuZy1tb2RlbD1cIiRjdHJsLmxpc3RJdGVtWyRjdHJsLmtleV1cIiBuZy1kaXNhYmxlZD1cIiRjdHJsLnRvLmRpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAgPHVpLXNlbGVjdC1tYXRjaCBwbGFjZWhvbGRlcj1cInt7ICRjdHJsLnBsYWNlaG9sZGVyIH19XCI+e3sgJHNlbGVjdC5zZWxlY3RlZCB9fTwvdWktc2VsZWN0LW1hdGNoPlxuICAgICAgICAgICAgICAgIDx1aS1zZWxlY3QtY2hvaWNlcyBkYXRhLXJlcGVhdD1cImNob2ljZSBpbiAkY3RybC5vcHRpb25zIHwgZmlsdGVyOiRzZWxlY3Quc2VhcmNoXCI+e3sgY2hvaWNlIH19PC91aS1zZWxlY3QtY2hvaWNlcz5cbiAgICAgICAgICAgIDwvdWktc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8c3BhbiBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5nLWlmPVwiJGN0cmwubG9hZGluZ1wiPmxvYWRpbmcuLi48L3NwYW4+YFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vc3JjL2FwQ2hvaWNlLnRzIiwiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuLy8gaW1wb3J0IHsgTGlzdEl0ZW0gfSBmcm9tICcuLi9hbmd1bGFyLXBvaW50L2ZhY3Rvcmllcy9hcExpc3RJdGVtRmFjdG9yeSc7XG4vLyBpbXBvcnQgeyBMb29rdXAgfSBmcm9tICcuLi9hbmd1bGFyLXBvaW50L2ZhY3Rvcmllcy9hcExvb2t1cEZhY3RvcnknO1xuLy8gaW1wb3J0IHsgSW5kZXhlZENhY2hlIH0gZnJvbSAnLi4vYW5ndWxhci1wb2ludC9mYWN0b3JpZXMvYXBJbmRleGVkQ2FjaGVGYWN0b3J5JztcbmltcG9ydCB7IEluZGV4ZWRDYWNoZSwgTGlzdEl0ZW0sIExvb2t1cCB9IGZyb20gJ2FuZ3VsYXItcG9pbnQnO1xuXG5mdW5jdGlvbiBjcmVhdGVMb29rdXBBcnJheShvcHRpb25zLCBsb29rdXBJZFByb3BlcnR5OiB7IChsaXN0SXRlbTogTGlzdEl0ZW08YW55Pik6IHN0cmluZyB9IHwgc3RyaW5nLCBsb29rdXBWYWx1ZVByb3BlcnR5OiB7IChsaXN0SXRlbTogTGlzdEl0ZW08YW55Pik6IHN0cmluZyB9IHwgc3RyaW5nKTogTG9va3VwPGFueT5bXSB7XG4gICAgbGV0IHNvcnRlZExvb2t1cFZhbHVlcyA9IFtdO1xuICAgIGNvbnN0IHNhbXBsZUxpc3RJdGVtID0gXy5zYW1wbGUob3B0aW9ucyk7XG4gICAgaWYgKHNhbXBsZUxpc3RJdGVtICYmIHNhbXBsZUxpc3RJdGVtLmhhc093blByb3BlcnR5KCdsb29rdXBJZCcpKSB7XG4gICAgICAgIC8qKiBBbHJlYWR5IHZhbGlkIGxvb2t1cCBvYmplY3RzICovXG4gICAgICAgIHNvcnRlZExvb2t1cFZhbHVlcyA9IF8uc29ydEJ5KG9wdGlvbnMsICdsb29rdXBWYWx1ZScpO1xuICAgIH0gZWxzZSBpZiAoc2FtcGxlTGlzdEl0ZW0pIHtcbiAgICAgICAgLyoqIExpc3QgaXRlbXMgdGhhdCBuZWVkIHRvIHZlIGNvbnZlcnRlZCBpbnRvIGxvb2t1cCBvYmplY3RzICovXG4gICAgICAgIHNvcnRlZExvb2t1cFZhbHVlcyA9IF8uY2hhaW4ob3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGxpc3RJdGVtOiBMaXN0SXRlbTxhbnk+KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCBpcyB0byB1c2UgdGl0bGUgZm9yIGxvb2t1cFZhbHVlIGFuZCBpZCBmb3IgbG9va3VwSWQgYnV0IG9wdGlvbmFsbHkgY2FuIHBhc3MgaW4gdGhlIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgIC8vIHRvIHVzZSBmb3IgZWl0aGVyIG9yIGEgZnVuY3Rpb24gdG8gcmV0dXJuIHRoZSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICBsb29rdXBJZDogXy5pc0Z1bmN0aW9uKGxvb2t1cElkUHJvcGVydHkpID8gbG9va3VwSWRQcm9wZXJ0eShsaXN0SXRlbSkgOiBsaXN0SXRlbVtsb29rdXBJZFByb3BlcnR5XSxcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FuIGJlIGNhbGN1bGF0ZWQgd2l0aCBlaXRoZXIgYSBmdW5jdGlvbiBvciBhIHByb3BlcnR5IG5hbWVcbiAgICAgICAgICAgICAgICAgICAgbG9va3VwVmFsdWU6IF8uaXNGdW5jdGlvbihsb29rdXBWYWx1ZVByb3BlcnR5KSA/IGxvb2t1cFZhbHVlUHJvcGVydHkobGlzdEl0ZW0pIDogbGlzdEl0ZW1bbG9va3VwVmFsdWVQcm9wZXJ0eV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zb3J0QnkoJ2xvb2t1cFZhbHVlJylcbiAgICAgICAgICAgIC52YWx1ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc29ydGVkTG9va3VwVmFsdWVzO1xufVxuXG5pbnRlcmZhY2UgSVRlbXBsYXRlT3B0aW9ucyB7XG4gICAgLy8gaW50ZXJmYWNlIElUZW1wbGF0ZU9wdGlvbnMgZXh0ZW5kcyBBbmd1bGFyRm9ybWx5LklUZW1wbGF0ZU9wdGlvbnMge1xuICAgIGxvb2t1cElkUHJvcGVydHk6IHsgKGxpc3RJdGVtOiBMaXN0SXRlbTxhbnk+KTogc3RyaW5nIH0gfCBzdHJpbmc7XG4gICAgbG9va3VwVmFsdWVQcm9wZXJ0eTogeyAobGlzdEl0ZW06IExpc3RJdGVtPGFueT4pOiBzdHJpbmcgfSB8IHN0cmluZztcbiAgICBvcHRpb25zOiBhbmd1bGFyLklQcm9taXNlPE9iamVjdFtdIHwgSW5kZXhlZENhY2hlPExpc3RJdGVtPGFueT4+PiB8IE9iamVjdFtdIHwgSW5kZXhlZENhY2hlPExpc3RJdGVtPGFueT4+IHwgYW55O1xuICAgIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xufVxuXG5cbmNsYXNzIEFQTG9va3VwQ29udHJvbGxlciB7XG4gICAgc3RhdGljICRpbmplY3QgPSBbXTtcbiAgICBrZXk6IHN0cmluZztcbiAgICBsaXN0SXRlbTogT2JqZWN0O1xuICAgIGxvYWRpbmcgPSB0cnVlO1xuICAgIG11bHRpOiBib29sZWFuO1xuICAgIG9wdGlvbnM6IExvb2t1cDxhbnk+W107XG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZyB8IG51bWJlcjtcbiAgICB0bzogSVRlbXBsYXRlT3B0aW9ucztcbiAgICAkb25Jbml0KCkge1xuICAgICAgICBjb25zdCAkY3RybCA9IHRoaXM7XG4gICAgICAgIC8vIFRoZSBwcm9wZXJ0eSB0byB1c2UgYXMgdGhlIGxvb2t1cFZhbHVlIGlmIHdlIG5lZWQgdG8gYnVpbGQgYSBMb29rdXBbXVxuICAgICAgICBjb25zdCBsb29rdXBJZFByb3BlcnR5ID0gJGN0cmwudG8ubG9va3VwSWRQcm9wZXJ0eSB8fCAnaWQnO1xuICAgICAgICBjb25zdCBsb29rdXBWYWx1ZVByb3BlcnR5ID0gJGN0cmwudG8ubG9va3VwVmFsdWVQcm9wZXJ0eSB8fCAndGl0bGUnO1xuXG4gICAgICAgICRjdHJsLnBsYWNlaG9sZGVyID0gJGN0cmwudG8ucGxhY2Vob2xkZXIgfHwgJyc7XG5cbiAgICAgICAgaWYgKCRjdHJsLnRvLm9wdGlvbnMudGhlbikge1xuICAgICAgICAgICAgLyoqIE9wdGlvbnMgYXJlbid0IHJlc29sdmVkIHlldCAqL1xuICAgICAgICAgICAgJGN0cmwudG8ub3B0aW9ucy50aGVuKGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgJGN0cmwub3B0aW9ucyA9IGNyZWF0ZUxvb2t1cEFycmF5KG9wdGlvbnMsIGxvb2t1cElkUHJvcGVydHksIGxvb2t1cFZhbHVlUHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICRjdHJsLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGN0cmwub3B0aW9ucyA9IGNyZWF0ZUxvb2t1cEFycmF5KCRjdHJsLnRvLm9wdGlvbnMsIGxvb2t1cElkUHJvcGVydHksIGxvb2t1cFZhbHVlUHJvcGVydHkpO1xuICAgICAgICAgICAgJGN0cmwubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBBUEZvcm1seUxvb2t1cENvbXBvbmVudCA9IHtcbiAgICBiaW5kaW5nczoge1xuICAgICAgICBrZXk6ICc8JyxcbiAgICAgICAgbGlzdEl0ZW06ICc8JyxcbiAgICAgICAgbXVsdGk6ICc8JyxcbiAgICAgICAgdG86ICc9J1xuXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiBBUExvb2t1cENvbnRyb2xsZXIsXG4gICAgdGVtcGxhdGU6ICcnICtcbiAgICBgPGRpdiBuZy1pZj1cIiEkY3RybC5sb2FkaW5nXCI+XG4gICAgICAgIDxkaXYgbmctaWY9XCIkY3RybC5tdWx0aVwiPlxuICAgICAgICAgICAgPHVpLXNlbGVjdCBtdWx0aXBsZSBuZy1tb2RlbD1cIiRjdHJsLmxpc3RJdGVtWyRjdHJsLmtleV1cIiBuZy1kaXNhYmxlZD1cIiRjdHJsLnRvLmRpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAgPHVpLXNlbGVjdC1tYXRjaCBwbGFjZWhvbGRlcj1cInt7ICRjdHJsLnBsYWNlaG9sZGVyIH19XCI+e3sgJGl0ZW0ubG9va3VwVmFsdWUgfX08L3VpLXNlbGVjdC1tYXRjaD5cbiAgICAgICAgICAgICAgICA8dWktc2VsZWN0LWNob2ljZXMgZGF0YS1yZXBlYXQ9XCJsb29rdXAgaW4gJGN0cmwub3B0aW9ucyB8IGZpbHRlcjp7bG9va3VwVmFsdWU6ICRzZWxlY3Quc2VhcmNofVxuICAgICAgICAgICAgICAgICAgICB0cmFjayBieSBsb29rdXAubG9va3VwSWRcIj57eyBsb29rdXAubG9va3VwVmFsdWUgfX08L3VpLXNlbGVjdC1jaG9pY2VzPlxuICAgICAgICAgICAgPC91aS1zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IG5nLWlmPVwiISRjdHJsLm11bHRpXCI+XG4gICAgICAgICAgICA8dWktc2VsZWN0IG5nLW1vZGVsPVwiJGN0cmwubGlzdEl0ZW1bJGN0cmwua2V5XVwiIG5nLWRpc2FibGVkPVwiJGN0cmwudG8uZGlzYWJsZWRcIj5cbiAgICAgICAgICAgICAgICA8dWktc2VsZWN0LW1hdGNoIHBsYWNlaG9sZGVyPVwie3sgJGN0cmwucGxhY2Vob2xkZXIgfX1cIj57eyAkc2VsZWN0LnNlbGVjdGVkLmxvb2t1cFZhbHVlIH19PC91aS1zZWxlY3QtbWF0Y2g+XG4gICAgICAgICAgICAgICAgPHVpLXNlbGVjdC1jaG9pY2VzIGRhdGEtcmVwZWF0PVwibG9va3VwIGluICRjdHJsLm9wdGlvbnMgfCBmaWx0ZXI6e2xvb2t1cFZhbHVlOiAkc2VsZWN0LnNlYXJjaH1cbiAgICAgICAgICAgICAgICAgICAgdHJhY2sgYnkgbG9va3VwLmxvb2t1cElkXCI+e3sgbG9va3VwLmxvb2t1cFZhbHVlIH19PC91aS1zZWxlY3QtY2hvaWNlcz5cbiAgICAgICAgICAgIDwvdWktc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8c3BhbiBuZy1pZj1cIiRjdHJsLmxvYWRpbmdcIj5sb2FkaW5nLi4uPC9zcGFuPmBcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3RzbGludC1sb2FkZXIhLi9zcmMvYXBMb29rdXAudHMiLCJcblxuZXhwb3J0IGNsYXNzIEZvcm1seVRlbXBsYXRlcyB7XG4gIHN0YXRpYyAkaW5qZWN0ID0gWydmb3JtbHlDb25maWdQcm92aWRlciddO1xuICBjb25zdHJ1Y3Rvcihmb3JtbHlDb25maWdQcm92aWRlcjogQW5ndWxhckZvcm1seS5JRm9ybWx5Q29uZmlnKSB7XG5cbiAgICBmb3JtbHlDb25maWdQcm92aWRlci5zZXRUeXBlKHtcbiAgICAgIG5hbWU6ICdsb29rdXAnLFxuICAgICAgd3JhcHBlcjogWydib290c3RyYXBMYWJlbCcsICdib290c3RyYXBIYXNFcnJvciddLFxuICAgICAgdGVtcGxhdGU6IGA8YXAtbG9va3VwIGxpc3QtaXRlbT1cIm1vZGVsXCIga2V5PVwib3B0aW9ucy5rZXlcIiBtdWx0aT1cImZhbHNlXCIgdG89XCJ0b1wiPjwvYXAtbG9va3VwPmBcbiAgICB9KTtcblxuICAgIGZvcm1seUNvbmZpZ1Byb3ZpZGVyLnNldFR5cGUoe1xuICAgICAgbmFtZTogJ2xvb2t1cC1tdWx0aScsXG4gICAgICB3cmFwcGVyOiBbJ2Jvb3RzdHJhcExhYmVsJywgJ2Jvb3RzdHJhcEhhc0Vycm9yJ10sXG4gICAgICB0ZW1wbGF0ZTogYDxhcC1sb29rdXAgbGlzdC1pdGVtPVwibW9kZWxcIiBrZXk9XCJvcHRpb25zLmtleVwiIG11bHRpPVwidHJ1ZVwiIHRvPVwidG9cIj48L2FwLWxvb2t1cD5gXG4gICAgfSk7XG5cbiAgICBmb3JtbHlDb25maWdQcm92aWRlci5zZXRUeXBlKHtcbiAgICAgIG5hbWU6ICd1aS1kYXRlJyxcbiAgICAgIHdyYXBwZXI6IFsnYm9vdHN0cmFwTGFiZWwnLCAnYm9vdHN0cmFwSGFzRXJyb3InXSxcbiAgICAgIHRlbXBsYXRlOiBgPGlucHV0IHVpLWRhdGUgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuZy1tb2RlbD1cIm1vZGVsW29wdGlvbnMua2V5XVwiPmBcbiAgICB9KTtcblxuICAgIGZvcm1seUNvbmZpZ1Byb3ZpZGVyLnNldFR5cGUoe1xuICAgICAgbmFtZTogJ25vdGUnLFxuICAgICAgd3JhcHBlcjogWydib290c3RyYXBMYWJlbCcsICdib290c3RyYXBIYXNFcnJvciddLFxuICAgICAgdGVtcGxhdGU6IGA8dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBtc2QtZWxhc3RpYyBuZy1tb2RlbD1cIm1vZGVsW29wdGlvbnMua2V5XVwiPjwvdGV4dGFyZWE+YFxuICAgIH0pO1xuXG4gICAgZm9ybWx5Q29uZmlnUHJvdmlkZXIuc2V0VHlwZSh7XG4gICAgICBuYW1lOiAnaHRtbCcsXG4gICAgICB3cmFwcGVyOiBbJ2Jvb3RzdHJhcExhYmVsJywgJ2Jvb3RzdHJhcEhhc0Vycm9yJ10sXG4gICAgICB0ZW1wbGF0ZTogYDxkaXYgdGV4dC1hbmd1bGFyIG5nLW1vZGVsPVwibW9kZWxbb3B0aW9ucy5rZXldXCI+PC9kaXY+YFxuICAgIH0pO1xuXG4gICAgZm9ybWx5Q29uZmlnUHJvdmlkZXIuc2V0VHlwZSh7XG4gICAgICBuYW1lOiAnY2hvaWNlJyxcbiAgICAgIHdyYXBwZXI6IFsnYm9vdHN0cmFwTGFiZWwnLCAnYm9vdHN0cmFwSGFzRXJyb3InXSxcbiAgICAgIHRlbXBsYXRlOiBgPGFwLWNob2ljZSBsaXN0LWl0ZW09XCJtb2RlbFwiIGtleT1cIm9wdGlvbnMua2V5XCIgdG89XCJ0b1wiPjwvYXAtY2hvaWNlPmBcbiAgICB9KTtcblxuICAgIGZvcm1seUNvbmZpZ1Byb3ZpZGVyLnNldFR5cGUoe1xuICAgICAgbmFtZTogJ2Nob2ljZS1tdWx0aScsXG4gICAgICB3cmFwcGVyOiBbJ2Jvb3RzdHJhcExhYmVsJywgJ2Jvb3RzdHJhcEhhc0Vycm9yJ10sXG4gICAgICB0ZW1wbGF0ZTogYDxhcC1jaG9pY2UgbGlzdC1pdGVtPVwibW9kZWxcIiBrZXk9XCJvcHRpb25zLmtleVwiIG11bHRpPVwidHJ1ZVwiIHRvPVwidG9cIj48L2FwLWNob2ljZT5gXG4gICAgfSk7XG5cbiAgICBmb3JtbHlDb25maWdQcm92aWRlci5zZXRUeXBlKHtcbiAgICAgIG5hbWU6ICdhdHRhY2htZW50cycsXG4gICAgICB3cmFwcGVyOiBbJ2Jvb3RzdHJhcExhYmVsJywgJ2Jvb3RzdHJhcEhhc0Vycm9yJ10sXG4gICAgICB0ZW1wbGF0ZTogYDxhcC1hdHRhY2htZW50cyBsaXN0LWl0ZW09XCJtb2RlbFwiPjwvYXAtYXR0YWNobWVudHM+YFxuICAgIH0pO1xuXG4gICAgZm9ybWx5Q29uZmlnUHJvdmlkZXIuc2V0VHlwZSh7XG4gICAgICBuYW1lOiAnYm9vbGVhbicsXG4gICAgICB3cmFwcGVyOiBbJ2Jvb3RzdHJhcExhYmVsJywgJ2Jvb3RzdHJhcEhhc0Vycm9yJ10sXG4gICAgICB0ZW1wbGF0ZTogYDxici8+XG5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbGlua1wiIG5nLWNsaWNrPVwibW9kZWxbb3B0aW9ucy5rZXldID0gIW1vZGVsW29wdGlvbnMua2V5XVwiPlxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLTJ4IHt7IG1vZGVsW29wdGlvbnMua2V5XSA/ICdmYS1jaGVjay1zcXVhcmUtbycgOiAnZmEtc3F1YXJlLW8nIH19XCI+PC9pPlxuICAgICAgICA8L2J1dHRvbj5cbiAgXG4gICAgICAgIDwhLS1IaWRkZW4gY2hlY2tib3ggaGFuZGxlcyB2YWxpZGF0aW9uLS0+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBuZy1tb2RlbD1cIm1vZGVsW29wdGlvbnMua2V5XVwiXG4gICAgICAgICAgICAgICAgdWktdmFsaWRhdGU9XCIndmFsaWRhdGUoJHZhbHVlKSdcIj5gXG5cbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vc3JjL2Zvcm1seVRlbXBsYXRlcy50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFuZ3VsYXItcG9pbnRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJhbmd1bGFyLXBvaW50XCJcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibG9kYXNoXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcblxuaW1wb3J0IHtBbmd1bGFyUG9pbnRNb2R1bGV9IGZyb20gJ2FuZ3VsYXItcG9pbnQnO1xuLy8gaW1wb3J0IHtBbmd1bGFyUG9pbnRNb2R1bGV9IGZyb20gJy4uL2FuZ3VsYXItcG9pbnQvYXBwLm1vZHVsZSc7XG5cbmltcG9ydCB7IEFQRm9ybWx5TG9va3VwQ29tcG9uZW50IH0gZnJvbSAnLi9hcExvb2t1cCc7XG5pbXBvcnQgeyBBUEZvcm1seUNob2ljZUNvbXBvbmVudCB9IGZyb20gJy4vYXBDaG9pY2UnO1xuaW1wb3J0IHsgRm9ybWx5VGVtcGxhdGVzIH0gZnJvbSAnLi9mb3JtbHlUZW1wbGF0ZXMnO1xuXG5cbi8vIGFuZ3VsYXJcbi8vICAgICAubW9kdWxlKCdhbmd1bGFyUG9pbnQnKVxuQW5ndWxhclBvaW50TW9kdWxlXG4gICAgLmNvbmZpZyhGb3JtbHlUZW1wbGF0ZXMpXG4gICAgLmNvbXBvbmVudCgnYXBMb29rdXAnLCBBUEZvcm1seUxvb2t1cENvbXBvbmVudClcbiAgICAuY29tcG9uZW50KCdhcENob2ljZScsIEFQRm9ybWx5Q2hvaWNlQ29tcG9uZW50KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL3NyYy9pbmRleC50cyJdLCJzb3VyY2VSb290IjoiIn0=