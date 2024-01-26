import z from "zod";

const NodeEnv = z.enum(["development", "production", "test", "preview"]);

const PublicEnv = z.object({
  CURRENT_TERM: z.string(),
  START_DATE: z.string().transform((value) => new Date(value)),
  END_DATE: z.string().transform((value) => new Date(value)),
  FIRST_WEEK: z.string().transform((value) => new Date(value))
});

const ServerEnv = z.object({
  NODE_ENV: NodeEnv,
  MONGODB_URI: z.string()
});

const Env = ServerEnv.merge(PublicEnv);

type PublicEnvType = z.TypeOf<typeof PublicEnv>;
type ServerEnvType = z.TypeOf<typeof ServerEnv>;
type EnvType = z.TypeOf<typeof Env>;

export { Env, PublicEnv, ServerEnv };
export type { EnvType, PublicEnvType, ServerEnvType };
