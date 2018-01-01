import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { LabelModel } from './../../models/label';
import { JournalPage } from './../journal/journal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  jPage: any = JournalPage;

  /** The currently selected label */
  activeLabel: LabelModel;

  labelList: LabelModel[] = [
    new LabelModel(1, 'My thoughts'),
    new LabelModel(2, 'Workplace'),
    new LabelModel(3, 'Future plans'),
    new LabelModel(4, 'No label')
  ];

  constructor(public navCtrl: NavController, public events: Events) {
    this.activeLabel = this.labelList[0];

    setTimeout(() => {
      // Fire the event
      this.events.publish('label:selected', this.activeLabel);
    }, 100);
  }

  onLabelSelected(index: number): void {
    this.activeLabel = this.labelList[index];
    this.events.publish('label:selected', this.activeLabel);
  }

  getSelectionColour(id: number): string {
    const isActiveLabel = id == this.activeLabel.id;

    if (isActiveLabel) {
      return "label-selected-colour";
    }

    return "app-background-colour";
  }

}

