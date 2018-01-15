import { Component, OnInit, Input } from '@angular/core';
import { Popover, NavParams, ViewController, PopoverController, ToastController } from 'ionic-angular';

import { Subject } from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Observable } from 'rxjs/Observable';

import { LabelPopoverPage } from './label/label';
import { LabelModel } from './../../../models/label';
import { JournalModel } from './../../../models/journal';
import { JournalProvider } from './../../../providers/journal/journal';

@Component({
  selector: 'page-journal-create',
  templateUrl: 'journal-create.html'
})
export class JournalCreatePage implements OnInit {

  /** If the journal is being saved or not */
  isSaving: boolean = false;

  isUpdate: boolean = false;

  /** If the journal was successfully saved or not */
  saveStatus: string = '';

  journal: JournalModel;

  private saveJournal = new Subject<JournalModel>();

  constructor
  (
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private popoverCtrl: PopoverController,
    private journalProvider: JournalProvider
  )
  {
    this.journal = new JournalModel('', '', '', '', new Date(), null, [], '');
  }

  ngOnInit(): void {
    if (this.navParams.data.journal != null) {
      this.isUpdate = true;
      this.journal = this.navParams.data.journal;
    }
    else if (this.navParams.data.labelId != null) {
      this.journal.labelId = this.navParams.data.labelId;
    }

    this.saveJournal.pipe(
      debounceTime(500),

      switchMap((journal: JournalModel) => {
        return this.journalProvider.autoSaveJournal(journal);
      })

    ).subscribe((res) => {
      this.journal = res;
      this.isSaving = false;
      this.saveStatus = 'Saved';
    });
  }

  onAddJournalTag(tagInput: any, event: KeyboardEvent): void {
    if (event.keyCode == 13 && tagInput.value != '') {
      if (this.journal.tags.length == 10) {
        const toast = this.toastCtrl.create({
          message: 'Maximum tags added',
          duration: 1000
        });
        toast.present();
        return;
      }

      // Tag mush not exist already
      const index = this.journal.tags.findIndex((journalTag: string) => {
        return journalTag.toLowerCase() == tagInput.value.toLowerCase()
      });

      if (index != -1) {
        const toast = this.toastCtrl.create({
          message: 'Tag already exists',
          duration: 1000
        });
        toast.present();
        return;
      }

      // enter pressed
      this.journal.tags.push(tagInput.value);
      tagInput.value = '';

      // Trigger the event here for newly added tags
      this.onJournalContentChange();
    }
  }

  onRemoveJournalTag(tag: string): void {
    this.journal.tags = this.journal.tags.filter((journalTag: string) => {
      return journalTag.toLocaleLowerCase() != tag.toLocaleLowerCase();
    });
  }

  onOptionsMenuPressed(event: any): void {
    let popover: Popover = this.popoverCtrl.create(LabelPopoverPage, {labelId: this.journal.labelId});
    popover.present({
      ev: event
    });
    popover.onDidDismiss((labelId: string) => {
      if (labelId != null) {
        this.journal.labelId = labelId;

        // TODO Changing labels should delete the old
        // journal of the previous label
        this.onJournalContentChange();
      }
    });
  }

  onBackPressed(): void {
    this.viewCtrl.dismiss();
  }

  onJournalContentChange(): void {
    this.isSaving = true;

    if (this.isUpdate) {
      this.journal.updatedAt = new Date();
    }
    this.saveJournal.next(this.journal);
  }

}
