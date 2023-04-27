import z from "zod";

const NodeEnv = z.enum(["development", "production", "test", "preview"]);

const Env = z.object({
  MONGODB_URI: z.string(),
  NODE_ENV: NodeEnv,
});

type EnvType = z.TypeOf<typeof Env>;

const env = Env.parse(process.env);

export { env };
export type { EnvType };
