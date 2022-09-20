import { CVState } from 'src/app/state/CV-State/cv.reducer';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-t106',
  templateUrl: './t106.component.html',
  styleUrls: ['./t106.component.scss']
})
export class T106Component implements OnInit {

  @Input() cvData!: CVState;
  constructor() { }

  ngOnInit(): void {
  }

}
