import { CVState } from 'src/app/state/CV-State/cv.reducer';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-t105',
  templateUrl: './t105.component.html',
  styleUrls: ['./t105.component.scss']
})
export class T105Component implements OnInit {

  @Input() cvData!: CVState;
  constructor() { }

  ngOnInit(): void {
  }

}
