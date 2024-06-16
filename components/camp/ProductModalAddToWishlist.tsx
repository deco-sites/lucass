import { useSignal } from "@preact/signals";
import { invoke } from "../../runtime.ts";
import type { JSX } from "preact";
import { useUI } from "../../sdk/useUI.ts";
import Image from "apps/website/components/Image.tsx";
import Button from "../../components/ui/Button.tsx";
import Modal from "../../components/ui/Modal.tsx";
import { sendEventCustom } from "../../sdk/analytics.tsx";
import Toastify from "toastify";

export interface Props {
  sku: string;
  imgSrc: string;
  title: string;
  description: string;
}

export default function ProductModalAddToWishlist(
  { imgSrc, title, description, sku }: Props,
) {
  const { displayModalShelfProduct } = useUI();
  const comment = useSignal("");
  const loading = useSignal(false);

  async function handlePostCommentProduct(comment: string, productId: string) {
    try {
      loading.value = true;
      await invoke.site.actions.camp.setCommet({
        comment,
        productId,
      });

      Toastify({
        text: "Sucesso!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();

      sendEventCustom({
        name: "post_score",
        params: {
          score: 1,
          character: productId,
        },
      });

      setTimeout(() => {
        displayModalShelfProduct.value = false;
      }, 3000);
    } finally {
      loading.value = false;
    }
  }

  function handleModalOpen() {
    displayModalShelfProduct.value = displayModalShelfProduct.value
      ? false
      : true;
  }

  return (
    <Modal
      open={displayModalShelfProduct.value}
      onClose={() => displayModalShelfProduct.value = false}
    >
      <div
        class="flex flex-row lg:flex-col p-4 gap-4 bg-white"
        style={{ zIndex: 2 }}
      >
        <Image
          src={imgSrc ?? ""}
          width={300}
          height={300}
        />

        <div class="flex flex-col gap-2 justify-between">
          <h2>
            {title}
          </h2>

          <p class="max-w-80 max-h-96 overflow-y-auto">{description}</p>

          <textarea
            value={comment.value}
            class="border border-gray-400"
            name="comment"
            onChange={(e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) => {
              const target = e.target as HTMLTextAreaElement;
              comment.value = target?.value;
            }}
          >
          </textarea>

          <div class="flex flex-row gap-4 justify-end items-center">
            <Button
              className="btn lg:btn-lg flex items-center justify-center w-fit"
              aria-label="Cancelar"
              onClick={() => handleModalOpen()}
            >
              Cancelar
            </Button>
            <Button
              className="btn lg:btn-lg flex items-center justify-center w-fit disabled:loading"
              aria-label="publicar"
              disabled={loading}
              onClick={() => handlePostCommentProduct(comment.value, sku)}
            >
              Publicar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
