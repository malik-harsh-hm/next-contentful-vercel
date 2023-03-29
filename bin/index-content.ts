import { isLocale, LOCALES } from "@/lib/config/locales";
import { getArticlePagesForIndexing } from "@/lib/content/server/contentful/get-article-page";
import algoliasearch, { SearchIndex } from "algoliasearch";
import minimist from "minimist";
import camelize from "@/utils/camelize";

interface IndexContentOptions {
  publishedSince?: Date;
  locales?: readonly string[];
}

interface Args {
  publishedSince?: string;
  locales?: string;
}

function getEnv(key: string) {
  const value = process.env[key];
  if (!value) {
    abort(`Missing environment variable ${key}`);
  }
  return value;
}

function abort(error: string): never {
  console.warn(`ERROR: ${error}`);
  process.exit(1);
}

const args = camelize(
  minimist<Args>(process.argv.slice(2), {
    string: ["publishedSince", "locales"],
    alias: {
      "published-since": "publishedSince",
      published: "publishedSince",
      from: "publishedSince",
      locale: "locales",
    },
  }) as Args
);

const publishedSince = args.publishedSince
  ? new Date(args.publishedSince)
  : undefined;
if (publishedSince && isNaN(publishedSince.valueOf())) {
  abort("Invalid from date");
}

let locales = args.locales
  ?.split(",")
  .map((locale) => locale.trim())
  .filter(isLocale);
if (!locales?.length) {
  locales = undefined;
}

async function indexContent({ publishedSince, locales }: IndexContentOptions) {
  console.log(
    publishedSince
      ? `Indexing content updated since ${publishedSince.toISOString()}`
      : "Indexing all content",
    locales ? `in ${locales.join(", ")}` : ""
  );

  const appId = getEnv("ALGOLIA_APP_ID");
  const apiKey = getEnv("ALGOLIA_API_KEY");
  const indexPrefix = getEnv("CONTENTFUL_ENVIRONMENT");

  const client = algoliasearch(appId, apiKey);

  const articles = await getArticlePagesForIndexing(LOCALES, {
    publishedSince,
  });

  // If we have no from date, we're indexing everything
  const operation: keyof SearchIndex = !publishedSince
    ? "replaceAllObjects"
    : "saveObjects";

  for (const locale of locales) {
    const indexName = `${indexPrefix}_${locale}`;
    const index = client.initIndex(indexName);
    const objects = [...articles[locale]];

    console.log("Indexing", objects.length, "object(s) for locale", locale);

    if (objects.length || operation === "replaceAllObjects") {
      await index[operation](objects);
    }

    objects.forEach(({ objectID, title }) =>
      console.log("\tIndexed", objectID, title)
    );
  }
}

void indexContent({ publishedSince, locales });
