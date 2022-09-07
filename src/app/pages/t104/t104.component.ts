import { Component, Input, OnInit } from '@angular/core';
import { CVState } from 'src/app/state/CV-State/cv.reducer';

@Component({
  selector: 'app-t104',
  templateUrl: './t104.component.html',
  styleUrls: ['./t104.component.scss'],
})
export class T104Component implements OnInit {
  @Input() cvData!: CVState;
  constructor() {}

  ngOnInit(): void {}
}
