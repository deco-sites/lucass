export interface ICommentReturn {
  total: number;
  product: number;
}

interface Props {
  productId: string;
  comment: string;
}

const loader = async (
  props: Props,
  _req: Request,
): Promise<ICommentReturn> => {
  const optionsHeader = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "x-api-key": "decocamptak",
    },
    body: JSON.stringify({
      comment: props.comment,
      productId: props?.productId,
    }),
  };

  const response = await fetch(
    "https://camp-api.deco.cx/event",
    optionsHeader,
  );
  return await response.json();
};

export default loader;
