import { CVState } from './../../state/CV-State/cv.reducer';
import { ICOntactDetails } from './../interface/contactDetails.interface';
import { ITemplate } from './../interface/template.interface';
import { ICertificate } from './../interface/certificate.interface';
import { IProject } from './../interface/project.interface';
import { ISkill } from './../interface/skills.interface';
import { IPersonalDetails } from './../interface/personalDetails.interface';
import { IExperience } from './../interface/experience.interface';
import { IEducation } from '../interface/education.interface';

export const mockPersonalDetails: IPersonalDetails = {
  firstName: 'Onkar',
  lastName: 'Date',
  areaOfExpertise: 'Front End Developer',
  aboutMe:
    'UI developer with 2.5 years of experience in web development.Skilled in designing, developing, and testing web-based applications, incorporating range of techniques like HTML, CSS, JavaScript.',
};

export const mockSKills: ISkill[] = [
  {
    name: 'Angular',
    rating: 5,
  },
  {
    name: 'Node.js',
    rating: 5,
  },
  {
    name: 'JavaSCript',
    rating: 4,
  },
  {
    name: 'Bootstrap',
    rating: 4,
  },
  {
    name: 'Python',
    rating: 3,
  },
  {
    name: 'MongoDB',
    rating: 3,
  },
];

export const mockEducation: IEducation[] = [
  {
    degree: 'Bachelor of Engineering (Computer Engineering)',
    batch: '2015 - 2019',
    university: 'Savitribai Phule Pune University',
  },
  {
    degree: '12th',
    batch: '2013 - 2015',
    university: 'Sir Parashurambhau College',
  },
  {
    degree: '10th',
    batch: '2011 - 2013',
    university: 'Sane Guruji Madhyamik Vidyalay',
  },
];

export const mockExperience: IExperience[] = [
  {
    companyName: 'Infosys Ltd.',
    designation: 'Systems Engineer',
    workedFrom: 'January 01, 2020',
    workedTill: 'December 06, 2021',
    description: [
      'Working on developing a CPQ (Configure Price Quote) application For Thyssenkrupp Elevators',
      'Using Angular 11 Created and displayed dynamic reactive forms by consuming data from API.',
      'Developed custom modules and components to achieve better user experience.',
      'Designed and created routable modals and components to achieve better user experience',
    ],
  },
  {
    companyName: 'Infosys Ltd.',
    designation: 'Systems Engineer Trainee',
    workedFrom: 'August 11, 2019',
    workedTill: 'January 01, 2020',
    description: [
      'Working on developing a CPQ (Configure Price Quote) application For Thyssenkrupp Elevators',
      'Using Angular 11 Created and displayed dynamic reactive forms by consuming data from API.',
      'Developed custom modules and components to achieve better user experience.',
      'Designed and created routable modals and components to achieve better user experience',
    ],
  },
];

export const mockProjects: IProject[] = [
  {
    title: 'Portfolio',
    description: 'My Portfolio',
    link: 'https://onkar-date.github.io/portfolio/home',
  },
  {
    title: 'My Laptop Replica',
    description:
      'Replica of my laptop created with Angular and bootstrap and little bit of JS',
    link: 'https://onkar-date.github.io/my-laptop/laptop',
  },
];

export const mockCertificates: ICertificate[] = [
  {
    title: 'Infosys Certified Angular Professional',
    yearOfCompletion: '2021',
  },
  {
    title: 'Infosys Certified Front End Web Developer',
    yearOfCompletion: '2020',
  },
  {
    title: 'Infosys Certified React Professional',
    yearOfCompletion: '2020',
  },
];

export const mockTemplate: ITemplate = {
  id: 'T104',
  name: 'Template 3',
};

export const mockContactDetails: ICOntactDetails = {
  mobile: '9922064217',
  email: 'onkar101197@gmail.com',
  linkedIn: 'adadadadada./adadad',
  address: 'Hadapsar, Pune 411028',
};

export const mockInitialState: CVState = {
  personalDetails: {
    firstName: mockPersonalDetails.firstName,
    lastName: mockPersonalDetails.lastName,
    areaOfExpertise: mockPersonalDetails.areaOfExpertise,
    aboutMe: mockPersonalDetails.aboutMe,
  },
  contactDetails: {
    mobile: mockContactDetails.mobile,
    email: mockContactDetails.email,
    linkedIn: mockContactDetails.linkedIn,
    address: mockContactDetails.address,
  },
  skills: [...mockSKills],
  experience: [...mockExperience],
  education: [...mockEducation],
  projects: [...mockProjects],
  certificates: [...mockCertificates],
  interest: ['Playing Games', 'Surfing Internet', 'Playing Guitar'],
  template: {
    name: mockTemplate.name,
    id: mockTemplate.id,
  },
};
