import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, PopoverController, Events } from 'ionic-angular';

import { LabelModel } from './../../models/label';
import { JournalPage } from './../journal/journal';
import { OptionPopoverPage } from './option/option';
import { LogoutPopoverPage } from './../auth/logout/logout';

import { LabelProvider } from './../../providers/label/label';
import { JournalProvider } from './../../providers/journal/journal';

import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  email: string;

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
    private journalProvider: JournalProvider,
    private popoverCtrl: PopoverController
  )
  {}

  ngOnInit(): void {
    this.labelProvider.labelsOnChangeEvent.subscribe(() => {
      this.labelList = this.labelProvider.getLabels();

      if (this.labelList.length > 0 && this.activeLabel == null) {
        this.activeLabel = this.labelList[0];

        this.journalProvider.fetchJournals(r => {

          if (r.status) {
            // Fire the event
            this.events.publish('label:selected', this.activeLabel);
          }
        });
      }
    });

    this.labelProvider.fetchLabels();

    // const user = firebase.auth().currentUser;

    // if (user != null) {
    //   this.email = user.email;
    // }
  }

  onLabelSelected(index: number): void {
    this.activeLabel = this.labelList[index];
    this.events.publish('label:selected', this.activeLabel);
  }

  getSelectionColour(id: string): string {
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
              this.labelProvider.saveLabel(new LabelModel('', data.label_name));
            }
          }
        }
      ]
    });
    alert.present();
  }

  onLogout(): void {
    let popover = this.popoverCtrl.create(LogoutPopoverPage);
    popover.present({
      ev: event
    });
  }
}

