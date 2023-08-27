import mongoose from "mongoose";
import { PET_STATUS, PET_TYPE } from "../utils/constants.js";
const PetSchema = new mongoose.Schema(
  {
    name: String,
    age: String,
    petStatus: {
      type: String,
      enum: Object.values(PET_STATUS),
      default: PET_STATUS.AVAILABLE,
    },
    petType: {
      type: String,
      enum: Object.values(PET_TYPE),
      default: PET_TYPE.CAT,
    },
    petBreed: {
      type: String,
      default: "Singapore",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pet", PetSchema);
