import z from "zod";

const Note = z.object({
  group: z.string().max(10),
  name: z.string().max(10),
  content: z.string().max(500),
});

const NoteDatabse = Note.merge(z.object({ _id: z.string(), date: z.string() }));

type NoteType = z.TypeOf<typeof Note>;
type NoteDatabseType = z.TypeOf<typeof NoteDatabse>;

export { NoteDatabse, Note };
export type { NoteDatabseType, NoteType };
