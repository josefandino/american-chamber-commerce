export interface ListProgramsI {
  title: string;
  expanded: boolean;
  content: ContentListProgramsI[];
}

export interface ContentListProgramsI {
  type: string;
  text?: string;
  pathUrl?: string;
  linkText?: string;
}
