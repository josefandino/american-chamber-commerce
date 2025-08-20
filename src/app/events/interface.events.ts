export interface EventsI {
  id: number;
  title: string;
  slug: string;
  date: Date;
  month: string;
  day: string;
  time: Time;
  location: Location;
  language: string;
  modality: string;
  event_type: string;
  tickets: Ticket[];
  description: string;
  speakers: Speaker[];
  sponsors: Sponsor[];
  cta: Cta;
  image: string;
}

export interface Cta {
  label: string;
  url: string;
}

export interface Location {
  city: string;
  venue: null | string;
  address: null | string;
}

export interface Speaker {
  name: string;
  title: string;
  organization: string;
  role?: string;
  photo: string;
}

export interface Sponsor {
  name: string;
  logo: string;
}

export interface Ticket {
  type: string;
  price: number;
  currency: string;
}

export interface Time {
  start: string;
  end: string;
  timezone: string;
}
