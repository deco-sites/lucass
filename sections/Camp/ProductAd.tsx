export { default, loader } from "../../components/camp/ProductAd.tsx";

export function ErrorFallback() {
  return (
    <div class="container px-1 my-2">
      <p class="text-red-700 bold">
        Ocorreu um erro! Tente novamente mais tarde!
      </p>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div class="container px-2">
      <div class="flex w-fit flex-col sm:flex-row gap-2 p-2 rounded my-2 min-h-[375px] max-h-[375px]">
        <div class="skeleton block min-w-[300px] w-[300px] h-[300px]" />
        <div class="flex flex-col gap-2 items-start w-full mt-2">
          <div class="skeleton h-2 w-44"></div>
          <div class="skeleton h-2 w-full"></div>
          <div class="skeleton h-2 w-full"></div>
        </div>
      </div>
    </div>
  );
}
