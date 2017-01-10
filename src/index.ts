import {AngularPointModule} from 'angular-point';

import { APFormlyLookupComponent } from './apLookup';
import { APFormlyChoiceComponent } from './apChoice';
import { FormlyTemplates } from './formlyTemplates';

AngularPointModule
    .config(FormlyTemplates)
    .component('apLookup', APFormlyLookupComponent)
    .component('apChoice', APFormlyChoiceComponent);
