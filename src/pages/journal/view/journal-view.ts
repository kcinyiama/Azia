import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController, ViewController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { LabelModel } from './../../../models/label';
import { JournalModel } from './../../../models/journal';
import { JournalCreatePage } from './../create/journal-create';

import { default as prettyDate } from 'pretty-date';

@Component({
  selector: 'page-journal-view',
  templateUrl: 'journal-view.html'
})
export class JournalViewPage implements OnInit {

  journal: JournalModel;

  constructor
  (
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController
  )
  {}

  ngOnInit(): void {
    this.journal = new JournalModel(
      1,
      'A Week Like No Other',
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
      'I thought it was all over but then, I was wrong',
      new Date('April 17, 2017 03:24:00'),
      null,
      ['Love', 'Happy', 'Fun'],
      1
    )
  }

  onUpdateJournal(): void {
    const updateJournalModal = this.modalCtrl.create(JournalCreatePage, {update: true}, {
      enableBackdropDismiss: false
    });
    updateJournalModal.present();
  }

  onDeleteJournal(): void {
    const alert = this.alertCtrl.create({
      title: 'Delete this journal?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  getLastUpdateText(): string {
    if (this.journal.updatedAt != null) {
      return 'Last Updated &#8226; ' + prettyDate.format(this.journal.updatedAt);
    }
    return 'Created &#8226; ' + prettyDate.format(this.journal.createdAt);
  }
}
