import z from "zod";

import clientPromise from "./clientPromise";
import { NoteDatabse, NoteType } from "@/types/notes";

async function insert(note: NoteType) {
  try {
    const client = await clientPromise;
    const collection = client.db("stas").collection("notes");

    const startOfDay = new Date();
    const endOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    endOfDay.setHours(23, 59, 59, 999);

    const todayDuplicatedNote = await collection
      .find({ group: note.group, name: note.name, date: { $gte: startOfDay, $lt: endOfDay } })
      .next();
    if (todayDuplicatedNote) return { success: false, message: "你今天已经提交过啦，请勿重复提交" };

    const result = await collection.insertOne({ date: new Date(), ...note });
    if (result.insertedId) return { success: true, message: "提交成功" };
    else return { success: false, message: "提交失败" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "提交失败" };
  }
}

async function query() {
  try {
    const client = await clientPromise;
    const collection = client.db("stas").collection("notes");

    const result = await collection
      .find({})
      .sort({ date: -1 })
      .map((item) => ({ ...item, _id: item._id.toString() }))
      .toArray();
    const data = z.array(NoteDatabse).parse(result);

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "数据库获取失败" };
  }
}

const user = {
  insert,
  query,
};

export default user;
