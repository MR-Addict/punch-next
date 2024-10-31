import { z } from "zod";

export type ApiResultType<T = undefined> =
  | ({
      readonly success: true;
    } & (T extends undefined ? {} : { readonly data: NonNullable<T> }))
  | {
      readonly success: false;
      readonly message: string;
      readonly code: number;
    };

export const Pagination = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number()
});

export type PaginationType = z.infer<typeof Pagination>;
