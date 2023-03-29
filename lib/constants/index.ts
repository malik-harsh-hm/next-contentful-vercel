// simplified regex from https://www.unicode.org/reports/tr35/#unicode_language_id exclude variant
export const LOCALE_REGEX = /^[A-Za-z]{2,4}([_-]([A-Za-z]{2,4}|[0-9]{3}))*$/;
