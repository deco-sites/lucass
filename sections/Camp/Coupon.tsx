/**
 * @titleBy code
 */
export interface Coupon {
  /**
   * @format html
   */
  description: string;
  code: string;
}

export interface Props {
  coupons?: Coupon[];
}

const DEFAULT_COUPONS = [
  {
    "code": "Codigo123",
    "description": "<p>10% de desconto!</p>",
  },
  {
    "code": "Codigo1234",
    "description": "<p>12% de desconto!</p>",
  },
  {
    "code": "Codigo1235",
    "description": "<p>15% de desconto!</p>",
  },
];

export default function Coupon(
  { coupons = DEFAULT_COUPONS }: Props,
) {
  return (
    <section class="relative bg-white text-black py-20 max-w-screen">
      <ul class="flex flex-row gap-4 justify-center items-center">
        {coupons?.map((element, index) => (
          <li key={index}>
            <span>{element.code}</span>
            <div
              dangerouslySetInnerHTML={{ __html: element.description }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
