import { Component, Input } from '@angular/core';

import { Show } from './Show';

@Component({
    selector: 'show-detail',
    templateUrl: './show-detail.component.html',
    styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent {
    @Input() show: Show;

    getGenres(): string {
      return this.show.genres.join(', ');
    }
}
