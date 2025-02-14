import { environment as local } from './environments/environment';
import { environment as devEnv } from './environments/environment.dev';
import { environment as qaEnv } from './environments/environment.qa';
import { environment as prodEnv } from './environments/environment.prod';

// Map hostnames to environments
const hostname = window.location.hostname;

const envConfig:Record<string, typeof devEnv> = {
  'localhost': local,  // Localhost uses development
  'dev.example.com': devEnv,  // Dev server
  'staging.example.com': qaEnv,  // QA server
  'www.example.com': prodEnv,  // Production
  'example.com': prodEnv  // Production
};

// Default to production if hostname is unknown
export const environment = envConfig[hostname] || devEnv;
