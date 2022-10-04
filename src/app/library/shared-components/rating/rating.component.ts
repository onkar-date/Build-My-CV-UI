import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as uuid from 'uuid';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() totalRating = 5;
  @Input() currentRating = 0;
  @Input() editable = true;
  @Output() ratingChanged = new EventEmitter<number>();
  id: string = uuid.v4().split('-')[0];
  constructor() {}

  ngOnInit(): void {}

  onMouseOver(index: number): void {
    if (!this.editable) {
      return;
    }
    const icons = document.getElementsByClassName(`rating-${this.id}`);
    for (let i = 0; i < icons.length; i++) {
      if (i <= index) {
        icons[i].classList.remove('fa-star-o');
        icons[i].classList.add('fa-star');
      } else {
        icons[i].classList.add('fa-star-o');
        icons[i].classList.remove('fa-star');
      }
    }
  }

  onMouseLeave(): void {
    if (!this.editable) {
      return;
    }
    const icons = document.getElementsByClassName(`rating-${this.id}`);
    for (let i = 0; i < icons.length; i++) {
      if (i <= this.currentRating) {
        icons[i].classList.remove('fa-star-o');
        icons[i].classList.add('fa-star');
      } else {
        icons[i].classList.add('fa-star-o');
        icons[i].classList.remove('fa-star');
      }
    }
  }

  setRating(index: number) {
    this.currentRating = index;
    this.ratingChanged.emit(this.currentRating + 1);
  }
}
