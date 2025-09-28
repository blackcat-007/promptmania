import { connectToDB } from "@utils/database";
import Saved from "@models/saved";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
   const savedPrompts = await Saved.find({ userId: params.id })
      .populate({
        path: "promptId",
        populate: { path: "creator", model: "User" }, // <-- this is key
      });

    return new Response(JSON.stringify(savedPrompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch saved prompts", { status: 500 });
  }
};
