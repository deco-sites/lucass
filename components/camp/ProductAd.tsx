import Image from "apps/website/components/Image.tsx";
import Button from "../../components/ui/Button.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import ProductModalAddToWishlist from "../../islands/camp/ProductModalAddToWishlist.tsx";
import TriggerSaveProductButton from "../../islands/camp/TriggerSaveProductButton.tsx";
import { AppContext } from "../../apps/site.ts";
import { SectionProps } from "deco/types.ts";

export interface Props {
  vertical?: boolean;
  animateImage?: boolean;
  adDescription?: string;
  highlight?: boolean;
  product?: ProductDetailsPage | null;
}

export default function ProductAd(
  { product, vertical, animateImage, adDescription, highlight, comments }:
    SectionProps<
      typeof loader
    >,
) {
  if (!product) {
    return null;
  }

  const { price } = useOffer(product?.product?.offers);
  const images = product.product.isVariantOf?.image || product.product.image;
  const [front] = images ?? [];
  const isHighlight = highlight && comments.comments.length > 3;

  return (
    <section className="container">
      <div
        className={`card border rounded p-4 flex ${
          vertical ? "flex-col" : "lg:flex-row"
        } gap-10 my-6 relative`}
      >
        {front.url! && (
          <Image
            src={front.url! ?? ""}
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
          <div class="w-fit bg-green-500 p-2 absolute left-0 top-4">
            <span>Destaque</span>
          </div>
        )}

        <div className="flex flex-col gap-4 lg:gap-0 w-full justify-between items-center">
          <div className="flex justify-between w-full">
            <div className="flex flex-col w-full">
              <h2 className="card-title flex justify-center lg:justify-start">
                {product?.product.name}
              </h2>
              <p className="flex justify-center lg:justify-start">
                {product?.product.description}
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
      {product?.product.sku && product?.product.name &&
        product?.product.description && front.url && (
        <ProductModalAddToWishlist
          sku={product?.product.sku}
          title={product?.product.name}
          description={product?.product.description}
          imgSrc={front.url!}
        />
      )}
    </section>
  );
}

export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  const productId = props.product?.product.sku ?? "0";
  const comments = await ctx.invoke.site.loaders.camp
    .getComment({ productId });
  return { ...props, comments };
};
