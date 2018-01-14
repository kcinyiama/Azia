import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController, ViewController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { LabelModel } from './../../../models/label';
import { JournalModel } from './../../../models/journal';
import { JournalCreatePage } from './../create/journal-create';
import { LabelProvider } from './../../../providers/label/label';
import { JournalProvider } from './../../../providers/journal/journal';

import { default as prettyDate } from 'pretty-date';

@Component({
  selector: 'page-journal-view',
  templateUrl: 'journal-view.html'
})
export class JournalViewPage implements OnInit {

  journal: JournalModel;

  journalSubscription: Subscription;

  constructor
  (
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private labelProvider: LabelProvider,
    private popoverCtrl: PopoverController,
    private journalProvider: JournalProvider
  )
  {}

  ngOnInit(): void {
    this.journal = this.navParams.data.journal;

    this.journalSubscription = this.journalProvider.journalsOnChangeEvent.subscribe(() => {
      this.journal = this.journalProvider.getJournalById(this.journal.id);
    });
  }

  onUpdateJournal(): void {
    const updateJournalModal = this.modalCtrl.create(JournalCreatePage, {journal: Object.assign({}, this.journal)}, {
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
            this.journalProvider.deleteJournal(this.journal, r => {
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

  getLastUpdateText(): string {
    if (this.journal == null) {
      return '';
    }

    if (this.journal.updatedAt != null) {
      return 'Last Updated &#8226; ' + prettyDate.format(this.journal.updatedAt);
    }
    return 'Created &#8226; ' + prettyDate.format(this.journal.createdAt);
  }

  getLabelText(): string {
    if (this.journal == null) {
      return '';
    }

    const label: LabelModel = this.labelProvider.getLabels().find((local: LabelModel) => {
      return local.id == this.journal.labelId;
    });

    return label.name;
  }

  ionViewWillUnload(){
    this.journalSubscription.unsubscribe();
  }
}
