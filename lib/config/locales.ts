import { useLocale as useReactAriaLocale } from "@react-aria/i18n";
import { LOCALE_REGEX } from "../constants";

export const LOCALES: readonly string[] = getLocales();
export const DEFAULT_LOCALE = LOCALES[0];

export function isLocale(locale: string | null | undefined): locale is string {
  return !!locale && LOCALES.includes(locale);
}

const localeUrlRegexes = LOCALES.map((l) => new RegExp(`^/${l}(/|$)`));

export function isLocaleUrl(url: string | null | undefined): boolean {
  return !!url && localeUrlRegexes.some((r) => r.test(url));
}

export function useLocale(): string {
  const { locale } = useReactAriaLocale();
  return isLocale(locale) ? locale : "en";
}

function getLocales(): readonly string[] {
  const localesFromEnv = (
    process.env.NEXT_PUBLIC_LOCALES ?? process.env.LOCALES
  )
    ?.split(",")
    .map((l) => l.trim())
    .filter((l) => LOCALE_REGEX.test(l));
  return localesFromEnv?.length ? localesFromEnv : ["en"];
}
