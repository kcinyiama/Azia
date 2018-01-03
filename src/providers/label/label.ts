import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { AppStorage } from './../storage/app';
import { LabelModel } from './../../models/label';
import { ResponseCallback } from './../../interfaces/response-callback';

@Injectable()
export class LabelProvider {

  private labels: LabelModel[] = [
    new LabelModel(1, 'My thoughts'),
    new LabelModel(2, 'Workplace'),
    new LabelModel(3, 'Future plans'),
    new LabelModel(4, 'No label')
  ];

  labelsOnChangeEvent = new Subject();

  constructor
  (
    private appStorage: AppStorage
  )
  {}

  getLabels(): LabelModel[] {
    return this.labels.slice();
  }

  fetchLabels(): void {
    this.appStorage.getLabels().then((labels: LabelModel[]) => {
      this.labels = labels;
      this.labelsOnChangeEvent.next();
    });

    // Make a request to the backend to fetch for new labels
  }

  saveLabel(label: LabelModel, callback: ({}: ResponseCallback) => void): void {
    // Save the label on the backend
    // Delete later
    let id = 1;
    if (this.labels.length > 0) {
      id = this.labels[this.labels.length - 1].id;
      id++;
    }
    label.id = id;

    this.labels.push(label);
    this.appStorage.setLabels(this.labels);

    this.labelsOnChangeEvent.next();
  }

  updateLabel(label: LabelModel, callback: ({}: ResponseCallback) => void): void {
    // Update the label on the backend
    const labelIndex = this.labels.findIndex((local: LabelModel) => {
      return local.id == label.id;
    });

    if (labelIndex != -1) {
      this.labels[labelIndex].name = label.name;
      this.appStorage.setLabels(this.labels);

      this.labelsOnChangeEvent.next();
    }

    callback({
      status: true,
      message: '',
    });
  }

  deleteLabel(id: number, callback: ({}: ResponseCallback) => void): void {
    this.labels = this.labels.filter((local: LabelModel) => {
      return local.id != id;
    });

    this.appStorage.setLabels(this.labels);

    callback({
      status: true,
      message: '',
    });

    this.labelsOnChangeEvent.next();
  }
}




