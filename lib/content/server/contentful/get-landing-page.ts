import {
  GetLandingPage,
  GetPagesForIndexing,
  LandingPageData,
} from "@/lib/content/types";
import { getIndexingBasicFields } from "../common";
import { mapComponents } from "./mappings/components";
import { getAll } from "./sdk";
import {
  ComponentItem,
  NormalizedEntry,
  PageContentType,
  SearchQueryParams,
} from "./types";
import { forLocales, getIndexingParams } from "./utils";

type LandingPageFields = {
  title: string;
  url: string;
  components: ComponentItem[];
};

const getLandingPages = async (
  queryParams: SearchQueryParams,
  locale: string
): Promise<LandingPageData[]> => {
  const entries: NormalizedEntry<LandingPageFields>[] =
    await getAll<LandingPageFields>(PageContentType.landingPage, {
      locale,
      ...queryParams,
    });

  return Promise.all(
    entries.map(async (entry) => {
      const {
        sys: { id },
        title,
        url,
        components: rawComponents,
      } = entry;

      const components = await mapComponents(rawComponents);
      return {
        id,
        title,
        locale,
        url,
        components,
      };
    })
  );
};

export const getLandingPage: GetLandingPage = async (slug, locale) => {
  const landingPage = (
    await getLandingPages({ "fields.url": slug }, locale)
  )[0];
  return landingPage;
};

export const getLandingPagesForIndexing: GetPagesForIndexing = async (
  locales,
  { publishedSince } = {}
) => {
  return forLocales(locales, async (locale) => {
    const landingPages = await getLandingPages(
      getIndexingParams(publishedSince),
      locale
    );
    return landingPages.map((landingPage) => {
      return { ...getIndexingBasicFields(landingPage), type: "page" };
    });
  });
};
