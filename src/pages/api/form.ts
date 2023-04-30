import type { NextApiRequest, NextApiResponse } from "next";

import { notes } from "@/lib/mongodb";
import { Note } from "@/types/notes";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method !== "POST") return res.status(405).setHeader("Allow", ["POST"]).end(`Method ${method} is not allowed`);

  const parsedResult = Note.safeParse(req.body);
  if (!parsedResult.success) return res.status(400).json({ status: false, message: "提交失败" });

  const result = await notes.insert(parsedResult.data);
  return res.status(result.success ? 201 : 500).json(result);
}
