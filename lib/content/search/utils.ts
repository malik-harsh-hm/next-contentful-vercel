import { PageComponent, PageComponentType } from "@/lib/content/types";
import { isTruthy } from "@/utils/guards";

export function extractTextFromComponents(components: PageComponent[]): string {
  return components
    .map((component) => {
      if (PageComponentType.hero in component) {
        const { title, body } = component[PageComponentType.hero];
        return [title, body];
      }
      return [];
    })
    .flat()
    .filter(isTruthy)
    .join("\n");
}
