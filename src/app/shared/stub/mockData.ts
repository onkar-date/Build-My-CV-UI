import { SECTIONS } from 'src/app/shared/constants/section.constants';
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
  firstName: 'Jon',
  lastName: 'Snow',
  areaOfExpertise: 'Knowing Nothing',
  aboutMe:
    'Bastard son of lord Eddard Stark and former Lord Commander of Nights Watch who was recently resurrected from the dead and now is looking for revenge',
};

export const mockSKills: ISkill[] = [
  {
    id: 'bbf3f64c-abff-4124-a897-eba8f6aafbe0',
    name: 'Tremendous horseback rider',
    rating: 5,
  },
  {
    id: '19e88891-c3d8-4f13-aaa6-26770b7548f1',
    name: 'Natural born leader with loyal followers',
    rating: 5,
  },
  {
    id: '1f3fe223-dd77-4f68-8fd0-68687463818d',
    name: 'Knower of nothing.',
    rating: 4,
  },
  {
    id: '98e5becd-83db-4430-ad7e-1ff7941742f8',
    name: 'Knee bender',
    rating: 4,
  },
];

export const mockEducation: IEducation[] = [
  {
    id: 'agaagag',
    degree: 'Nobles Education',
    batch: '290 AC - 300 AC (Winterfell)',
    university: 'Master Lewin',
  },
  {
    id: 'afsgahaha',
    degree: 'Dragon Rider',
    batch: '305 AC - 306 AC',
    university: 'Daenerys Targaryen',
  },
];

export const mockExperience: IExperience[] = [
  {
    id: 'oadkgaocals',
    companyName: 'Winterfell',
    designation: 'Bastard Child',
    workedFrom: '290 AC',
    workedTill: '300 AC',
    description: [
      'Developed advanced swodplay skills while dueling with brother Robb',
      'Treated coldly by Catelyn who saw me as a reminder of Eddards unfaithfulness (still learned the value of true honor)',
      'Discovered outcast direwolf pup and raised it as my own (Ghost)',
      'Received young lord martial training from Master-at-Arms Rodrik Cassel',
    ],
  },
  {
    id: 'dfkaofka',
    companyName: 'The Wall',
    designation: 'Nights Watch',
    workedFrom: '305 AC',
    workedTill: '310 AC',
    description: [
      "Committed my oath and allegiance to the Night's Watch",
      'Started rough but soon became a friend and trusted leader to many (met BFF Samwell)',
      'Honored by receiving Longclaw (Valyrian steel sword) from Jorah Mormont',
      'Held The Wall and took over as leader during the wildling attack',
      "Elected to Lord Commander of the Night's Watch after a surprise election",
    ],
  },
];

export const mockProjects: IProject[] = [
  {
    id: 'akgpaga;gk',
    title: 'Portfolio',
    description: 'My Portfolio',
    link: 'https://www.hbo.com/game-of-thrones',
  },
];

export const mockCertificates: ICertificate[] = [
  {
    id: 'afagahah',
    title: 'Westeros Certified Professional Dothraki',
    yearOfCompletion: '305',
  },
  {
    id: 'afagahaadgagh',
    title: 'Westeros Certified Drago Rider',
    yearOfCompletion: '310',
  },
  {
    id: 'adgagahgahah',
    title: 'Westeros Certified City Waych Commander',
    yearOfCompletion: '315',
  },
];

export const mockTemplate: ITemplate = {
  id: 'T101',
  name: 'Template 1',
};

export const mockContactDetails: ICOntactDetails = {
  mobile: '1234567890',
  email: 'jon.snow@nightsWatch.com',
  linkedIn: 'https://www.linkedin.com/in/jon-snow-a12345/',
  address: 'Nights Watch, North 12345',
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
  interest: ['Riding Dragon', 'Bending Knee', 'Knowing Nothing'],
  template: {
    name: mockTemplate.name,
    id: mockTemplate.id,
  },
  sections: SECTIONS,
};
