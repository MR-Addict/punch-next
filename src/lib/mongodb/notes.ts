import z from "zod";

import clientPromise from "./clientPromise";
import formatDate from "@/lib/utils/formatDate";

import { ApiResultType, PaginatedResultType } from "@/types/app";
import { NoteDatabse, NoteDatabseType, NoteType, SubmitIndexType } from "@/types/notes";

async function insert(note: NoteType): Promise<ApiResultType<{ index: SubmitIndexType }>> {
  try {
    const client = await clientPromise;
    const collection = client.db("stas").collection("notes");

    const duplicatedNote = await collection.findOne({ name: note.name }, { sort: { date: -1 } });
    if (duplicatedNote && formatDate(duplicatedNote.date) === formatDate(new Date())) {
      return { success: false, code: 400, message: "你今天已经提交过啦，请勿重复提交" };
    }

    const { insertedId } = await collection.insertOne({ date: new Date(), ...note });
    if (insertedId) {
      const today = await collection.countDocuments({ date: { $gte: new Date(new Date().toDateString()) } });
      const term = await collection.countDocuments({ name: note.name });
      return { success: true, data: { index: { today, term } } };
    } else return { success: false, code: 500, message: "提交失败，无法写入数据库" };
  } catch (error) {
    console.error(error);
    return { success: false, code: 500, message: "提交失败，无法连接至数据库" };
  }
}

async function query(
  page: number,
  pageSize: number,
  query: string
): Promise<ApiResultType<PaginatedResultType<NoteDatabseType>>> {
  try {
    const client = await clientPromise;
    const collection = client.db("stas").collection("notes");

    const searchFilter = {
      $or: [{ name: { $regex: query, $options: "i" } }, { content: { $regex: query, $options: "i" } }]
    };

    const filteredResults = await collection.find(searchFilter).sort({ date: -1 }).toArray();
    const paginatedResults = filteredResults
      .slice((page - 1) * pageSize, page * pageSize)
      .map((item) => ({ ...item, _id: item._id.toString(), date: item.date.toISOString() }));

    const data = z.array(NoteDatabse).parse(paginatedResults);
    const pagination = { page, pageSize, total: filteredResults.length };

    return { success: true, data: { data, pagination } };
  } catch (error) {
    console.error(error);
    return { success: false, code: 500, message: "无法连接至数据库" };
  }
}

async function isEmpty(): Promise<boolean> {
  try {
    const client = await clientPromise;
    const collection = client.db("stas").collection("notes");

    const count = await collection.countDocuments();
    return count === 0;
  } catch (error) {
    console.error(error);
    return true;
  }
}

const user = {
  insert,
  query,
  isEmpty
};

export default user;
