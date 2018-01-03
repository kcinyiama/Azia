
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { of }      from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

import { AppStorage } from './../storage/app';
import { JournalModel } from './../../models/journal';
import { ResponseCallback } from './../../interfaces/response-callback';

@Injectable()
export class JournalProvider {

  private journals: JournalModel[] = [
    new JournalModel(1, 'A Week Like No Other', 'A very long content', 'I thought it was all over but then I was wrong', new Date('April 17, 2017 03:24:00'), null, ['Love', 'Hate'], 1),
    new JournalModel(2, 'How I Met A Diva', 'A very long content', "If you think you've seen them all, look again", new Date('April 16, 2017 03:24:00'), null, [], 2),
    new JournalModel(3, 'A Journey To Akitikpa', 'A very long content', "A very wonderful place to be", new Date('June 17, 2017 03:24:00'), null, [], 3),
    new JournalModel(4, 'Challenge', 'A very long content', "This is the toughest battle yet", new Date('June 17, 2017 03:24:00'), null, [], 4),
    new JournalModel(5, 'Crush', 'A very long content', "I don't have a preamble for this one", new Date('April 17, 2017 03:24:00'), null, [], 1),
  ];

  journalsOnChangeEvent = new Subject();

  constructor
  (
    private appStorage: AppStorage
  )
  {}

  getJournals(labelId: number): JournalModel[] {
    return this.journals.slice().filter((local: JournalModel) => {
      return local.labelId == labelId;
    });
  }

  getJournalById(journalId: number): JournalModel {
    return this.journals.slice().find((local: JournalModel) => {
      return local.id == journalId;
    });
  }

  fetchJournals(): void {
    this.appStorage.getJournals().then((journals: JournalModel[]) => {
      this.journals = journals;
      this.journalsOnChangeEvent.next();
    });

    // Make a request to the backend to fetch for new journals
  }

  saveJournal(journal: JournalModel, callback: ({}: ResponseCallback) => void): void {
    // Save the journal on the backend
    // Delete later
    let id = 1;
    if (this.journals.length > 0) {
      id = this.journals[this.journals.length - 1].id;
      id++;
    }
    journal.id = id;

    this.journals.push(journal);
    this.appStorage.setJournals(this.journals);

    this.journalsOnChangeEvent.next();
  }

  autoSaveJournal(journal: JournalModel): Observable<JournalModel> {
    let id = 1;
    if (this.journals.length > 0) {
      id = this.journals[this.journals.length - 1].id;
      id++;
    }

    if (journal.id == -1) {
      journal.id = id;

      this.journals.push(journal);
      this.appStorage.setJournals(this.journals);

      this.journalsOnChangeEvent.next();
      return of(Object.assign({}, journal));
    }

    const journalIndex = this.journals.findIndex((local: JournalModel) => {
      return local.id == journal.id;
    });

    if (journalIndex != -1) {
      this.journals[journalIndex] = journal;

      this.appStorage.setJournals(this.journals);
      this.journalsOnChangeEvent.next();

      return of(Object.assign({}, journal));
    }
    return of();
  }

  deleteJournal(id: number, callback: ({}: ResponseCallback) => void): void {
    this.journals = this.journals.filter((local: JournalModel) => {
      return local.id != id;
    });

    this.appStorage.setJournals(this.journals);

    callback({
      status: true,
      message: '',
    });

    this.journalsOnChangeEvent.next();
  }
}
