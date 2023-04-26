import { defineEnv } from './utils/define-env';

const isMock = 
  import.meta.env.MODE === 'webmock' ||
  import.meta.env.MODE === 'webe2emock';
const isDevelopment = 
  import.meta.env.MODE === 'webdevelopment' ||
  import.meta.env.MODE === 'development';
const isWeb = 
  import.meta.env.MODE === 'webmock' ||
  import.meta.env.MODE === 'webe2emock' ||
  import.meta.env.MODE === 'webdevelopment' ||
  import.meta.env.MODE === 'web_PRD';
const isDesktop =
  import.meta.env.MODE === 'appdevelopment' ||
  import.meta.env.MODE === 'development' ||
  import.meta.env.MODE === 'app_PRD';

export const env = {
  VERSION: import.meta.env.PACKAGE_VERSION,
  MODE: import.meta.env.MODE,
  IS_MOCK: isMock,
  IS_WEB: isWeb,
  IS_DESKTOP: isDesktop,
  IS_DEVELOPMENT: isDevelopment,
  TITLE: defineEnv('VITE_APP_TITLE', true),
  API_URI: defineEnv('VITE_API_URL', true)
};
