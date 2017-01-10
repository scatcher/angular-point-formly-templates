import * as angular from 'angular';

import {AngularPointModule} from 'angular-point';
// import {AngularPointModule} from '../angular-point/app.module';

import { APFormlyLookupComponent } from './apLookup';
import { APFormlyChoiceComponent } from './apChoice';
import { FormlyTemplates } from './formlyTemplates';


// angular
//     .module('angularPoint')
AngularPointModule
    .config(FormlyTemplates)
    .component('apLookup', APFormlyLookupComponent)
    .component('apChoice', APFormlyChoiceComponent);
