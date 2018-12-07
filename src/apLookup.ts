import { IndexedCache, ListItem, Lookup } from 'angular-point';
import * as _ from 'lodash';

function createLookupArray(
  options,
  lookupIdProperty: { (listItem: ListItem<any>): string } | string,
  lookupValueProperty: { (listItem: ListItem<any>): string } | string,
): Lookup<any>[] {
  let sortedLookupValues = [];
  const sampleListItem = _.sample(options);
  if (sampleListItem && sampleListItem.hasOwnProperty('lookupId')) {
    /** Already valid lookup objects */
    sortedLookupValues = _.sortBy(options, 'lookupValue');
  } else if (sampleListItem) {
    /** List items that need to ve converted into lookup objects */
    sortedLookupValues = _.chain(options)
      .map(function(listItem: ListItem<any>) {
        return {
          // Default is to use title for lookupValue and id for lookupId but optionally can pass in the property
          // to use for either or a function to return the value
          lookupId: _.isFunction(lookupIdProperty) ? lookupIdProperty(listItem) : listItem[lookupIdProperty],
          // can be calculated with either a function or a property name
          lookupValue: _.isFunction(lookupValueProperty)
            ? lookupValueProperty(listItem)
            : listItem[lookupValueProperty],
        };
      })
      .sortBy('lookupValue')
      .value();
  }
  return sortedLookupValues;
}

export interface ITemplateOptions {
  // interface ITemplateOptions extends AngularFormly.ITemplateOptions {
  lookupIdProperty: { (listItem: ListItem<any>): string } | string;
  lookupValueProperty: { (listItem: ListItem<any>): string } | string;
  options: angular.IPromise<Object[] | IndexedCache<ListItem<any>>> | Object[] | IndexedCache<ListItem<any>> | any;
  placeholder?: string;
}

export class APLookupController {
  static $inject = [];
  allowClear = false;
  key: string;
  listItem: Object;
  loading = true;
  multi: boolean;
  options: Lookup<any>[];
  placeholder: string | number;
  to: ITemplateOptions;
  $onInit() {
    const $ctrl = this;
    // The property to use as the lookupValue if we need to build a Lookup[]
    const lookupIdProperty = $ctrl.to.lookupIdProperty || 'id';
    const lookupValueProperty = $ctrl.to.lookupValueProperty || 'title';

    $ctrl.placeholder = $ctrl.to.placeholder || '';
    $ctrl.allowClear = !!$ctrl.to.allowClear;

    if ($ctrl.to.options.then) {
      /** Options aren't resolved yet */
      $ctrl.to.options.then(function(options) {
        $ctrl.options = createLookupArray(options, lookupIdProperty, lookupValueProperty);
        $ctrl.loading = false;
      });
    } else {
      $ctrl.options = createLookupArray($ctrl.to.options, lookupIdProperty, lookupValueProperty);
      $ctrl.loading = false;
    }
  }
}

export const APFormlyLookupComponent = {
  bindings: {
    key: '<',
    listItem: '<',
    multi: '<',
    to: '=',
  },
  controller: APLookupController,
  template:
    '' +
    `<div ng-if="!$ctrl.loading">
        <div ng-if="$ctrl.multi">
            <ui-select multiple ng-model="$ctrl.listItem[$ctrl.key]" ng-disabled="$ctrl.to.disabled">
                <ui-select-match placeholder="{{ $ctrl.placeholder }}">{{ $item.lookupValue }}</ui-select-match>
                <ui-select-choices data-repeat="lookup in $ctrl.options | filter:{lookupValue: $select.search}
                    track by lookup.lookupId">{{ lookup.lookupValue }}</ui-select-choices>
            </ui-select>
        </div>
        <div ng-if="!$ctrl.multi">
            <ui-select ng-model="$ctrl.listItem[$ctrl.key]" ng-disabled="$ctrl.to.disabled">
                <ui-select-match allow-clear="{{ $ctrl.allowClear }}" placeholder="{{ $ctrl.placeholder }}">{{ $select.selected.lookupValue }}</ui-select-match>
                <ui-select-choices data-repeat="lookup in $ctrl.options | filter:{lookupValue: $select.search}
                    track by lookup.lookupId">{{ lookup.lookupValue }}</ui-select-choices>
            </ui-select>
        </div>
    </div>
    <span ng-if="$ctrl.loading">loading...</span>`,
};
