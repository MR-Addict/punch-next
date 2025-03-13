import z from "zod";

export const NoteWithoutWeek = z.object({
  useMarkdown: z.boolean(),
  name: z.string().max(10),
  content: z.string().min(4).max(1000)
});
export type NoteWithoutWeekType = z.TypeOf<typeof NoteWithoutWeek>;

export const Note = z.object({ week: z.number() }).merge(NoteWithoutWeek);
export type NoteType = z.TypeOf<typeof Note>;

export const NoteDatabse = z.object({ _id: z.string(), date: z.string() }).merge(Note);
export type NoteDatabseType = z.TypeOf<typeof NoteDatabse>;

export const SubmitIndex = z.object({ today: z.number(), term: z.number() });
export type SubmitIndexType = z.TypeOf<typeof SubmitIndex>;
