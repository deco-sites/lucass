import { Temperature } from "apps/weather/loaders/temperature.ts";

// Editable props
export interface Props {
  /**
   * @title Temperatura
   */
  temperature?: Temperature | null;
  /** @format textarea */
  text?: string;
}

export default function Lugar({
  temperature,
  text,
}: Props) {
  return (
    <section>
      <span class="my-2">
        A temperatura atual de Friburgo é: {temperature?.celsius}
      </span>
      <p class="my-2">{text}</p>
    </section>
  );
}
