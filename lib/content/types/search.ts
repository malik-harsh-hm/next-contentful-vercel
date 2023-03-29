import { LocalizedGetter } from "./base";

export type SearchDocumentType = "page" | "article";

export interface SearchResult {
  /** Unique document id */
  objectID: string;
  /** Document title for searching & display. */
  title: string;
  /** Document description for searching & display. */
  description: string;
  /** Document type for faceting & display. */
  type: SearchDocumentType;
  /** Document URL for navigation. */
  url: string;
  /** Document is a category page. */
  isCategoryPage?: boolean;
  /** Document category for faceting & display. (Articles only.) */
  categoryName?: string;
  /** Document published date for display. (Articles only.) */
  publishedDate?: string;
  /** Document author for display. (Articles only.) */
  author?: Author;
  /** Document intro. (Articles only.) */
  intro?: string;
}
interface Author {
  name: string;
}
export interface IndexDocument extends SearchResult {
  /** A list of keywords for searching only. */
  keywords?: string[];
  /** Document content for searching only. */
  content?: string;
}

export interface GetPagesForIndexingOptions {
  publishedSince?: Date;
}

export type GetPagesForIndexing = LocalizedGetter<
  IndexDocument[],
  GetPagesForIndexingOptions
>;
