const LOCALE_REGEX = /^[A-Za-z]{2,4}([_-]([A-Za-z]{2,4}|[0-9]{3}))*$/;

function getLocales() {
  const localesFromEnv = (
    process.env.NEXT_PUBLIC_LOCALES ?? process.env.LOCALES
  )
    ?.split(",")
    .map((l) => l.trim())
    .filter((l) => LOCALE_REGEX.test(l));
  return localesFromEnv?.length ? localesFromEnv : ["en"];
}

const locales = getLocales();

module.exports = {
  images: {
    domains: ["images.ctfassets.net"],
  },
  experimental: {
    newNextLinkBehavior: false,
  },
  i18n: {
    locales,
    defaultLocale: locales[0],
  },
};
