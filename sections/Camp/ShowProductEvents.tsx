import type { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { invoke } from "../../runtime.ts";

export interface Props {
  text: string;
}

interface Comment {
  id: string;
  content: string;
}

export default function ShowProductEvents() {
  const productId = useSignal("");
  const totalVotesProduct = useSignal(0);
  const productComments = useSignal<Comment[]>([]);
  let debounceTimeout: number | undefined;

  function handleProductChange(value: string) {
    productId.value = value;

    if (debounceTimeout !== undefined) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = globalThis.window.setTimeout(async () => {
      await getProductMains(productId.value);
    }, 500);
  }

  async function getProductMains(productId: string) {
    const res = await invoke.site.loaders.camp.getComment({
      productId,
    });

    totalVotesProduct.value = res.product;

    const filteredComments = res?.comments?.filter((comment: string) =>
      comment.length > 5
    );
    productComments.value = filteredComments?.map((
      content: string,
      index: number,
    ) => ({ id: `${index}`, content }));
  }

  return (
    <div class="w-full my-0-2 flex justify-center items-center flex-col">
      <div class="flex items-center justify-center gap-3">
        <span>Product:</span>
        <input
          name="productId"
          type="text"
          onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
            const target = e.target as HTMLInputElement;
            handleProductChange(target?.value);
          }}
        />
      </div>
      <div>
        <span>Comments:</span>
        <ul class="p-0 my-1">
          {productComments?.value?.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      </div>
      <span>Total Votes: {totalVotesProduct}</span>
    </div>
  );
}
