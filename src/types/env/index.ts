import z from "zod";

const NodeEnv = z.enum(["development", "production", "test", "preview"]);

const Env = z.object({
  NODE_ENV: NodeEnv,
  MONGODB_URI: z.string()
});

type EnvType = z.TypeOf<typeof Env>;

const env = Env.parse(process.env);

export { env };
export type { EnvType };
