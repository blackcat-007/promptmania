import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      console.error("Invalid user ID:", params.id);
      return new Response(JSON.stringify([]), { status: 400 });
    }

    const prompts = await Prompt.find({ creator: params.id }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error(`Error in /api/users/${params.id}/posts:`, error);
    return new Response(JSON.stringify([]), { status: 500 });
  }
};
