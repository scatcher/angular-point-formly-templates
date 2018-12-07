import { IndexedCache, ListItem } from 'angular-point';

function createChoiceArray(options: string[] = []) {
  return options.sort();
}

export interface ITemplateOptions extends AngularFormly.ITemplateOptions {
  lookupIdProperty: { (listItem: ListItem<any>): string } | string;
  lookupValueProperty: { (listItem: ListItem<any>): string } | string;
  options: Object[] | IndexedCache<ListItem<any>> | ng.IPromise<Object[] | IndexedCache<ListItem<any>>> | any;
}

export class APChoiceController {
  static $inject = [];
  allowClear = false;
  key: string;
  loading = true;
  listItem: ListItem<any>;
  multi: boolean;
  options: string[];
  placeholder: string | number;
  to: ITemplateOptions;

  $onInit() {
    const $ctrl = this;
    $ctrl.placeholder = $ctrl.to.placeholder || '';
    $ctrl.allowClear = !!$ctrl.to.allowClear;
    const fieldDefinition = $ctrl.listItem.getFieldDefinition($ctrl.key);

    if ($ctrl.to.options) {
      if ($ctrl.to.options.then) {
        /** Options aren't resolved yet */
        $ctrl.to.options.then(function(options: string[]) {
          $ctrl.options = createChoiceArray(options);
          $ctrl.loading = false;
        });
      } else {
        /** Options passed through directly */
        $ctrl.options = createChoiceArray($ctrl.to.options);
        $ctrl.loading = false;
      }
    } else if (fieldDefinition.choices || fieldDefinition.Choices) {
      /** Options available on field definition within model */
      $ctrl.options = createChoiceArray(fieldDefinition.choices || fieldDefinition.Choices);
      $ctrl.loading = false;
    } else {
      /** Last chance, get list definition from server and look for choices */
      const model = $ctrl.listItem.getModel();

      model.extendListMetadata().then(function() {
        if (fieldDefinition.choices || fieldDefinition.Choices) {
          $ctrl.options = createChoiceArray(fieldDefinition.choices || fieldDefinition.Choices);
          $ctrl.loading = false;
        }
      });
    }
  }
}

export const APFormlyChoiceComponent = {
  bindings: {
    key: '<',
    listItem: '<',
    multi: '<',
    to: '=', //Template Options
  },
  controller: APChoiceController,
  template:
    '' +
    `<div ng-if="!$ctrl.loading">
        <div ng-if="$ctrl.multi">
            <ui-select multiple ng-model="$ctrl.listItem[$ctrl.key]" ng-disabled="$ctrl.to.disabled">
                <ui-select-match placeholder="{{ $ctrl.placeholder }}">{{ $item }}</ui-select-match>
                <ui-select-choices data-repeat="choice in $ctrl.options | filter:$select.search">{{ choice }}</ui-select-choices>
            </ui-select>
        </div>
        <div ng-if="!$ctrl.multi">
            <ui-select ng-model="$ctrl.listItem[$ctrl.key]" ng-disabled="$ctrl.to.disabled">
                <ui-select-match allow-clear="{{ $ctrl.allowClear }}" placeholder="{{ $ctrl.placeholder }}">{{ $select.selected }}</ui-select-match>
                <ui-select-choices data-repeat="choice in $ctrl.options | filter:$select.search">{{ choice }}</ui-select-choices>
            </ui-select>
        </div>
    </div>
    <span class="form-control" ng-if="$ctrl.loading">loading...</span>`,
};
