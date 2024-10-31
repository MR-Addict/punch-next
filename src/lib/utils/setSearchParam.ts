import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function setSearchParam(
  router: AppRouterInstance,
  params: Record<string, string | number | boolean>,
  options = { scroll: false }
) {
  const newUrl = new URL(window.location.toString());
  for (const [key, value] of Object.entries(params)) {
    if (value !== "") newUrl.searchParams.set(key, value.toString());
    else newUrl.searchParams.delete(key);
  }
  router.push(newUrl.toString(), { scroll: options.scroll });
}
