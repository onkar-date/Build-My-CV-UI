import { ISection } from './../interface/section.interface';
export const SECTIONS: ISection[] = [
  {
    id: 'personalDetails',
    title: 'Personal Details',
    routerLink: 'personal-details',
    active: true
  },
  {
    id: 'contactDetails',
    title: 'Contact Details',
    routerLink: 'contact-details',
    active: false
  },
  {
    id: 'skills',
    title: 'Skills',
    routerLink: 'skills',
    active: false
  },
  {
    id: 'experience',
    title: 'Experience',
    routerLink: 'experience',
    active: false
  },
  {
    id: 'education',
    title: 'Education',
    routerLink: 'education',
    active: false
  },
  {
    id: 'personalProjects',
    title: 'Personal Projects',
    routerLink: 'personal-projects',
    active: false
  },
  {
    id: 'certificates',
    title: 'Certificates',
    routerLink: 'certificates',
    active: false
  },
  {
    id: 'interests',
    title: 'Interests',
    routerLink: 'interests',
    active: false
  },
  {
    id: 'summary',
    title: 'Summary',
    routerLink: 'summary',
    active: false
  },
];
