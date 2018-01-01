import { Component, OnInit } from '@angular/core';
import { AlertController, ViewController } from 'ionic-angular';

import { LabelModel } from './../../../../models/label';

@Component({
  templateUrl: './label.html'
})
export class LabelPopoverPage implements OnInit {

  selectedLabel: LabelModel;

  labelList: LabelModel[] = [
    new LabelModel(1, 'My thoughts'),
    new LabelModel(2, 'Workplace'),
    new LabelModel(3, 'Future plans'),
    new LabelModel(4, 'No label')
  ];

  constructor
  (
    private viewCtrl: ViewController,
    private alertCtrl: AlertController
  )
  {}

  ngOnInit(): void {
    this.selectedLabel = this.labelList[0];
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

            }
          }
        }
      ]
    });
    alert.present();
  }

  onSelectLabel(index: number): void {
    this.selectedLabel = this.labelList[index];
  }

  getSelectedLabelIcon(id: number): string {
    return this.selectedLabel.id == id ? 'checkmark' : '';
  }
}



