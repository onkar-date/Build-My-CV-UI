import { SECTIONS } from './../../../shared/constants/section.constants';
import { AppState } from './../../../state/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {
  username: string | undefined;
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {}

  showTemplates(): void {
    this.router.navigate(['./templates']);
  }
}
