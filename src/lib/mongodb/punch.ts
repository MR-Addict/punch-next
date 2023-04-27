import { PunchPostType } from "@/types/punch";
import clientPromise from "./clientPromise";

async function insert(punch: PunchPostType) {
  try {
    const client = await clientPromise;
    const collection = client.db("stats").collection("punch");

    const startOfDay = new Date();
    const endOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    endOfDay.setHours(23, 59, 59, 999);

    const isSubmitToday = await collection.replaceOne(
      { group: punch.group, name: punch.name, date: { $gte: startOfDay, $lt: endOfDay } },
      { date: new Date(), ...punch },
      { upsert: true }
    );

    if (isSubmitToday.upsertedCount || isSubmitToday.modifiedCount) return true;
    else return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

const user = {
  insert,
};

export default user;
