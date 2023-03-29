import { IndexDocument, IndexingPageData } from "@/lib/content/types";
import { extractTextFromComponents } from "@/lib/search/utils";
import { buildSiteUrl } from "@/utils/url";

export function getIndexingBasicFields({
  title,
  url,
  locale,
  components,
}: IndexingPageData): IndexDocument {
  const content = extractTextFromComponents(components);

  return {
    objectID: url, // unique identifier
    url: buildSiteUrl(url, locale),
    title: title,
    description: content.split("\n")[0],
    content,
  } as IndexDocument;
}
