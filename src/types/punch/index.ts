import z from "zod";
import { ObjectId } from "mongodb";

const PunchPost = z.object({
  group: z.string().max(10),
  name: z.string().max(10),
  notes: z.string().max(500),
});

const Punch = PunchPost.merge(z.object({ _id: z.custom<ObjectId>(), date: z.date() }));

type PunchType = z.TypeOf<typeof Punch>;
type PunchPostType = z.TypeOf<typeof PunchPost>;

export { Punch, PunchPost };
export type { PunchType, PunchPostType };
