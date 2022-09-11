export interface ISection {
  id: string;
  title: string;
  routerLink: string;
  active: boolean;
  isValid: boolean;
  isOptional: boolean;
}

export interface ISectionValidity {
  [key: string]: boolean;
}