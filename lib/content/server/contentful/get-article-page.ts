import {
  ArticlePageData,
  GetArticlePage,
  GetPagesForIndexing,
  SearchResult,
} from "@/lib/content/types";
import { getIndexingBasicFields } from "../common";
import { getAll } from "./sdk";
import { ArticleFields, PageContentType, SearchQueryParams } from "./types";
import { forLocales, getIndexingParams } from "./utils";

const getArticlePages = async (
  queryParams: SearchQueryParams,
  locale: string
): Promise<ArticlePageData[]> => {
  const articleFields = await getAll<ArticleFields>(
    PageContentType.article,
    queryParams
  );

  return Promise.all(
    articleFields.map(async (entry) => {
      const {
        sys: { id },
        title,
        url,
        publishedDate,
        author,
        intro,
        category,
        image,
      } = entry;

      return {
        id,
        title,
        locale,
        url,
        category: {
          title: category.fields.title,
          key: category.fields.key,
        },
        publishedDate,
        author: { name: author },
        intro,
        image,
      };
    })
  );
};

export const getArticlePage: GetArticlePage = async (slug, locale) => {
  const articlePage = (
    await getArticlePages({ "fields.url": slug }, locale)
  )[0];
  return articlePage;
};

export const getArticlePagesForIndexing: GetPagesForIndexing = async (
  locales,
  { publishedSince } = {}
) => {
  return forLocales(locales, async (locale) => {
    const articlePages = await getArticlePages(
      getIndexingParams(publishedSince),
      locale
    );

    return articlePages.map((articlePage) => {
      const { intro, category, publishedDate, author } = articlePage;
      return {
        ...getIndexingBasicFields(articlePage),
        type: "article",
        categoryName: category?.title,
        publishedDate,
        author,
        intro,
      } as SearchResult;
    });
  });
};
