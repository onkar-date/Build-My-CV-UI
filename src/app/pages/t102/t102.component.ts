import { CVState } from './../../state/CV-State/cv.reducer';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-t102',
  templateUrl: './t102.component.html',
  styleUrls: ['./t102.component.scss']
})
export class T102Component implements OnInit {
  @Input() cvData!: CVState;
  constructor() { }

  ngOnInit(): void {
  }

}
