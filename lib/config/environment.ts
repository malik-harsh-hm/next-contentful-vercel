export const CMS_BRANCH = process.env.NEXT_PUBLIC_CMS_BRANCH ?? process.env.CMS_BRANCH
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? process.env.SITE_ORIGIN ?? 'http://localhost:3000'
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || ''
export const ALGOLIA_API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || ''
export const CMS_ENVIRONMENT = process.env.CMS_ENVIRONMENT || 'production'