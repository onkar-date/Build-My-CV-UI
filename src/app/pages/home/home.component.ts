import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sections = [
    {
      title: 'Personal Details',
      routerLink: 'personal-details'
    },
    {
      title: 'Skills',
      routerLink: 'skills'
    },
    {
      title: 'Experience',
      routerLink: 'experience'
    },
    {
      title: 'Education',
      routerLink: 'education'
    },
    {
      title: 'Personal Projects',
      routerLink: 'personal-projects'
    },
    {
      title: 'Certificates',
      routerLink: 'certificates'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
