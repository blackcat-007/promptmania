import { connectToDB } from "@utils/database";
import Saved from "@models/saved";

export const POST = async (req) => {
  try {
    await connectToDB();
    const { promptId, userId } = await req.json();

    const exists = await Saved.findOne({ promptId, userId });
    return new Response(JSON.stringify({ isSaved: !!exists }), { status: 200 });
  } catch (err) {
    return new Response("Failed to check saved status", { status: 500 });
  }
};
