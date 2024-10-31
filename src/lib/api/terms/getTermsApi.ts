import { z } from "zod";

export default async function getTermsApi() {
  const res = await fetch("/api/terms").then((res) => res.json());
  const parsed = z.array(z.string()).safeParse(res);
  if (!parsed.success) return null;
  return parsed.data;
}
