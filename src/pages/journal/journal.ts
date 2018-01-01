import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from 'ionic-angular';

import { LabelModel } from './../../models/label';
import { JournalModel } from './../../models/journal';
import { JournalCreatePage } from './create/journal-create';

import { default as prettyDate } from 'pretty-date';

@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
export class JournalPage implements OnInit {

  journalGroup: {title: string, journalList: JournalModel[]}[] = [];

  constructor(
    private events: Events,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit(): void {
    this.events.subscribe('label:selected', (labelModel: LabelModel) => {
      // TODO Fetch the journals based on the label from the storage

      const journalList: JournalModel[] = [
        new JournalModel(1, 'A Week Like No Other', 'A very long content', 'I thought it was all over but then I was wrong', new Date(), new Date(), [], new LabelModel(1, 'My thoughts')),
        new JournalModel(2, 'How I Met A Diva', 'A very long content', "If you think you've seen them all, look again", new Date(), new Date(), [], new LabelModel(1, 'My thoughts')),
        new JournalModel(3, 'A Journey To Akitikpa', 'A very long content', "A very wonderful place to be", new Date(), new Date(), [], new LabelModel(1, 'My thoughts')),
        new JournalModel(4, 'Challenge', 'A very long content', "This is the toughest battle yet", new Date(), new Date(), [], new LabelModel(1, 'My thoughts')),
        new JournalModel(5, 'Crush', 'A very long content', "I don't have a preamble for this one", new Date(), new Date(), [], new LabelModel(1, 'My thoughts')),
      ];

      this.prepareJournal(journalList);
    });
  }

  onCreateJournal(): void {
    const createJournalModal = this.modalCtrl.create(JournalCreatePage, {}, {
      enableBackdropDismiss: false
    });
    createJournalModal.present();
  }

  onLabelSelected(labelModel: any): void {
    console.log(labelModel);
  }

  private prepareJournal(journalList: JournalModel[]): void {
    this.journalGroup = [];

    journalList.forEach((journal: JournalModel) => {
      let added = false;

      const formattedDate = prettyDate.format(journal.createdAt);

      this.journalGroup.forEach((journalGroupItem: any) => {

        if (journalGroupItem.title == formattedDate) {
          added = true;
          journalGroupItem.journalList.push(journal);
        }
      });

      if (!added) {
        this.journalGroup.push({
          title: formattedDate,
          journalList: [journal]
        });
      }
    });
  }

  extractFirstLetter(content: string): string {
    return content.substr(0, 1).toUpperCase();
  }

  ionViewWillUnload(){
    this.events.unsubscribe('label:selected');
  }
}





