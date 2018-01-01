
import { Component, OnInit } from '@angular/core';
import { ViewController, PopoverController } from 'ionic-angular';

import { Subject } from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Observable } from 'rxjs/Observable';

import { LabelPopoverPage } from './label/label';
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

  journalTagList: string[] = ['Love', 'Happy', 'Joy'];

  journal$: Observable<string[]>;

  private saveJournal = new Subject<JournalModel>();

  constructor
  (
    private viewCtrl: ViewController,
    private popoverCtrl: PopoverController
  ) {}

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

  onAddJournalTag(tagInput: any, event: KeyboardEvent): void {
    if (this.journalTagList.length == 10) {
      alert('Max tag added');
      return;
    }

    if (event.keyCode == 13 && tagInput.value != '') {
      // Tag mush not exist already
      const index = this.journalTagList.findIndex((journalTag: string) => {
        return journalTag.toLowerCase() == tagInput.value.toLowerCase()
      });

      if (index != -1) {
        alert('Tag already exists');
        return;
      }

      // enter pressed
      this.journalTagList.push(tagInput.value);
      tagInput.value = '';

      // Trigger the event here for newly added tags
      this.onJournalContentChange();
    }
  }

  onRemoveJournalTag(tag: string): void {
    this.journalTagList = this.journalTagList.filter((journalTag: string) => {
      return journalTag.toLocaleLowerCase() != tag.toLocaleLowerCase();
    });
  }

  onOptionsMenuPressed(event: any): void {
    let popover = this.popoverCtrl.create(LabelPopoverPage);
    popover.present({
      ev: event
    });
  }

  onBackPressed(): void {
    this.viewCtrl.dismiss();
  }

  onJournalContentChange(): void {
    this.saveJournal.next(new JournalModel(1, 'A Week Like No Other', 'A very long content', 'I thought it was all over but then I was wrong', new Date(), new Date(), [], new LabelModel(1, 'My thoughts')));
  }

}
