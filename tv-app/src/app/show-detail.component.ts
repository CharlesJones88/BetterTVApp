import { Component, Input } from '@angular/core';
import {MdDialog} from "@angular/material";
import { Show } from './Show';
import { VideoService } from './video.service';
import { ShowDetailDialog } from './show-detail.dialog';


@Component({
    selector: 'show-detail',
    templateUrl: './show-detail.component.html',
    styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent {
    @Input() showList;
    @Input() show: Show;
    @Input() filteredShowList;
    @Input() openDialog: Function;

    constructor(public dialog: MdDialog, private videoService: VideoService){}
    getGenres(): string {
      return this.show.genres.join(', ');
    }
}
