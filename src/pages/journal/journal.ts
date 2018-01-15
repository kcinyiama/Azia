
import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from 'ionic-angular';

import { LabelModel } from './../../models/label';
import { JournalModel } from './../../models/journal';

import { JournalViewPage } from './view/journal-view';
import { JournalCreatePage } from './create/journal-create';

import { LabelProvider } from './../../providers/label/label';
import { JournalProvider } from './../../providers/journal/journal';

import { default as prettyDate } from 'pretty-date';

@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
export class JournalPage implements OnInit {

  labelModel: LabelModel;

  journalGroup: {title: string, journalList: JournalModel[]}[] = [];

  constructor(
    private events: Events,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private labelProvider: LabelProvider,
    private journalProvider: JournalProvider
  )
  {}

  ngOnInit(): void {
    this.events.subscribe('label:selected', (labelModel: LabelModel) => {
      this.labelModel = labelModel;

      const journalList: JournalModel[] = this.journalProvider.getJournals(labelModel.id);
      this.prepareJournal(journalList);
    });

    this.labelProvider.labelsOnChangeEvent.subscribe((data: LabelModel) => {
      this.labelModel = data;

      if (this.labelModel == null) {
        this.prepareJournal([]);
        return;
      }

      const journalList: JournalModel[] = this.journalProvider.getJournals(this.labelModel.id);
      this.prepareJournal(journalList);
    });

    this.journalProvider.journalsOnChangeEvent.subscribe(() => {
      if (this.labelModel != null) {
        const journalList: JournalModel[] = this.journalProvider.getJournals(this.labelModel.id);
        this.prepareJournal(journalList);
      }
    });
  }

  onCreateJournal(): void {
    const createJournalModal = this.modalCtrl.create(JournalCreatePage, {labelId: this.labelModel.id}, {
      enableBackdropDismiss: false
    });
    createJournalModal.present();
  }

  onViewJournal(journal: JournalModel): void {
    const viewJournalModal = this.modalCtrl.create(JournalViewPage, {journal: journal});
    viewJournalModal.present();
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





