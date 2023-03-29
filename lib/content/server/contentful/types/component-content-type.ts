import { PageComponentTypes } from "@/lib/content/types";
import { Asset, Entry } from "contentful";
import { JsonRteFields, JsonRteText } from "./content-types";
import { ImageData } from "@/lib/content/types";
export type Reference<T> = Entry<T>;

export interface RichTextFields {
  content: JsonRteFields | JsonRteText;
}

export interface HeroFields {
  label: string;
  title: string;
  body: string;
  image: Asset;
}

export interface CategoryFields {
  key: string;
  title: string;
}

export interface ArticleFields {
  title: string;
  url: string;
  publishedDate: string;
  author: string;
  intro: string;
  category?: Reference<CategoryFields>;
  image: ImageData;
}

type ComponentFields = HeroFields;

export type ComponentItem = {
  componentName: PageComponentTypes;
} & ComponentFields;
