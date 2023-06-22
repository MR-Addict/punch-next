import z from "zod";

const Env = z.object({
  START_DATE: z.string().transform((value) => new Date(value)),
  END_DATE: z.string().transform((value) => new Date(value)),
  TIMEZONE: z
    .string()
    .default("8")
    .transform((value) => Number(value))
});

const env = Env.parse({
  START_DATE: process.env.NEXT_PUBLIC_START_DATE,
  END_DATE: process.env.NEXT_PUBLIC_END_DATE,
  TIMEZONE: process.env.NEXT_PUBLIC_TIMEZONE
});

export default env;
