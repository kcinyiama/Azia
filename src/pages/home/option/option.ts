import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ViewController } from 'ionic-angular';

import { LabelModel } from './../../../models/label';
import { LabelProvider } from './../../../providers/label/label';

@Component({
  templateUrl: './option.html'
})
export class OptionPopoverPage implements OnInit {

  private label: LabelModel;

  constructor
  (
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private labelProvider: LabelProvider
  )
  {
    this.label = this.navParams.data.label;
  }

  ngOnInit(): void {

  }

  onEditLabel(): void {
    const alert = this.alertCtrl.create({
      title: 'Edit Label',
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
          text: 'Update',
          handler: (data: any) => {
            if (data.label_name != '') {
              this.label.name = data.label_name;

              this.labelProvider.updateLabel(this.label, (r) => {
                if (r.status) {
                  this.viewCtrl.dismiss();
                }
              });
            }
          }
        }
      ]
    });
    alert.present();
  }

  onDeleteLabel(): void {
    const alert = this.alertCtrl.create({
      title: 'Delete this label?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.labelProvider.deleteLabel(this.label.id, (r) => {
              if (r.status) {
                this.viewCtrl.dismiss();
              }
            });
          }
        }
      ]
    });
    alert.present();
  }

}



