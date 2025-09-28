import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const revalidate = 0; // disable ISR caching for this route

export const GET = async (request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error("Error in /api/prompt:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch all prompts" }),
      { status: 500 }
    );
  }
};
