import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch all prompts" }), { status: 500 });
  }
};



export const PATCH = async (request, { params }) => {
  const { heading, prompt, tag, categories, platforms, mediaUrl, mediaPublicId, isPublic } =
    await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) return new Response("Prompt not found", { status: 404 });

    // If media is being replaced → delete old file from Cloudinary
    if (mediaUrl && mediaUrl !== existingPrompt.mediaUrl && existingPrompt.mediaPublicId) {
      try {
        await cloudinary.uploader.destroy(existingPrompt.mediaPublicId, {
          resource_type: "auto",
        });
        console.log("Deleted old media:", existingPrompt.mediaPublicId);
      } catch (err) {
        console.error("Failed to delete old media:", err);
      }
    }

    // Update fields
    existingPrompt.heading = heading;
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    existingPrompt.categories = categories;
    existingPrompt.platforms = platforms;
    existingPrompt.mediaUrl = mediaUrl;
    existingPrompt.mediaPublicId = mediaPublicId; // store new file ID
    existingPrompt.isPublic = isPublic;

    await existingPrompt.save();

    return new Response("Successfully updated the Prompt", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error Updating Prompt", { status: 500 });
  }
};



export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return new Response("Invalid prompt ID", { status: 400 });
    }

    // Find and delete
    const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

    if (!deletedPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting prompt:", error); // <--- log the actual error
    return new Response(`Error deleting prompt: ${error.message}`, { status: 500 });
  }
};