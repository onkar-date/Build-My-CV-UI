import { AppState } from './../../state/app.state';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { ISection } from './../../shared/interface/section.interface';
import { Component, OnInit } from '@angular/core';
import { SECTIONS } from 'src/app/shared/constants/section.constants';
import { selectSections } from 'src/app/state/CV-State/cv.selectors';
import { selectSection } from 'src/app/state/CV-State/cv.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sections$ = this.store.select(selectSections);
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  goToSection(selectedSection: ISection): void {
    this.store.dispatch(selectSection({ section: selectedSection }));
    this.router.navigate([`./${selectedSection.routerLink}`], {
      relativeTo: this.activatedRoute,
    });
  }
}
