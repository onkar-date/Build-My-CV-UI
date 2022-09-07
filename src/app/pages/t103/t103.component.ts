import { CVState } from 'src/app/state/CV-State/cv.reducer';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-t103',
  templateUrl: './t103.component.html',
  styleUrls: ['./t103.component.scss'],
})
export class T103Component implements OnInit {
  @Input() cvData!: CVState;
  constructor() {}

  ngOnInit(): void {}
}
