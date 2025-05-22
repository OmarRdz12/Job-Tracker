
import { ApplicationStatus, ApplicationConfig } from './types';

export const APPLICATION_STATUS_OPTIONS = Object.values(ApplicationStatus).map(status => ({
  value: status,
  label: status,
}));

export const SITE_TITLE = ApplicationConfig.SITE_TITLE;
export const FOOTER_CONTENT = ApplicationConfig.FOOTER_CONTENT;

