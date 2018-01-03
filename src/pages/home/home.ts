
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, PopoverController, Events } from 'ionic-angular';

import { LabelModel } from './../../models/label';
import { JournalPage } from './../journal/journal';
import { OptionPopoverPage } from './option/option';

import { LabelProvider } from './../../providers/label/label';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  jPage: any = JournalPage;

  /** The currently selected label */
  activeLabel: LabelModel;

  labelList: LabelModel[] = [];

  constructor
  (
    private events: Events,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private labelProvider: LabelProvider,
    private popoverCtrl: PopoverController
  )
  {}

  ngOnInit(): void {
    this.labelProvider.labelsOnChangeEvent.subscribe(() => {
      this.labelList = this.labelProvider.getLabels();

      if (this.labelList.length > 0 && this.activeLabel == null) {
        this.activeLabel = this.labelList[0];

        // Fire the event
        this.events.publish('label:selected', this.activeLabel);
      }
    });

    this.labelProvider.fetchLabels();
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

  onLabelSettings(index: number): void {
    let popover = this.popoverCtrl.create(OptionPopoverPage, {label: this.labelList[index]});
    popover.present({
      ev: event
    });
  }

  onCreateNewLabel(): void {
    const alert = this.alertCtrl.create({
      title: 'Create New Label',
      inputs: [
        {
          name: 'label_name',
          placeholder: 'Name',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: (data: any) => {
            if (data.label_name != '') {
              this.labelProvider.saveLabel(new LabelModel(-1, data.label_name), null);
            }
          }
        }
      ]
    });
    alert.present();
  }
}

