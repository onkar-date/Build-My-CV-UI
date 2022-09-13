export interface ISection {
  id: string;
  title: string;
  routerLink: string;
  active: boolean;
}

export interface ISectionValidity {
  [key: string]: boolean;
}