import {
  HeroProps,
  PageComponent,
  PageComponentType,
} from "@/lib/content/types";
import { isDefined } from "@/utils/guards";
import { ComponentItem, HeroFields } from "../types";
import { mapImage } from "./general";

export async function mapComponents(
  components: ComponentItem[] | undefined
): Promise<PageComponent[]> {
  const results = await Promise.all(
    components?.map(async (component) => {
      switch (component.componentName) {
        case PageComponentType.hero: {
          return { [PageComponentType.hero]: mapHero(component as HeroFields) };
        }
        default: {
          console.warn(
            "Unexpected Component name in mapping",
            component.componentName
          );
        }
      }
    }) ?? []
  );

  return results.filter(isDefined);
}

function mapHero({ label, title, body, image }: HeroFields): HeroProps {
  return {
    label,
    title,
    body,
    image: mapImage(image),
  };
}
