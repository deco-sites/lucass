import { AppContext } from "../../apps/site.ts";
import { SectionProps } from "deco/types.ts";

export interface Props {
  text: string;
}

function TotalSaves({
  text,
  events,
}: SectionProps<typeof loader>) {
  return (
    <div class="w-full flex justify-center items-center my-2">
      <span class="p-2 border border-gray-500 rouded text-center">
        {text}: {events.total}
      </span>
    </div>
  );
}

export default TotalSaves;

export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  const events = await ctx.invoke.site.loaders.camp
    .getAllEvents();
  return { ...props, events };
};
