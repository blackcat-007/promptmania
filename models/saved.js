import { Schema, model, models } from "mongoose";

const SavedSchema = new Schema({
  promptId: {
    type: Schema.Types.ObjectId,
    ref: "Prompt",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// prevent overwriting model in dev
const Saved = models.Saved || model("Saved", SavedSchema);
export default Saved;
