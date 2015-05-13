/// <reference path="formlyTemplates.ts" />


module ap.formly {
    'use strict';

    angular
        .module('angularPoint')
        .config(ap.formly.FormlyTemplates)
        .directive('apLookup', ap.formly.APLookup)
        .directive('apChoice', ap.formly.APChoice);

}