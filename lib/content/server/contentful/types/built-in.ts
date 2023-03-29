import { Entry } from "contentful";
import { PageContentTypes } from "./content-types";

export type SearchParam = {
  locale: string;
  "sys.id"?: string;
  select?: string;
  // for reverse order, prefix the attribute with '-': '-sys.createdAt
  // to order with multiple attributes, use commas: 'sys.createdAt, sys.id'
  order?: string;
  skip?: number;
  limit?: number;
  mimetype_group?: string;
  content_type?: PageContentTypes;
  // custom search params
  "fields.url"?: string;
  "fields.category[match]"?: string;
  "fields.category.sys.contentType.sys.id"?: string;
  "fields.category.fields.key[all]"?: string;
  "fields.category.fields.key[in]"?: string;
  "sys.updatedAt[gte]"?: string;
  "fields.seo.sys.contentType.sys.id"?: string;
  "fields.seo.fields.noIndex"?: boolean;
};

// https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters
export type SearchQueryParams = Partial<SearchParam>;

export interface UrlFields {
  url: string;
}

export type EntryFields<T> = T & {
  components?: Entry<EntryFields<T>>[];
  internalReference?: Entry<EntryFields<T>>;
};

export type NormalizedEntry<T> = T & {
  sys: Entry<T>["sys"];
  components?: NormalizedFields<T>[];
  contentType: PageContentTypes;
};

export type NormalizedFields<T> = T & {
  componentName: string;
  internalReference?: NormalizedFields<T>;
};
