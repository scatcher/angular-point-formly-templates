/// <reference path="formlyTemplates.ts" />


module ap.formly {
    'use strict';

    angular
        .module('angularPoint')
        .config(ap.formly.FormlyTemplates)
        .directive('apLookup', ap.formly.APFormlyLookup)
        .directive('apChoice', ap.formly.APFormlyChoice);

}