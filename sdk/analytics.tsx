import type { AnalyticsEvent, IEvent } from "apps/commerce/types.ts";

interface ScoreParams {
  score: number;
  level?: number;
  character?: string;
}

interface ScoreEvent extends IEvent<ScoreParams> {
  name: "post_score";
}

export const sendEvent = <E extends AnalyticsEvent>(event: E) => {
  console.log(JSON.stringify(event, null, 2));
  globalThis.window.DECO.events.dispatch(event);
};

export const sendEventCustom = <E extends AnalyticsEvent | ScoreEvent>(
  event: E,
) => {
  globalThis.window.DECO.events.dispatch(event);
};
