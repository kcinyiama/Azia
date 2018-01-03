
import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ViewController } from 'ionic-angular';

import { LabelModel } from './../../../../models/label';
import { LabelProvider } from './../../../../providers/label/label';

@Component({
  templateUrl: './label.html'
})
export class LabelPopoverPage implements OnInit {

  selectedLabel: LabelModel;

  labelList: LabelModel[] = [];

  constructor
  (
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private labelProvider: LabelProvider
  )
  {}

  ngOnInit(): void {
    this.labelProvider.labelsOnChangeEvent.subscribe(() => {
      this.labelList = this.labelProvider.getLabels();

      if (this.labelList.length > 0 && this.selectedLabel == null) {
        this.selectedLabel = this.labelList[0];
      }
    });

    const labelId: number = this.navParams.data.labelId;

    this.labelList = this.labelProvider.getLabels();

    this.selectedLabel = this.labelList.find((local: LabelModel) => {
      return local.id == labelId;
    });

    if (!this.selectedLabel) {
      this.selectedLabel = this.labelList[0];
    }
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

  onSelectLabel(index: number): void {
    this.selectedLabel = this.labelList[index];

    this.viewCtrl.dismiss(this.selectedLabel.id);
  }

  getSelectedLabelIcon(id: number): string {
    return this.selectedLabel.id == id ? 'checkmark' : '';
  }
}



