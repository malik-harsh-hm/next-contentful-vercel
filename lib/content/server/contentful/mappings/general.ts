import { ImageData } from "@/lib/content/types/base";
import { formatExternalUrl } from "@/utils/url";

//------------------------------------------------CMS Specific------------------------------------------------
export interface Asset {
  sys: Sys;
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
  metadata: Metadata;
  toPlainObject(): object;
}
interface Metadata {
  tags: TagLink[];
}
interface TagLink {
  sys: {
    type: "Link";
    linkType: "Tag";
    id: string;
  };
}
export interface Sys {
  type: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  revision?: number;
  space?: {
    sys: SpaceLink;
  };
  environment?: {
    sys: EnvironmentLink;
  };
  contentType: {
    sys: ContentTypeLink;
  };
}
export type LinkType = "Space" | "ContentType" | "Environment";
export interface Link<T extends LinkType> {
  type: "Link";
  linkType: T;
  id: string;
}
export type SpaceLink = Link<"Space">;
export type EnvironmentLink = Link<"Environment">;
export type ContentTypeLink = Link<"ContentType">;

//------------------------------------------------CMS Specific------------------------------------------------

export function mapImage(asset: Asset): ImageData;
export function mapImage(asset: Asset | undefined): ImageData | undefined;
export function mapImage(asset: null | undefined): undefined;
export function mapImage(
  asset: Asset | undefined | null
): ImageData | undefined {
  if (!asset) return;

  const {
    file: {
      contentType,
      url,
      details: { image },
    },
    description,
    title,
  } = asset.fields;

  return {
    url: formatExternalUrl(url),
    alt: description || title,
    contentType,
    width: image?.width,
    height: image?.height,
  };
}
