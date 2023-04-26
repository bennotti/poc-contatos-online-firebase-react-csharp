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
  API_URL: defineEnv('VITE_API_URL', true),
  FIREBASE: {
    API_KEY: defineEnv('VITE_FIREBASE_APIKEY', true),
    AUTH_DOMAIN: defineEnv('VITE_FIREBASE_AUTHDOMAIN', true),
    DATABASE_URL: defineEnv('VITE_FIREBASE_DATABASEURL', true),
    PROJECT_ID: defineEnv('VITE_FIREBASE_PROJECTID', true),
    STORAGE_BUCKET: defineEnv('VITE_FIREBASE_STORAGEBUCKET', true),
    MESSAGING_SENDER_ID: defineEnv('VITE_FIREBASE_MESSAGINGSENDERID', true),
    APP_ID: defineEnv('VITE_FIREBASE_APPID', true),
    MEASUREMENT_ID: defineEnv('VITE_FIREBASE_MEASUREMENTID', true),
  }
};
