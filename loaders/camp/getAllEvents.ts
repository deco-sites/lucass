export interface IAllEventsReturn {
  total: number;
}

const loader = async (
  _req: Request,
): Promise<IAllEventsReturn> => {
  const optionsHeader = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "x-api-key": "decocamptak",
    },
  };

  const response = await fetch(
    `https://camp-api.deco.cx/events`,
    optionsHeader,
  );
  return await response.json();
};

export default loader;
