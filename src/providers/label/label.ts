import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { UtilsProvider } from './../utils';
import { AppStorage } from './../storage/app';
import { JournalProvider } from './../journal/journal';

import { LabelModel } from './../../models/label';
import { ResponseCallback } from './../../interfaces/response-callback';

@Injectable()
export class LabelProvider {

  private labels: LabelModel[] = [];

  labelsOnChangeEvent = new Subject();

  constructor
  (
    private appStorage: AppStorage,
    private utilsProvider: UtilsProvider,
    private journalProvider: JournalProvider
  )
  {}

  getLabels(): LabelModel[] {
    return this.labels.slice();
  }

  getLabelById(labelId: string): LabelModel {
    return this.getLabels().find((local: LabelModel) => {
      return local.id == labelId;
    });
  }

  fetchLabels(): void {
    this.appStorage.getLabels().then((labels: LabelModel[]) => {
      this.labels = labels;
      this.labelsOnChangeEvent.next();
    });

    /*
    this.labelHttpProvider.getLabelData(r => {

      if (r.status && r.extras != null) {
        const savedLabels: LabelModel[] = [];

        for (const key in r.extras) {
          if (r.extras.hasOwnProperty(key)) {
            const element = r.extras[key];
            savedLabels.push(new LabelModel(key, element.name));
          }
        }
        this.labels = savedLabels;
        this.labelsOnChangeEvent.next();
        this.appStorage.setLabels(savedLabels);
      }
    });
    */
  }

  saveLabel(label: LabelModel): void {
    label.id = 'l' + this.utilsProvider.generateUUID();

    this.labels.push(label);
    this.appStorage.setLabels(this.labels).then(() => {
      this.labelsOnChangeEvent.next(Object.assign({}, label));

      this.utilsProvider.showToast('Label saved');
    })
    .catch(() => {
      this.utilsProvider.showToast('Error while saving your label');
    });

    /*
    this.labelHttpProvider.saveLabelData(label, r => {

      if (r.status) {
        label.id = r.extras.name;

        this.labels.push(label);
        this.appStorage.setLabels(this.labels);

        this.labelsOnChangeEvent.next();
      }

      callback({
        status: r.status,
        message: '',
      });
    });
    */
  }

  updateLabel(label: LabelModel): void {
    const labelIndex = this.labels.findIndex((local: LabelModel) => {
      return local.id == label.id;
    });

    if (labelIndex != -1) {
      this.labels[labelIndex].name = label.name;

      this.appStorage.setLabels(this.labels).then(() => {
        this.labelsOnChangeEvent.next();
        this.utilsProvider.showToast('Label updated');
      })
      .catch(() => {
        this.utilsProvider.showToast('Error while updating your label');
      });
    }

    /*
    this.labelHttpProvider.updateLabelData(label, r => {

      if (r.status) {
        const labelIndex = this.labels.findIndex((local: LabelModel) => {
          return local.id == label.id;
        });

        if (labelIndex != -1) {
          this.labels[labelIndex].name = label.name;
          this.appStorage.setLabels(this.labels);

          this.labelsOnChangeEvent.next();
        }
      }
      callback({
        status: r.status,
        message: '',
      });
    });
    */
  }

  deleteLabel(label: LabelModel): void {
    const pending = this.labels.filter((local: LabelModel) => {
      return local.id != label.id;
    });

    if (pending.length < this.labels.length) {
      this.labels = pending;

      this.appStorage.setLabels(this.labels).then(() => {
        this.labelsOnChangeEvent.next();

        // Update the journals.
        this.journalProvider.deleteJournalByLabelId(label.id);

        this.utilsProvider.showToast('Label deleted');
      })
      .catch(() => {
        this.utilsProvider.showToast('Error while deleting your label');
      });
    }

    /*
    this.labelHttpProvider.deleteLabelData(label, r => {

      if (r.status) {
        this.labels = this.labels.filter((local: LabelModel) => {
          return local.id != label.id;
        });

        this.labelsOnChangeEvent.next();
        this.appStorage.setLabels(this.labels);

        // Update the journals.
        this.journalProvider.deleteJournalByLabelId(label.id);
      }
      callback({
        status: r.status,
        message: '',
      });
    });
    */
  }
}




