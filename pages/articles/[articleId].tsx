import { LOCALES } from "@/lib/config";
import { getArticlePage } from "@/lib/content/server/contentful/get-article-page";
import { getSlugs } from "@/lib/content/server/contentful/get-slugs";
import { ArticlePageData } from "@/lib/content/types";
import { parseJSON } from "@/utils/next";
import type { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

interface ArticlePageParams extends ParsedUrlQuery {
  articleId: string;
}

export type ArticlePageProps = ArticlePageData;

export const getStaticPaths: GetStaticPaths<ArticlePageParams> = async () => {
  const slugs = await getSlugs("article", LOCALES);

  const paths = Object.entries(slugs).flatMap(([locale, slugs]) => {
    return slugs.map((slug) => ({
      locale,
      params: { articleId: slug },
    }));
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  ArticlePageProps,
  ArticlePageParams
> = async (context) => {
  const { params, locale } = context;

  const slug: string = params?.articleId;

  const data = await getArticlePage(slug, locale);

  return {
    props: parseJSON(data),
  };
};

export default function ArticleDetailsPage(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  console.log("Article Details Page - ", data);
}
