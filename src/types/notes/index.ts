import z from "zod";

const NoteWithoutWeek = z.object({
  name: z.string().max(10),
  group: z.string().max(10),
  content: z.string().max(500)
});

const Note = NoteWithoutWeek.merge(z.object({ week: z.number() }));
const NoteDatabse = Note.merge(z.object({ _id: z.string(), date: z.string() }));

type NoteType = z.TypeOf<typeof Note>;
type NoteDatabseType = z.TypeOf<typeof NoteDatabse>;
type NoteWithoutWeekType = z.TypeOf<typeof NoteWithoutWeek>;

export { NoteWithoutWeek, NoteDatabse, Note };
export type { NoteWithoutWeekType, NoteDatabseType, NoteType };
