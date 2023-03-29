import { PageComponent, Author, Category } from "./page-component";
import { ImageData } from "./base";

export interface PageUrlData {
  locale: string;
  url: string;
}

export interface PageData extends PageUrlData {
  title: string;
}
export interface LandingPageData extends PageData {
  components: PageComponent[];
}

export interface GetLandingPage {
  (slug: string, locale: string): Promise<LandingPageData | undefined>;
}

export interface ArticlePageData extends Partial<LandingPageData> {
  author: Author;
  category: Category;
  intro: string;
  image: ImageData;
  publishedDate: string;
}

export interface GetArticlePage {
  (slug: string, locale: string): Promise<ArticlePageData | undefined>;
}

export type IndexingPageData = LandingPageData | ArticlePageData;

export interface PageCountResult {
  pageCount: number;
  totalCount: number;
}
export interface GetSlugs {
  (pageContentType: PageContentType, locales: readonly string[]): Promise<
    Record<string, string[]>
  >;
}
export type PageContentType = "landingPage" | "article";
