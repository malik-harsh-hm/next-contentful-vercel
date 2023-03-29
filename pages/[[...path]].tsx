import { getLandingPage } from "../lib/content/server/contentful/get-landing-page";
import { getSlugs } from "../lib/content/server/contentful/get-slugs";
import { LOCALES } from "@/lib/config";
import { parseJSON } from "@/utils/next";
import Dynamic from "../components/utils/composites/Dynamic";
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import { LandingPageData } from "@/lib/content/types";

interface LandingPageParams extends ParsedUrlQuery {
  path: string[];
}

export type LandingPageProps = LandingPageData;

export const getStaticPaths: GetStaticPaths<LandingPageParams> = async () => {
  const slugs = await getSlugs("landingPage", LOCALES);

  const paths = Object.entries(slugs).flatMap(([locale, slugs]) =>
    slugs.map((slug) => ({
      locale,
      params: { path: slug.replace(/^\//, "").split("/") },
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  LandingPageProps,
  LandingPageParams
> = async (context) => {
  const { params, locale } = context;

  const slug: string = params?.path?.join("/") ?? "";

  const data = await getLandingPage(slug, locale);
  return {
    props: parseJSON(data),
  };
};

export default function LandingPage(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { components } = data;
  return (
    <>
      <Dynamic components={components} />
    </>
  );
}
