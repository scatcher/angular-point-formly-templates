/// <reference path="apLookup.ts" />
/// <reference path="apChoice.ts" />

module ap.formly {
    'use strict';

  export class FormlyTemplates{
    constructor(formlyConfigProvider) {

      formlyConfigProvider.setType({
        name: 'lookup',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        template: `<ap-lookup list-item="model" key="options.key" multi="false" options="to.options"></ap-lookup>`
      });

      formlyConfigProvider.setType({
        name: 'lookup-multi',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        template: `<ap-lookup list-item="model" key="options.key" multi="true" options="to.options"></ap-lookup>`
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
        template: `<ap-choice list-item="model" key="options.key" options="to.options"></ap-choice>`
      });

      formlyConfigProvider.setType({
        name: 'choice-multi',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        template: `<ap-choice list-item="model" key="options.key" options="to.options" multi="true"></ap-choice>`
      });

      formlyConfigProvider.setType({
        name: 'boolean',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        template: `
                <button class="btn btn-link"
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