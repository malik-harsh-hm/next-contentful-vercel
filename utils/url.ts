import { isLocaleUrl, SITE_ORIGIN } from '@/lib/config'

export function addTrailingSlash(url: string) {
  return url.endsWith('/') ? url : `${url}/`
}

export function isRelativeUrl(url: string) {
  return url.startsWith('/') && !url.startsWith('//')
}

export function isHashUrl(url: string) {
  return url.startsWith('#')
}

export interface BuildSiteUrlArgs {
  absolute?: boolean
  origin?: string
  addTrailingSlash?: boolean
}

export function buildSiteUrl(
  path: string,
  locale?: string,
  { absolute = false, addTrailingSlash: trailingSlashRequired = false, origin = SITE_ORIGIN }: BuildSiteUrlArgs = {},
) {
  if (!isRelativeUrl(path)) {
    return path
  }
  let relativeUrl = !locale || isLocaleUrl(path) ? path : `/${locale}${path}`
  if (trailingSlashRequired) {
    relativeUrl = addTrailingSlash(relativeUrl)
  }
  return absolute ? `${origin ?? ''}${relativeUrl}` : relativeUrl
}

export const ABSOLUTE_WITH_TRAILING_SLASH: BuildSiteUrlArgs = {
  absolute: true,
  addTrailingSlash: false,
} as const

export const formatExternalUrl = (url: string | undefined): string => {
  return url ? (url.startsWith('//') ? `https:${url}` : url) : ''
}
