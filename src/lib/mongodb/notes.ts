import z from "zod";

import clientPromise from "./clientPromise";
import { formatDate } from "@/lib/utils";
import { NoteDatabse, NoteType } from "@/types/notes";

async function insert(note: NoteType) {
  try {
    const client = await clientPromise;
    const collection = client.db("stas").collection("notes");

    const duplicatedNote = await collection.findOne({ name: note.name, group: note.group }, { sort: { date: -1 } });
    if (duplicatedNote && formatDate(duplicatedNote.date) === formatDate(new Date()))
      return { success: false, message: "你今天已经提交过啦，请勿重复提交" };

    const result = await collection.insertOne({ date: new Date(), ...note });
    if (result.insertedId) return { success: true, message: "提交成功" };
    else return { success: false, message: "提交失败，无法写入数据库" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "提交失败，数据库连接失败" };
  }
}

async function query() {
  try {
    const client = await clientPromise;
    const collection = client.db("stas").collection("notes");

    const result = await collection
      .find({})
      .sort({ date: -1 })
      .map((item) => ({ ...item, _id: item._id.toString(), date: item.date.toISOString() }))
      .toArray();
    const data = z.array(NoteDatabse).parse(result);

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "数据库连接失败" };
  }
}

const user = {
  insert,
  query
};

export default user;
