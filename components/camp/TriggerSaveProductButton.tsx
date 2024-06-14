import Button from "../../components/ui/Button.tsx";
import { useUI } from "../../sdk/useUI.ts";

export default function TriggerSaveProductButton() {
  const { displayModalShelfProduct } = useUI();
  function handleModalOpen() {
    displayModalShelfProduct.value = displayModalShelfProduct.value
      ? false
      : true;
  }

  return (
    <Button
      className="btn-circle btn-md p-4 border flex items-center justify-center absolute top-4 right-4 bg-white"
      aria-label="save product"
      onClick={() => handleModalOpen()}
    >
      Save
    </Button>
  );
}
