import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
// import ProductAd from "../../components/camp/ProductAd.tsx";
import Button from "../../components/ui/Button.tsx";
import Image from "apps/website/components/Image.tsx";
import type { Section } from "deco/blocks/section.ts";
import { renderSection } from "apps/website/pages/Page.tsx";

export interface Props {
  productsAds: Section[];
  /**
   * @hide
   * @readonly
   */
  indexActive?: number;
  message: string;
  imgSrc: ImageWidget;
  buttonTitle: string;
}

export default function PartialProductAd({
  productsAds,
  indexActive,
  message,
  buttonTitle,
  imgSrc,
}: Props) {
  const indexToRender = typeof indexActive === "number"
    ? Math.min(Math.max(indexActive, 0), productsAds.length - 1)
    : 0;

  return (
    <div class="container flex flex-col lg:flex-row gap-6 group">
      {renderSection(productsAds[indexToRender])}
      <div class="my-6 px-4 flex flex-col gap-4">
        <Image
          src={imgSrc}
          width={200}
          height={200}
          className="transition-all duration-1000 group-hover:animate-teste"
        />
        <h2 class="font-bold">{message}</h2>
        <Button
          class="btn"
          {...usePartialSection({ props: { indexActive: indexToRender + 1 } })}
        >
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
}
