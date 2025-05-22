
export enum ApplicationStatus {
  APPLIED = 'Applied',
  ASSESSMENT = 'Assessment',
  INTERVIEW_SCHEDULED = 'Interview Scheduled',
  INTERVIEWING = 'Interviewing',
  OFFER_RECEIVED = 'Offer Received',
  OFFER_ACCEPTED = 'Offer Accepted',
  OFFER_DECLINED = 'Offer Declined',
  REJECTED = 'Rejected',
  WITHDRAWN = 'Withdrawn',
  GHOSTED = 'Ghosted',
}

export enum ApplicationConfig {
  SITE_TITLE = 'Job Tracker',
  FOOTER_CONTENT = 'made with ❤️ by <a class="hover:underline font-bold text-gray-400" href="https://github.com/Blankscreen-exe">Blankscreen.exe</a>',
}

export interface Company {
  id: string;
  name: string;
  websiteUrl: string;
  jobPostUrl: string;
  technologies: string[];
  recruiterName?: string;
  recruiterEmail?: string;
  recruiterPhone?: string;
  notes?: string;
}

export interface ApplicationProcess {
  id: string;
  companyId: string; 
  jobTitle: string; 
  appliedDate: string; 
  status: ApplicationStatus;
  salaryExpectation?: string;
  notes?: string;
  nextFollowUpDate?: string; 
}

export interface Reference {
  id: string;
  companyId: string; 
  name: string;
  contactInfo: string; 
  relationship: string; 
  notes?: string;
}

export type EntityType = 'company' | 'application' | 'reference';

export type FormDataCompany = Omit<Company, 'id' | 'technologies'> & { technologies: string };
export type FormDataApplication = Omit<ApplicationProcess, 'id'>;
export type FormDataReference = Omit<Reference, 'id'>;
