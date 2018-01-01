import { LabelModel } from './../models/label';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilsProvider {

  labelSelectedListener = new Subject<LabelModel>();


}
