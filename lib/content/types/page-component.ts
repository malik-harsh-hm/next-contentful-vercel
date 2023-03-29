import { ImageData } from "@/lib/content/types";

export enum PageComponentType {
  hero = "hero",
}

export type PageComponentTypes = keyof typeof PageComponentType;

export type PageComponent = { [PageComponentType.hero]: HeroProps };

export interface HeroProps {
  label: string;
  title: string;
  body: string;
  image: ImageData;
}

export interface Author {
  name: string;
}

export interface Category {
  title: string;
  key: string;
}
