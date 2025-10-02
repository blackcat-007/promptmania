import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import User from "@models/user";

export const revalidate = 0;

export const GET = async () => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error("Error in /api/prompt:", error);
    // Always return an array, even on error
    return new Response(JSON.stringify([]), { status: 500 });
  }
};
