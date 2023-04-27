import z from "zod";

const Punch = z.object({
  group: z.string().max(10),
  name: z.string().max(10),
  content: z.string().max(500),
});

const PunchDatabse = Punch.merge(z.object({ _id: z.string(), date: z.date() }));

type PunchType = z.TypeOf<typeof Punch>;
type PunchDatabseType = z.TypeOf<typeof PunchDatabse>;

export { PunchDatabse, Punch };
export type { PunchDatabseType, PunchType };
