import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await res.revalidate("/view");
    return res.status(200).json({ success: true, message: "Revalidate succeeded" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to revalidate" });
  }
}
