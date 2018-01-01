import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { Subject } from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Observable } from 'rxjs/Observable';

import { LabelModel } from './../../../models/label';
import { JournalModel } from './../../../models/journal';

@Component({
  selector: 'page-journal-create',
  templateUrl: 'journal-create.html'
})
export class JournalCreatePage implements OnInit {

  /** If the journal is being saved or not */
  isSaving: boolean = false;

  /** If the journal was successfully saved or not */
  saveStatus: string = 'Saved';

  journal$: Observable<string[]>;

  private saveJournal = new Subject<JournalModel>();

  constructor(private viewCtrl: ViewController) {

  }

  ngOnInit(): void {
    this.saveJournal.pipe(
      debounceTime(5000),

      // switchMap((journal: JournalModel) => {
      //   console.log('Jourbal ', journal);
      //   return new Observable<JournalModel>();
      // })

    ).subscribe((res) => {
      console.log(res);
    });
  }

  onBackPressed(): void {
    this.viewCtrl.dismiss();
  }

  onJournalContentChange(): void {
    this.saveJournal.next(new JournalModel(1, 'A Week Like No Other', 'A very long content', 'I thought it was all over but then I was wrong', new Date(), new Date(), [], new LabelModel(1, 'My thoughts')));
  }

}
