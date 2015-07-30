/// <reference path="apLookup.ts" />
/// <reference path="apChoice.ts" />
/// <reference path="../typings/tsd.d.ts" />

module ap.formly {
    'use strict';

  export class FormlyTemplates{
    constructor(formlyConfigProvider: AngularFormly.IFormlyConfig) {

      formlyConfigProvider.setType({
        name: 'lookup',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        template: `<ap-lookup list-item="model" key="options.key" multi="false" to="to"></ap-lookup>`
      });

      formlyConfigProvider.setType({
        name: 'lookup-multi',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        template: `<ap-lookup list-item="model" key="options.key" multi="true" to="to"></ap-lookup>`
      });

      formlyConfigProvider.setType({
        name: 'ui-date',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        template: `<input ui-date class="form-control" ng-model="model[options.key]">`
      });

      formlyConfigProvider.setType({
        name: 'note',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        template: `<textarea class="form-control" msd-elastic ng-model="model[options.key]"></textarea>`
      });

      formlyConfigProvider.setType({
        name: 'html',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        template: `<div text-angular ng-model="model[options.key]"></div>`
      });

      formlyConfigProvider.setType({
        name: 'choice',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        template: `<ap-choice list-item="model" key="options.key" to="to"></ap-choice>`
      });

      formlyConfigProvider.setType({
        name: 'choice-multi',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        template: `<ap-choice list-item="model" key="options.key" multi="true" to="to"></ap-choice>`
      });

      formlyConfigProvider.setType({
        name: 'attachments',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        template: `<span ap-attachments data-list-item="model"></span>` //TODO: Convert apAttachments to use element selector instead of attribute
      });

      formlyConfigProvider.setType({
        name: 'boolean',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        template: `<br/><button class="btn btn-link"
                            ng-click="model[options.key] = !model[options.key]">
                        <i class="fa fa-2x {{ model[options.key] ? 'fa-check-square-o' : 'fa-square-o' }}"></i>
                    </button>
                    <!--Hidden checkbox handles validation-->
                    <input type="checkbox"
                           class="hidden"
                           ng-model="model[options.key]"
                           ui-validate="'validate($value)'">`
      });
    }
  }

}