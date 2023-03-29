import { GetSlugs } from "@/lib/content/types";
import { getAll } from "./sdk";
import { NormalizedEntry, PageContentType, UrlFields } from "./types";

export const getSlugs: GetSlugs = async (pageContentType, locales) => {
  console.log("getSlugs");
  const results = await Promise.all(
    locales.map(async (locale) => {
      const entries: NormalizedEntry<UrlFields>[] = await getAll<UrlFields>(
        PageContentType[pageContentType],
        {
          locale,
        }
      );
      return [locale, entries.map((entry) => entry.url)] as const;
    })
  );
  return Object.fromEntries(results);
};
