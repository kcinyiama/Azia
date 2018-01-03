import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { LabelModel } from './../../models/label';
import { JournalModel } from './../../models/journal';

@Injectable()
export class AppStorage {

  constructor (private storage: Storage) {}

  getLabels(): Promise<LabelModel[]> {
    return this.getObject('labels');
  }

  setLabels(labels: LabelModel[], update: boolean = false): Promise<LabelModel[]> {
    if (!update) {
      return this.storage.set('labels', labels);
    }
    return this.getLabels().then((oldLabels: LabelModel[]) => {
      oldLabels.push(...labels);
      return this.storage.set('labels', oldLabels);
    });
  }

  getJournals(): Promise<JournalModel[]> {
    return this.getObject('journals');
  }

  setJournals(journals: JournalModel[], update: boolean = false): Promise<JournalModel[]> {
    if (!update) {
      return this.storage.set('journals', journals);
    }
    return this.getJournals().then((oldJournals: JournalModel[]) => {
      oldJournals.push(...journals);
      return this.storage.set('journals', oldJournals);
    });
  }

  private getObject(tag: string): Promise<any> {
    return this.storage.get(tag).then((value: any) => {
      return value == null ? [] : value;
    });
  }
}







