import z from "zod";

import clientPromise from "./clientPromise";
import formatDate from "@/lib/utils/formatDate";

import { ApiResultType, PaginationType } from "@/types/app";
import { NoteDatabse, NoteDatabseType, NoteType } from "@/types/notes";

async function insert(note: NoteType): Promise<ApiResultType> {
  try {
    const client = await clientPromise;
    const collection = client.db("stas").collection("notes");

    const duplicatedNote = await collection.findOne({ name: note.name }, { sort: { date: -1 } });
    if (duplicatedNote && formatDate(duplicatedNote.date) === formatDate(new Date())) {
      return { success: false, code: 400, message: "你今天已经提交过啦，请勿重复提交" };
    }

    const result = await collection.insertOne({ date: new Date(), ...note });
    if (result.insertedId) return { success: true };
    else return { success: false, code: 500, message: "提交失败，无法写入数据库" };
  } catch (error) {
    console.error(error);
    return { success: false, code: 500, message: "提交失败，无法连接至数据库" };
  }
}

type ReturnDataType = { data: NoteDatabseType[]; pagination: PaginationType };

async function query(page: number, pageSize: number, query: string): Promise<ApiResultType<ReturnDataType>> {
  try {
    const client = await clientPromise;
    const collection = client.db("stas").collection("notes");

    const searchFilter = query
      ? { $or: [{ name: { $regex: query, $options: "i" } }, { content: { $regex: query, $options: "i" } }] }
      : {};

    const result = await collection
      .find(searchFilter)
      .sort({ date: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .map((item) => ({ ...item, _id: item._id.toString(), date: item.date.toISOString() }))
      .toArray();

    const data = z.array(NoteDatabse).parse(result);

    const total = await collection.countDocuments();
    const pagination = { page, pageSize, total };

    return { success: true, data: { data, pagination } };
  } catch (error) {
    console.error(error);
    return { success: false, code: 500, message: "无法连接至数据库" };
  }
}

const user = {
  insert,
  query
};

export default user;
