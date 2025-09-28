import { connectToDB } from "@utils/database";
import Saved from "@models/saved";

export const POST = async (req) => {
  try {
    await connectToDB();
    const { promptId, userId } = await req.json();

    // check if already saved
    const existing = await Saved.findOne({ promptId, userId });
    if (existing) {
      return new Response(JSON.stringify({ message: "Already saved" }), { status: 200 });
    }

    const newSave = new Saved({ promptId, userId });
    await newSave.save();

    return new Response(JSON.stringify(newSave), { status: 201 });
  } catch (err) {
    return new Response("Failed to save prompt", { status: 500 });
  }
};

export const DELETE = async (req) => {
  try {
    await connectToDB();
    const { promptId, userId } = await req.json();

    await Saved.findOneAndDelete({ promptId, userId });

    return new Response("UnSaved successfully", { status: 200 });
  } catch (err) {
    return new Response("Failed to unsave prompt", { status: 500 });
  }
};
