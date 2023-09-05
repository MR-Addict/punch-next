import z from "zod";

const Env = z.object({
  CURRENT_TERM: z.string(),
  START_DATE: z.string().transform((value) => new Date(value)),
  END_DATE: z.string().transform((value) => new Date(value)),
  FIRST_WEEK: z.string().transform((value) => new Date(value)),
  TIMEZONE: z
    .string()
    .default("8")
    .transform((value) => Number(value))
});

const env = Env.parse({
  START_DATE: process.env.NEXT_PUBLIC_START_DATE,
  END_DATE: process.env.NEXT_PUBLIC_END_DATE,
  FIRST_WEEK: process.env.NEXT_PUBLIC_FIRST_WEEK,
  TIMEZONE: process.env.NEXT_PUBLIC_TIMEZONE,
  CURRENT_TERM: process.env.NEXT_PUBLIC_CURRENT_TERM
});

export default env;
