import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";
export const POST = async (req, { params }) => {
  try {
    await connectToDB();
    const { userId } = await req.json(); // send userId from frontend

    const prompt = await Prompt.findById(params.id);
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    // Check if user already copied
    if (!prompt.copiedBy.includes(userId)) {
      prompt.copiedBy.push(userId);
      prompt.copiedCount = prompt.copiedBy.length; // keeps it consistent
      await prompt.save();
    }

    return new Response(JSON.stringify({ copiedCount: prompt.copiedCount }), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to update copied count", { status: 500 });
  }
};
