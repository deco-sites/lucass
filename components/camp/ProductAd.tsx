import Image from "apps/website/components/Image.tsx";
import Button from "../../components/ui/Button.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import ProductModalAddToWishlist from "../../islands/camp/ProductModalAddToWishlist.tsx";
import TriggerSaveProductButton from "../../islands/camp/TriggerSaveProductButton.tsx";
import { AppContext } from "../../apps/site.ts";
import { SectionProps } from "deco/types.ts";
import type { Product } from "apps/commerce/types.ts";

export interface Props {
  vertical?: boolean;
  animateImage?: boolean;
  adDescription?: string;
  highlight?: boolean;
  product?: ProductDetailsPage | null;
  relatedProduct?: Product[] | null;
}

export default function ProductAd(
  {
    product,
    relatedProduct,
    vertical,
    animateImage,
    adDescription,
    highlight,
    comments,
  }: SectionProps<typeof loader>,
) {
  const productInfo = relatedProduct && relatedProduct.length > 0
    ? relatedProduct[0]
    : product?.product;
  if (!productInfo) {
    return null;
  }

  const { price } = useOffer(productInfo.offers);
  const images = productInfo.isVariantOf?.image || productInfo.image;
  const [front] = images ?? [];
  const isHighlight = highlight && comments.comments.length > 3;

  return (
    <section className="container">
      <div
        className={`card border rounded p-4 flex ${
          vertical ? "flex-col" : "lg:flex-row"
        } gap-10 my-6 relative`}
      >
        {front?.url && (
          <Image
            src={front.url ?? ""}
            alt={front.alternateName}
            width={300}
            height={300}
            className={`h-full object-contain ${
              animateImage ? "hover:scale-110" : ""
            } ${vertical ? "w-full" : ""}`}
            style={{ transition: "all .3s ease" }}
          />
        )}

        {isHighlight && (
          <div className="w-fit bg-green-500 p-2 absolute left-0 top-4">
            <span>Destaque</span>
          </div>
        )}

        <div className="flex flex-col gap-4 lg:gap-0 w-full justify-between items-center">
          <div className="flex justify-between w-full">
            <div className="flex flex-col w-full">
              <h2 className="card-title flex justify-center lg:justify-start">
                {productInfo.name}
              </h2>
              <p className="flex justify-center lg:justify-start">
                {productInfo.description}
              </p>
            </div>
            <TriggerSaveProductButton />
          </div>

          <span className="flex w-full justify-center lg:justify-end">
            {price}
          </span>

          <div className="flex w-full flex-col lg:flex-row justify-end gap-4">
            <Button
              className={`btn lg:btn-lg flex items-center justify-center ${
                vertical ? "w-1/2" : ""
              }`}
              aria-label="go to product page"
            >
              Mais detalhes
            </Button>
            <Button
              className={`btn lg:btn-lg flex items-center justify-center ${
                vertical ? "w-1/2" : ""
              }`}
              aria-label="buy product"
            >
              {adDescription ?? "Comprar"}
            </Button>
          </div>
        </div>
      </div>
      {productInfo.sku && productInfo.name && productInfo.description &&
        front?.url && (
        <ProductModalAddToWishlist
          sku={productInfo.sku}
          title={productInfo.name}
          description={productInfo.description}
          imgSrc={front.url}
        />
      )}
    </section>
  );
}

export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  const productId = props.relatedProduct?.[0]?.sku ||
    props.product?.product.sku || "0";
  const comments = await ctx.invoke.site.loaders.camp
    .getComment({ productId });
  return { ...props, comments };
};
