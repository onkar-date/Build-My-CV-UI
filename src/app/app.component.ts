import { CVState } from './state/CV-State/cv.reducer';
import { ClientStoreService } from './shared/services/client-store.service';
import { selectCVState } from './state/CV-State/cv.selectors';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { initiState } from './state/CV-State/cv.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  stateData!: CVState;
  appLoaded = false;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private clientStore: ClientStoreService
  ) {}

  ngOnInit(): void {
    this.router.navigate(['templates']);
    this.clientStore.getItem('cvState').then((stateData: CVState) => {
      if (stateData) {
        this.store.dispatch(initiState({ cvState: stateData }));
      }
      this.appLoaded = true;
    });
    this.store.select(selectCVState).subscribe((cvState) => {
      this.clientStore.setItem('cvState', cvState);
    });
  }
  title = 'Build My CV';
}
