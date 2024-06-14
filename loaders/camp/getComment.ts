export interface ICommentReturn {
  product: number;
  comments: string[];
}

interface Props {
  productId: string;
}

const loader = async (
  props: Props,
  _req: Request,
): Promise<ICommentReturn> => {
  const optionsHeader = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "x-api-key": "decocamptak",
    },
  };

  const response = await fetch(
    `https://camp-api.deco.cx/event/${props.productId}`,
    optionsHeader,
  );
  return await response.json();
};

export default loader;
