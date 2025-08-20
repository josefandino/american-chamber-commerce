export interface MembershipResponse {
  memberships: MembershipI[];
  notes: NotesI;
}

export interface MembershipI {
  category: string;
  price_usd: number | null;
  currency: string;
  billing_cycle: string;
  cta_label: string;
  benefits: BenefitsI;
}

export interface BenefitsI {
  publications_access: boolean;
  job_portal_access: boolean;
  visa_processing_priority: string;
  offers_discounts: string;
  fda_advisory: boolean;
  event_invitations: string;
  service_discounts: string;
  newsletter_announcements: string;
  business_promotion: string;
  event_guests_allowed: number;
  logo_webpage: string;
  vip_invitations: boolean | string;
  newsletter_publications: boolean | string;
  email_marketing_service: boolean | string;
  office_space_access: string;
  annual_meeting_invitation: boolean;
  custom_webinars: boolean;
  annual_gala_access: boolean | string;
  event_participation: boolean;
}

export interface NotesI {
  disclaimer: string;
  event_invitations: string;
  office_space: string;
  custom_webinars: string;
  newsletter_publications: string;
  vip_tickets: string;
}
