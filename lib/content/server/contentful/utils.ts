import { Entry } from "contentful";
import {
  EntryFields,
  NormalizedEntry,
  NormalizedFields,
  PageContentType,
  SearchQueryParams,
} from "./types";

export async function forLocales<T>(
  locales: readonly string[],
  fn: (locale: string) => Promise<T>
): Promise<Record<string, T>> {
  const results = await Promise.all(
    locales.map(async (locale) => {
      const result = await fn(locale);
      return [locale, result] as const;
    })
  );
  return Object.fromEntries(results);
}

export function normalizeEntry<T>(
  entry: Entry<EntryFields<T>>
): NormalizedEntry<T> | undefined {
  const { fields, sys } = entry;
  if (!fields) {
    return;
  }
  const components: NormalizedFields<T>[] | undefined =
    fields.components?.map(mapEntry);
  return {
    ...fields,
    sys,
    components,
    contentType: getComponentName(entry) as PageContentType,
  };
}

function mapEntry<T>(entry: Entry<EntryFields<T>>): NormalizedFields<T> {
  let internalReference;
  const reference = entry.fields?.internalReference;
  if (reference) {
    internalReference = mapEntry(reference);
  }
  return {
    ...entry.fields,
    componentName: getComponentName(entry),
    internalReference,
  };
}

function getComponentName<T>(component: {
  sys: Entry<EntryFields<T>>["sys"];
}): string {
  return component?.sys.contentType?.sys.id ?? "";
}

// export function getCategoryParams(key?: string | undefined): SearchQueryParams {
//   return key
//     ? {
//         "fields.category.sys.contentType.sys.id": ContentType.category,
//         "fields.category.fields.key[all]": key,
//       }
//     : {};
// }

export function getIndexingParams(publishedSince?: Date): SearchQueryParams {
  const publishQuery: SearchQueryParams = publishedSince
    ? { "sys.updatedAt[gte]": publishedSince.toISOString() }
    : {};
  return {
    ...publishQuery,
    // "fields.seo.sys.contentType.sys.id": ContentType.seo,
    // "fields.seo.fields.noIndex": false,
  };
}
