import { MatchContext } from "deco/blocks/matcher.ts";

export interface Props {
  campanhas: string[];
}

export default function Utm({ campanhas }: Props, ctx: MatchContext) {
  const url = new URL(ctx?.request?.url);
  const utmCampaign = url.searchParams.get("utm_campaign") ?? "";

  const matchesCampaign = (campaign: string, value: string) => {
    if (campaign.endsWith("_")) {
      const prefix = campaign.slice(0, -1);
      return value.startsWith(prefix);
    }

    return campaign === value;
  };

  return campanhas.some((campaign) => matchesCampaign(campaign, utmCampaign));
}
