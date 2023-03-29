import { PageComponent, PageComponentType } from "@/lib/content/types";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/organisms/hero/Hero"));

interface DynamicProps {
  components: PageComponent[];
}
export default function Dynamic({ components }: DynamicProps) {
  return (
    <>
      {components.map((component, index) => {
        const key = `dynamic-${index}`;
        if (PageComponentType.hero in component) {
          return <Hero key={key} {...component.hero} />;
        }
        return null;
      })}
    </>
  );
}
