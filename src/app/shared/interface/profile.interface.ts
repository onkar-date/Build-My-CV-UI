import { Interest } from './interest.interface';
import { ICertificate } from "./certificate.interface";
import { IEducation } from "./education.interface";
import { IExperience } from "./experience.interface";
import { IPersonalDetails } from "./personalDetails.interface";
import { IProject } from "./project.interface";
import { ISkill } from "./skills.interface";

export interface IProfile {
  personalDetails: IPersonalDetails;
  contactDetails: {
    mobile: string;
    email: string;
    linkedIn: string;
    address: string;
  };
  skills: ISkill[];
  experience: IExperience[];
  education: IEducation[];
  projects: IProject[];
  certificates: ICertificate[];
  interests: Interest[];
}
