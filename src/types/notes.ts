import z from "zod";

const NoteWithoutWeek = z.object({
  name: z.string().max(10),
  content: z.string().min(4).max(1000)
});

const Note = z.object({ week: z.number() }).merge(NoteWithoutWeek);
const NoteDatabse = z.object({ _id: z.string(), date: z.string() }).merge(Note);

type NoteType = z.TypeOf<typeof Note>;
type NoteDatabseType = z.TypeOf<typeof NoteDatabse>;
type NoteWithoutWeekType = z.TypeOf<typeof NoteWithoutWeek>;

export { NoteWithoutWeek, NoteDatabse, Note };
export type { NoteWithoutWeekType, NoteDatabseType, NoteType };
