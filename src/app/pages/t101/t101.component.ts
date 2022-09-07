import { Component, Input, OnInit } from '@angular/core';
import { CVState } from 'src/app/state/CV-State/cv.reducer';

@Component({
  selector: 'app-t101',
  templateUrl: './t101.component.html',
  styleUrls: ['./t101.component.scss'],
})
export class T101Component implements OnInit {
  @Input() cvData!: CVState;
  constructor() {}

  ngOnInit(): void {}
}
