import { connectToDB } from "@utils/database";
import Saved from "@models/saved";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const saved = await Saved.find({ userId: params.id }).populate("promptId");
    return new Response(JSON.stringify(saved), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch saved prompts", { status: 500 });
  }
};
