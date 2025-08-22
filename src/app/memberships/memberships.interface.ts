export interface MembershipsI {
  memberships: Membership[];
  notes: Notes;
}

export interface Membership {
  category: string;
  price_usd: number;
  currency: string;
  billing_cycle: string;
  cta_label: string;
  type: string;
  benefits?: Benefits;
}

export interface Benefits {
  publications_access: string;
  publications_access_bool: boolean;
  job_portal_access: string;
  job_portal_access_bool: boolean;
  visa_processing_priority: string;
  visa_processing_priority_bool: boolean;
  offers_discounts: string;
  offers_discounts_bool: boolean;
  fda_advisory: string;
  fda_advisory_bool: boolean;
  event_invitations: string;
  event_invitations_bool: boolean;
  service_discounts: string;
  service_discounts_bool: boolean;
  newsletter_announcements: string;
  newsletter_announcements_bool: boolean;
  business_promotion: string;
  business_promotion_bool: boolean;
  event_guests_allowed: string;
  event_guests_allowed_bool: number;
  logo_webpage: string;
  logo_webpage_bool: boolean;
  vip_invitations: string;
  vip_invitations_bool: boolean;
  newsletter_publications: string;
  newsletter_publications_bool: boolean;
  email_marketing_service: string;
  email_marketing_service_bool: boolean;
  office_space_access: string;
  office_space_access_bool: boolean;
  annual_meeting_invitation: string;
  annual_meeting_invitation_bool: boolean;
  custom_webinars: string;
  custom_webinars_bool: boolean;
  annual_gala_access: string;
  annual_gala_access_bool: boolean;
  event_participation: string;
  event_participation_bool: boolean;
}

export interface Notes {
  disclaimer: string;
  event_invitations: string;
  office_space: string;
  custom_webinars: string;
  newsletter_publications: string;
  vip_tickets: string;
}
