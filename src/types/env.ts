import z from "zod";

export const PublicEnv = z.object({
  CURRENT_TERM: z.string(),
  START_DATE: z.string().transform((value) => new Date(value)),
  END_DATE: z.string().transform((value) => new Date(value)),
  FIRST_WEEK: z.string().transform((value) => new Date(value))
});
export type PublicEnvType = z.TypeOf<typeof PublicEnv>;

export const ServerEnv = z.object({ MONGODB_URI: z.string() });
export type ServerEnvType = z.TypeOf<typeof ServerEnv>;

export const Env = ServerEnv.merge(PublicEnv);
export type EnvType = z.TypeOf<typeof Env>;
