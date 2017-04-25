import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Show } from './Show';

@Component({
  selector: 'show-detail-dialog',
  templateUrl: './show-detail.dialog.html',
  styles: [
    `.dialog-text-width {
            width:510px;
        }`,
    `.title {
            margin-top: 0;
            margin-bottom: 0;
        }`,
    `.img-space {
            margin-right: 5px;
        }`
  ]
})
export class ShowDetailDialog {
  public show: Show
  constructor(public dialogRef: MdDialogRef<ShowDetailDialog>) {}
  hideShow() {
    let hiddenShows = [];
    if(localStorage.getItem('hidden-shows')) {
      hiddenShows = JSON.parse(localStorage.getItem('hidden-shows'));
    }
    hiddenShows.push(this.show.imdb_id);
    localStorage.setItem('hidden-shows', JSON.stringify(hiddenShows));
    this.dialogRef.close(this.show);
  }
}
