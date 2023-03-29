import { RichTextMark } from "@/lib/content/types/rich-text";
import { Asset, Entry } from "contentful";
import { EntryFields } from "./built-in";

export enum PageContentType {
  landingPage = "landingPage",
  article = "article",
  notFoundPage = "notFoundPage",
}
// export enum ContentType {
//   category = 'category',
//   seo = 'seo',
// }
export type PageContentTypes = keyof typeof PageContentType;

export const contentTypeMappings = Object.fromEntries(
  Object.entries({ ...PageContentType }).map(([key, value]) => [value, key])
);

export enum NodeType {
  document = "document",
  paragraph = "paragraph",
  text = "text",
  unorderedList = "unordered-list",
  orderedList = "ordered-list",
  listItem = "list-item",
  tableHeaderCell = "table-header-cell",
  tableRow = "table-row",
  tableCell = "table-cell",
  table = "table",
  hyperlink = "hyperlink",
  heading1 = "heading-1",
  heading2 = "heading-2",
  heading3 = "heading-3",
  heading4 = "heading-4",
  heading5 = "heading-5",
  heading6 = "heading-6",
  code = "code",
  hr = "hr",
  assetHyperlink = "asset-hyperlink",
  blockquote = "blockquote",
  entryHyperlink = "entry-hyperlink",
}

export type NodeTypes = keyof typeof NodeType;
export type RichTextEntryFields = { url: string };

export interface JsonRte {
  nodeType: NodeType;
  data: JsonRteData;
}

export interface JsonRteFields extends JsonRte {
  content: (JsonRteText | JsonRteFields)[];
}

export interface JsonRteText extends JsonRte {
  value: string;
  marks: JsonRteMark[];
}

interface JsonRteData {
  target?: Entry<EntryFields<RichTextEntryFields>> | Asset;
  uri?: string;
}

export type JsonRteMark = {
  type: RichTextMark;
};
