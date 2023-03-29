import { PageCountResult } from "@/lib/content/types";
import { isDefined } from "@/utils/guards";
import { createClient, Entry } from "contentful";
import {
  EntryFields,
  NormalizedEntry,
  SearchParam,
  SearchQueryParams,
} from "./types";
import { normalizeEntry } from "./utils";

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? "development",
  accessToken: process.env.CONTENTFUL_ACCESS_KEY ?? "",
});

interface GetPageOptions {
  pageNumber?: number;
  pageSize?: number;
}

export async function getAll<T>(
  contentType: string,
  queryParams: SearchQueryParams
): Promise<NormalizedEntry<T>[]> {
  console.log("getAll");
  const results: Entry<EntryFields<T>>[] = [];
  let modifiedQueryParams = { ...queryParams };
  while (true) {
    if (results.length) {
      modifiedQueryParams = {
        ...modifiedQueryParams,
        skip: results.length,
      };
    }

    const response = await getQueryResults(contentType, modifiedQueryParams);
    const entries: Entry<EntryFields<T>>[] = response.items as Entry<
      EntryFields<T>
    >[];
    results.push(...entries);
    if (results.length >= response.total) {
      break;
    }
  }
  return results.map(normalizeEntry).filter(isDefined);
}

export async function getPageCount(
  contentType: string,
  queryParams: SearchQueryParams,
  { pageSize = 10 }: GetPageOptions = {}
): Promise<PageCountResult> {
  const totalCount = (await getQueryResults(contentType, queryParams)).total;

  return { pageCount: Math.ceil(totalCount / pageSize), totalCount };
}

export async function getPage<T>(
  contentType: string,
  queryParams: SearchQueryParams,
  { pageNumber = 1, pageSize = 10 }: GetPageOptions = {}
): Promise<NormalizedEntry<T>[] | undefined> {
  try {
    const entries = (
      await getQueryResults(contentType, {
        ...queryParams,
        limit: pageSize,
        skip: (pageNumber - 1) * pageSize,
      })
    ).items as Entry<EntryFields<T>>[];
    return entries.map(normalizeEntry).filter(isDefined);
  } catch (err) {
    console.error(err);
    return;
  }
}

export async function getEntry<T>(
  contentType: string,
  queryParams?: SearchParam
): Promise<NormalizedEntry<T> | undefined> {
  try {
    const entry = (await getQueryResults(contentType, queryParams))
      .items[0] as Entry<EntryFields<T>>;
    return normalizeEntry(entry);
  } catch (err) {
    console.error(err);
    return;
  }
}

function getQueryResults(contentType: string, queryParams?: SearchQueryParams) {
  console.log("getQueryResults");
  console.log("contentType ", contentType);
  console.log("queryParams ", JSON.stringify(queryParams));
  return contentfulClient.getEntries({
    // eslint-disable-next-line camelcase
    content_type: contentType,
    include: 5, // resolve link entries until 5 depth levels by default
    ...queryParams,
  });
}
