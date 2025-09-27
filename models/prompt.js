import mongoose from "mongoose";

const PromptSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  heading: { type: String, required: [true, "Heading is required."] },
  prompt: { type: String, required: [true, "Prompt is required."] },
  tag: { type: String, required: [true, "Tag is required."] },

  categories: { type: [String], default: [] },
  platforms: { type: [String], default: [] },

  mediaUrl: { type: String, default: "" },
  mediaPublicId: { type: String, default: "" },

  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Delete cached model if exists
delete mongoose.models.Prompt;

const Prompt = mongoose.model("Prompt", PromptSchema);

export default Prompt;
