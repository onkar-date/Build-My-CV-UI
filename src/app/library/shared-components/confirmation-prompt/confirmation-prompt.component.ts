import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-prompt',
  templateUrl: './confirmation-prompt.component.html',
  styles: [
  ]
})
export class ConfirmationPromptComponent implements OnInit {

  @Input() title: string = '';
  @Input() bodyMessage: string = ''
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
