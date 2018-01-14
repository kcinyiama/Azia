import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { of }      from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

import { UtilsProvider } from './../utils';
import { AppStorage } from './../storage/app';
import { JournalModel } from './../../models/journal';
import { ResponseCallback } from './../../interfaces/response-callback';

@Injectable()
export class JournalProvider {

  private journals: JournalModel[] = [];

  journalsOnChangeEvent = new Subject();

  constructor
  (
    private appStorage: AppStorage,
    private utilsProvider: UtilsProvider
  )
  {}

  getJournals(labelId: string): JournalModel[] {
    return this.journals.slice().filter((local: JournalModel) => {
      return local.labelId == labelId;
    });
  }

  getJournalById(journalId: string): JournalModel {
    return this.journals.slice().find((local: JournalModel) => {
      return local.id == journalId;
    });
  }

  fetchJournals(): void {
    this.appStorage.getJournals().then((journals: JournalModel[]) => {
      this.journals = journals;
      this.journalsOnChangeEvent.next();
    });

    /*
    this.journalHttp.getJournalData(r => {
      if (r.status && r.extras != null) {
        const savedJournals: JournalModel[] = [];

        for (const labelKey in r.extras) {
          if (r.extras.hasOwnProperty(labelKey)) {
            const labelContent = r.extras[labelKey];

            for (const journalKey in labelContent) {
              if (labelContent.hasOwnProperty(journalKey)) {
                const j = labelContent[journalKey];

                savedJournals.push(new JournalModel(
                  journalKey, j.title, j.content, j.preamble, new Date(j.createdAt),
                  j.updatedAt != null ? new Date(j.updatedAt) : null, j.tags, j.labelId
                ))
              }
            }
          }
        }

        this.journals = savedJournals;
        this.journalsOnChangeEvent.next();
        this.appStorage.setJournals(this.journals);
      }
    });
    */
  }

  autoSaveJournal(journal: JournalModel): Observable<JournalModel> {
    const journalIndex = this.journals.findIndex((local: JournalModel) => {
      return local.id == journal.id;
    });

    if (journalIndex == -1) {
      journal.id = 'j' + this.utilsProvider.generateUUID();

      this.journals.push(journal);
      this.appStorage.setJournals(this.journals).then(() => {
        this.journalsOnChangeEvent.next();
      });

      return of(Object.assign({}, journal));
    }
    else {
      this.journals[journalIndex] = journal;
      this.appStorage.setJournals(this.journals).then(() => {
        this.journalsOnChangeEvent.next();
      });
      return of(Object.assign({}, journal));
    }
    /*
    const journalIndex = this.journals.findIndex((local: JournalModel) => {
      return local.id == journal.id;
    });

    if (journalIndex == -1) {
      this.journalHttp.saveJournalData(journal, r => {
        console.log('Save journalm', r);
        return;

        // if (r.status) {
        //   this.journals.push(r.extras);
        //   this.appStorage.setJournals(this.journals);

        //   this.journalsOnChangeEvent.next();
        //   return of(Object.assign({}, journal));
        // }
      });
    }
    else {
      this.journalHttp.updateJournalData(journal, r => {
        console.log('Update journal', r);
        return;

        // if (r.status) {
        //   this.journals[journalIndex] = r.extras;
        //   this.appStorage.setJournals(this.journals);

        //   this.journalsOnChangeEvent.next();
        //   return of(Object.assign({}, journal));
        // }
      });
    }
    */
  }

  deleteJournal(journal: JournalModel, callback: ({}: ResponseCallback) => void): void {
    const pending = this.journals.filter((local: JournalModel) => {
      return local.id != journal.id;
    });

    if (pending.length < this.journals.length) {
      this.journals = pending;

      this.appStorage.setJournals(this.journals).then(() => {
        this.journalsOnChangeEvent.next();
      });
    }

    /*
    this.journalHttp.deleteJournalData(journal, r => {
      console.log('Delete journal', r);
      return;

      // if (r.status) {
      //   this.journals = this.journals.filter((local: JournalModel) => {
      //     return local.id != journal.id;
      //   });

      //   this.appStorage.setJournals(this.journals);

      //   callback({
      //     status: true,
      //     message: '',
      //   });

      //   this.journalsOnChangeEvent.next();
      // }
    });
    */
  }

  deleteJournalByLabelId(labelId: string): void {
    const pending = this.journals.filter((local: JournalModel) => {
      return local.labelId != labelId;
    });

    if (pending.length < this.journals.length) {
      this.journals = pending;

      this.appStorage.setJournals(this.journals).then(() => {
        this.journalsOnChangeEvent.next();
      });
    }
  }
}
